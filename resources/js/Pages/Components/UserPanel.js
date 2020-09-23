import React from 'react';
import { connect } from 'react-redux';
import { refresh } from './redux/actions';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core';
import { List, ListItem, IconButton, useToast, Heading } from '@chakra-ui/core';

function UserPanel(props) {
    const { dispatch, users, user } = props;

    const toast = useToast();

    const url = 'http://localhost:8000/detach';

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
                duration: 9000,
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
                                {item.groups.map(i =>
                                    <ListItem
                                        key={i.id}
                                        borderWidth='2px'
                                        borderRadius='md'
                                        p={1}
                                        fontSize='sm'
                                        width='70%'
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
                        </TabPanel>
                    )}
                </TabPanels>
            </Tabs>
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