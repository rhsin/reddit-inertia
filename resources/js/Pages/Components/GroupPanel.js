import React from 'react';
import { connect } from 'react-redux';
import GroupDrawer from './GroupDrawer';
import { List, ListItem, IconButton, useToast } from '@chakra-ui/core';
import { Heading } from '@chakra-ui/core';

function GroupPanel(props) {
    const { groups, refresh } = props;

    const toast = useToast();

    const url = 'http://localhost:8000/attach';

    const attachGroup = (id) => {
        axios.post(url, {
            group_id: id
        })
        .then(res => res.status == 201 &&
            toast({
                position: 'top',
                title: 'Subreddit Added!',
                description: 'We added this subreddit to your account.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        )
        .then(()=> refresh())
        .catch(err => {
            toast({
                position: 'top',
                title: 'Not Allowed!',
                description: 'Cannot add this subreddit.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            }); 
            console.log(err);
        });
    };

    return (
        <>
            <Heading fontSize='lg' mb='3' ml='1'>
                Popular Subreddits
            </Heading>
            <List spacing={2}>
                {groups != null && groups.map(
                    (item, index) => index < 2 &&
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
                        {item.name}
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