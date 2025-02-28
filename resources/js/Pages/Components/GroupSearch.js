// This Modal component takes the addGroup function as a prop (add()), which adds & attaches the subreddit
// submitted by form to the current user.

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useDisclosure, Button, Modal } from '@chakra-ui/core';
import { ModalOverlay, ModalContent, ModalHeader } from '@chakra-ui/core';
import { ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/core';
import { Box, Input, FormControl, FormLabel, useToast } from '@chakra-ui/core';

function GroupSearch(props) {
    const { addGroup } = props;
    
    const [group, setGroup] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const url = 'https://www.reddit.com';

    const submitGroup = (name) => {
        fetch(url + '/r/' + group + '.json')
        .then(res => { 
            if (res.ok) {
                const data = res.json()
                addGroup({
                    display_name: name,
                    subscribers: 200000
                    // subscribers: data.data.children[1].data.subreddit_subscribers
                });
                onClose();
                return data;
            } else {
                toast({
                    position: 'top',
                    title: 'Not Found!',
                    description: 'We cannot find this subreddit.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                }); 
            }})
        .catch(err => {
            toast({
                position: 'top',
                title: 'Not Found!',
                description: 'We cannot find this subreddit.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            }); 
            console.log(err);
        }); 
    };

    return (
        <>
            <Button variantColor='blue' onClick={onOpen} mt='2'>
                Open Search
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Subreddits</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box
                            p={4}
                            shadow='md'
                            borderWidth='1px'
                        >
                            <FormControl>
                                <FormLabel htmlFor='search' mb='1'>
                                    Enter Subreddit
                                </FormLabel>
                                <Input
                                    id='search'
                                    placeholder='Type Subreddit Here...'
                                    onChange={e => setGroup(e.target.value)}
                                />
                                <Button
                                    size='sm'
                                    variantColor='green'
                                    mt='2'
                                    onClick={()=> submitGroup(group)}
                                >
                                    Add New
                                </Button>
                            </FormControl>
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
        groups: state.groups
    };
}

export default connect(mapStateToProps)(GroupSearch);