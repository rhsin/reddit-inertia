// The attachGroup function sends a request to Laravel to insert the group into the users group-list.
// This is done through Eloquents' attach method for many-to-many relationships (inserts row into pivot table).
// The useToast hook creates toast alerts which are used conditionally to show success/errors. 

import React from 'react';
import { connect } from 'react-redux';
import { refresh } from './redux/actions';
import GroupDrawer from './GroupDrawer';
import { List, ListItem, IconButton, useToast } from '@chakra-ui/core';
import { Heading } from '@chakra-ui/core';

function GroupPanel(props) {
    const { dispatch, groups } = props;

    const toast = useToast();

    const url = 'http://localhost:8000/attach/groups';

    const attachGroup = (groupId) => {
        axios.post(url, {
            group_id: groupId
        })
        .then(res => res.status == 201 &&
            toast({
                position: 'top',
                title: 'Subreddit Added!',
                description: 'We added this subreddit to your account.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        )
        .catch(err => {
            toast({
                position: 'top',
                title: 'Not Allowed!',
                description: 'Cannot add this subreddit.',
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
            <Heading fontSize='lg' mb='3' ml='1'>
                Popular Subreddits
            </Heading>
            <List spacing={2}>
                {groups && groups.map(
                    (item, index) => index < 5 &&
                    <ListItem
                        key={item.id}
                        borderWidth='2px'
                        borderRadius='md'
                        p={1}
                        fontSize='sm'
                        width='80%'
                    >
                        <IconButton
                            icon='add'
                            variantColor='green'
                            variant='outline'
                            size='xs'
                            mr='2'
                            onClick={()=> attachGroup(item.id)}
                        />
                        {item.name} - ({item.size.toLocaleString()}k)
                    </ListItem>
                )}
            </List>
            <GroupDrawer attachGroup={id => attachGroup(id)} />
        </>
    );
}

function mapStateToProps(state) {
    return {
        groups: state.groups
    };
}

export default connect(mapStateToProps)(GroupPanel);