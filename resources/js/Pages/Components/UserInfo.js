// This component simply shows the users' details with a link back to the dashboard

import React from 'react';
import { connect } from 'react-redux';
import { List, ListItem, Heading } from '@chakra-ui/core';
import { Button, Link, Icon } from '@chakra-ui/core';

function UserInfo(props) {
    const { user } = props;

    const urlDashboard = 'http://localhost:8000/dashboard';

    return (
        <>  
            <Heading fontSize='lg' mb='2' ml='1'>
                {user.name}'s Profile
            </Heading>
            <List spacing={1} ml='1'>
                <ListItem>
                    <strong>{user.email}</strong>
                </ListItem>
                <ListItem>
                    <strong>Joined: </strong>
                    {user.created && user.created.slice(0,10)}
                </ListItem>
                <ListItem>
                    <strong>Top Subs: </strong>
                        {user.groups && user.groups.map((item,index) => index < 5 &&
                            <span key={item.id}> {item.name}, </span>
                        )}
                </ListItem>
                <ListItem>
                    <strong>Posts Archived: </strong>
                    {user.posts && user.posts.length}
                </ListItem>
            </List>
            <Button
                variantColor='blue'
                size='sm'
                mt='2'

            >
                <Link href={urlDashboard}>
                    Dashboard
                    <Icon name='link' ml='1' mb='2px' />
                </Link>
            </Button>
        </>
    );
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(UserInfo);