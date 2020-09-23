import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setUser, fetchUsers, fetchGroups, fetchAccount } from './redux/actions';
import Posts from './Posts';
import UserPanel from './UserPanel';
import GroupPanel from './GroupPanel';
import { SimpleGrid, Box } from '@chakra-ui/core';

function Dashboard(props) {
    const { dispatch, account, render, posts } = props;

    useEffect(()=> {
        dispatch(fetchUsers());
        dispatch(fetchGroups());
        dispatch(setUser(account));
        dispatch(fetchAccount(account.id))
    }, [render]);

    return (
        <>
            <SimpleGrid columns={2} spacing={4} m='4'>
                <Box
                    p={4}
                    shadow='md'
                    borderWidth='1px'
                >
                    <UserPanel />
                </Box>
                <Box
                    p={4}
                    shadow='md'
                    borderWidth='1px'
                >
                    <GroupPanel />
                </Box>
            </SimpleGrid>
            <Box
                p={4}
                shadow='md'
                borderWidth='1px'
                m='4'
            >
                <Posts />
            </Box>
        </>
    );
}

function mapStateToProps(state) {
    return {
        user: state.user,
        render: state.render
    };
}

export default connect(mapStateToProps)(Dashboard);