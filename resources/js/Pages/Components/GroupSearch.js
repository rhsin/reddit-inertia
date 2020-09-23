import React, { useState } from 'react';
import { connect } from 'react-redux';
import { refresh } from './redux/actions';
import { useDisclosure, useToast, Button } from '@chakra-ui/core';
import { Modal, ModalOverlay, ModalContent, ModalHeader } from '@chakra-ui/core';
import { ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/core';
import { Box, Input, FormControl, FormLabel } from '@chakra-ui/core';

function GroupSearch(props) {
    const { dispatch } = props;
    
    const [group, setGroup] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const url = 'http://localhost:8000/groups';

    const addGroup = () => {
        console.log(group);
        axios.post(url, {
            name: group,
            size: 250
        })
        .then(res => res.status == 201 &&
            toast({
                position: 'top',
                title: 'Subreddit Archived!',
                description: 'We archived this subreddit to our app.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        )
        .catch(err => {
            toast({
                position: 'top',
                title: 'Not Allowed!',
                description: 'Cannot archive this subreddit.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            }); 
            console.log(err);
        });
        dispatch(refresh());
    };

    return (
        <>
            <Button variantColor='blue' onClick={onOpen} mt='1'>
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
                                    onClick={()=> addGroup()}
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