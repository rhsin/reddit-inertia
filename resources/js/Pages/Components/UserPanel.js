import React from 'react';
import { connect } from 'react-redux';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/core';
import { List, ListItem, IconButton, useToast, Heading } from '@chakra-ui/core';

function UserPanel(props) {
    const { users, user, refresh } = props;

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
        .then(()=> refresh())
        .catch(err => {
            console.log(err);
        });
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
                            <List spacing={3}>
                                {item.groups.map(i =>
                                    <ListItem key={i.id}>
                                        <IconButton
                                            icon='minus'
                                            variantColor='gray'
                                            size='xs'
                                            mr='2'
                                            onClick={()=> detachGroup(i.id)}
                                        />
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