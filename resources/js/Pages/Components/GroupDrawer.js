import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import GroupSearch from './GroupSearch';
import { List, ListItem, IconButton } from '@chakra-ui/core';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader } from '@chakra-ui/core';
import { DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/core';
import { Button, useDisclosure } from '@chakra-ui/core';

function GroupDrawer(props) {
    const { groups, attachGroup } = props;

    const [subs, setSubs] = useState([]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const target = useRef();

    const url ='https://www.reddit.com/subreddits/popular.json'
    
    useEffect(()=> {
        fetch(url)
        .then(res => res.json())
        .then(data => {
            const newSubs = data.data.children
                .map(item => item.data);
            setSubs(newSubs);
        })
        .catch(err => {
            console.log(err);
        }); 
    }, []);

    return (
        <>
            <Button
                ref={target}
                variantColor='blue'
                size='sm'
                mt='2'   
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
                        <List spacing={2} mb='2'>
                            {groups != null && groups.map(item =>
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
                                        onClick={()=> attachGroup(item.id)}
                                    />
                                    {item.name} - ({item.size.toLocaleString()}k)
                                </ListItem>
                            )}
                        </List>
                        <GroupSearch />
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

function mapStateToProps(state) {
    return {
        groups: state.groups
    };
}

export default connect(mapStateToProps)(GroupDrawer);