import React, { useState, useRef } from 'react';
import { connect } from 'react-redux';
import { List, ListItem, IconButton, Box } from '@chakra-ui/core';
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader } from '@chakra-ui/core';
import { DrawerOverlay, DrawerContent, DrawerCloseButton } from '@chakra-ui/core';
import { Input, Button, useDisclosure,FormControl, FormLabel } from '@chakra-ui/core';

function GroupDrawer(props) {
    const { groups, attachGroup } = props;

    const [group, setGroup] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();
    const target = useRef();

    const addGroup = () => {
        console.log(group);
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
                                    {item.name}
                                </ListItem>
                            )}
                        </List>
                        <Box
                            p={4}
                            shadow='md'
                            borderWidth='1px'
                            mt='5'
                        >
                            <FormControl>
                                <FormLabel htmlFor='search' mb='1'>
                                    Add Subreddits
                                </FormLabel>
                                <Input
                                    id='search'
                                    placeholder='Enter Subreddit...'
                                    onChange={(e)=> setGroup(e.target.value)}
                                />
                                <Button size='sm' mt='2' onClick={()=> addGroup()}>
                                    Add New
                                </Button>
                            </FormControl>
                        </Box>  
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