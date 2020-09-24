// Chakra UI Drawer component is basically a side Modal, where I put the top subreddits fetched from Reddit API
// into Accordion components to save space. The list of subreddits is its own component that is passed the attachGroup function,
// as well as min, max props to determine which slice of the list to render based on index (first 10 subs, next 9 subs...). 

import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { refresh } from './redux/actions';
import GroupSearch from './GroupSearch';
import { List, ListItem, IconButton, useToast, Box } from '@chakra-ui/core';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader } from '@chakra-ui/core';
import { DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/core';
import { Accordion, AccordionItem, AccordionHeader, Button } from "@chakra-ui/core";
import { AccordionPanel, AccordionIcon, useDisclosure } from "@chakra-ui/core";

function GroupDrawer(props) {
    const { dispatch, groups, attachGroup } = props;

    const [subs, setSubs] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const target = useRef();
    const toast = useToast();

    const url ='https://www.reddit.com/subreddits/popular.json';
    const urlAPI = 'http://localhost:8000/groups';
    
    useEffect(()=> {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const newSubs = data.data.children
                .map(item => item.data);
            setSubs(newSubs);
            return data
        })
        .catch(err => {
            console.log(err);
        }); 
    }, []);

    const addGroup = (group) => {
        axios.post(urlAPI, {
            name: group.display_name,
            size: Math.round(group.subscribers/1000)
        })
        .then(res => {res.status == 201 &&
            toast({
                position: 'top',
                title: 'Subreddit Archived!',
                description: 'We archived this subreddit to our app.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            attachGroup(res.data);
        })
        .catch(err => {
            toast({
                position: 'top',
                title: 'Not Allowed!',
                description: 'Cannot archive this subreddit.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            }); 
            console.log(err);
        });
        dispatch(refresh());
    };

    return (
        <>
            <Button
                ref={target}
                variantColor='blue'
                size='sm'
                mt='1'   
                onClick={onOpen}
            >
                Explore
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={target}
                height='70%'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Browse Subreddits</DrawerHeader>
                    <DrawerBody>
                        <Accordion>
                            <AccordionItem>
                                <AccordionHeader>
                                <Box flex="1" textAlign="left">
                                    Subreddits 
                                </Box>
                                <AccordionIcon />
                                </AccordionHeader>
                                <AccordionPanel pb={4}>
                                    <Subreddits
                                        subs={subs}
                                        min={-1}
                                        max={9}
                                        add={item => addGroup(item)}
                                    />
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionHeader>
                                <Box flex="1" textAlign="left">
                                    See More
                                </Box>
                                <AccordionIcon />
                                </AccordionHeader>
                                <AccordionPanel pb={4}>
                                    <Subreddits
                                        subs={subs}
                                        min={8}
                                        max={17}
                                        add={item => addGroup(item)}
                                    />
                                </AccordionPanel>
                            </AccordionItem>
                            <AccordionItem>
                                <AccordionHeader>
                                <Box flex="1" textAlign="left">
                                    See More
                                </Box>
                                <AccordionIcon />
                                </AccordionHeader>
                                <AccordionPanel pb={4}>
                                    <Subreddits
                                        subs={subs}
                                        min={17}
                                        max={26}
                                        add={item => addGroup(item)}
                                    />
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>
                        <GroupSearch addGroup={item => addGroup(item)}/>
                    </DrawerBody>
                    <DrawerFooter>
                        <Button
                            variantColor='gray'
                            mr='3'
                            onClick={onClose}
                        >
                            Hide
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

function Subreddits(props) {
    const { subs, min, max, add } = props;

    return (
        <List spacing={2} mb='2'>
            {subs.map((item, index) => (min < index & index < max) &&
                <ListItem
                    key={item.id}
                    borderWidth='2px'
                    borderRadius='md'
                    p={1}
                    fontSize='sm'
                >
                    <IconButton
                        icon='add'
                        variantColor='green'
                        size='xs'
                        mr='2'
                        onClick={()=> add(item)}
                    />
                    {item.display_name} - (
                        {Math.round(item.subscribers/1000).toLocaleString()}k
                    )
                </ListItem>
            )}
        </List>
    );
}

function mapStateToProps(state) {
    return {
        groups: state.groups
    };
}

export default connect(mapStateToProps)(GroupDrawer);