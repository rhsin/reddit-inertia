// The current user can add or remove subreddits from their dashboard, which also determines the menu options
// for the Posts components' subreddit select menu. Also can see all user subreddits in Modal

import React from 'react';
import { connect } from 'react-redux';
import { refresh } from './redux/actions';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core';
import { List, ListItem, IconButton, useToast, Heading } from '@chakra-ui/core';
import { useDisclosure, Button, ButtonGroup, Modal, Box } from '@chakra-ui/core';
import { ModalOverlay, ModalContent, ModalHeader, Icon } from '@chakra-ui/core';
import { ModalFooter, ModalBody, ModalCloseButton, Link } from '@chakra-ui/core';

function UserPanel(props) {
    const { dispatch, users, user } = props;
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const url = 'http://localhost:8000/detach/groups';
    const urlProfile = 'http://localhost:8000/profile';

    const detachGroup = (groupId) => {
        axios.post(url, {
            group_id: groupId
        })
        .then(res => res.status == 204 &&
            toast({
                position: 'top',
                title: 'Subreddit Removed!',
                description: 'We removed this subreddit from your account.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        )
        .catch(err => {
            console.log(err);
        });
        dispatch(refresh());
    };

    return (
        <>
            <Heading fontSize='lg' mb='3' ml='1'>
                {user.name}'s Dashboard
            </Heading>
            <Tabs
                variant='enclosed-colored'
                size='sm'
            >
                <TabList>
                    {users.map(item => 
                        <Tab key={item.id}>
                            {item.name}
                        </Tab>
                    )}
                </TabList>
                <TabPanels mt='3'>
                    {users.map(item => 
                        <TabPanel key={item.id}>
                            <List spacing={2}>
                                {item.groups.map((i, index) => index < 4 &&
                                    <ListItem
                                        key={i.id}
                                        borderWidth='2px'
                                        borderRadius='md'
                                        p={1}
                                        fontSize='sm'
                                        width='80%'
                                    >
                                        {user.id == item.id && 
                                            <IconButton
                                                icon='minus'
                                                variantColor='red'
                                                variant='outline'
                                                size='xs'
                                                mr='2'
                                                onClick={()=> detachGroup(i.id)}
                                            />
                                        }
                                        {i.name}
                                    </ListItem>
                                )}
                            </List>
                            {user.id == item.id && 
                                <ButtonGroup spacing={2}>                
                                    <Button
                                        variantColor='blue'
                                        size='sm'
                                        onClick={onOpen}
                                        mt='2'
                                    >
                                        See All ({user.groups && user.groups.length})
                                    </Button>
                                    <Button
                                        variantColor='cyan'
                                        size='sm'
                                        mt='2'

                                    >
                                        <Link href={urlProfile}>
                                            Profile
                                            <Icon name='link' ml='1' mb='2px' />
                                        </Link>
                                    </Button>
                                </ButtonGroup>
                            }
                        </TabPanel>
                    )}
                </TabPanels>
            </Tabs>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{user.name}'s Subreddits</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            p={2}
                            shadow='md'
                            borderWidth='1px'
                        >
                            <List spacing={2}>
                                {user.groups && user.groups.map(item =>
                                    <ListItem
                                        key={item.id}
                                        borderWidth='2px'
                                        borderRadius='md'
                                        p={1}
                                        fontSize='sm'
                    
                                    >
                                        <IconButton
                                            icon='minus'
                                            variantColor='red'
                                            variant='outline'
                                            size='xs'
                                            mr='2'
                                            onClick={()=> detachGroup(item.id)}
                                        />
                                        {item.name}- ({item.size.toLocaleString()}k)
                                    </ListItem>
                                )}
                            </List>
                        </Box>  
                    </ModalBody>
                    <ModalFooter>
                        <Button variantColor='gray' onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

function mapStateToProps(state) {
    return {
        users: state.users,
        user: state.user
    };
}

export default connect(mapStateToProps)(UserPanel);