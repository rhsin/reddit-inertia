// The account and posts props are passed from Laravel directly through InertiaJS (render method).
// Still fetched data through redux-thunk for more dynamic rendering.

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import UserPosts from './UserPosts';
import UserInfo from './UserInfo';
import { setUser, fetchUsers, fetchAccount } from './redux/actions';
import { Box } from '@chakra-ui/core';

function ProfileDash(props) {
    const { dispatch, account, render } = props;

    useEffect(()=> {
        dispatch(fetchUsers());
        dispatch(setUser(account));
        dispatch(fetchAccount(account.id));
    }, [render]);

    return (
        <>
            <Box
                p={4}
                shadow='md'
                borderWidth='1px'
                m='4'
            >
                <UserInfo />
            </Box>
            <Box
                p={4}
                shadow='md'
                borderWidth='1px'
                m='4'
            >
                <UserPosts />
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

export default connect(mapStateToProps)(ProfileDash);
