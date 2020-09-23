import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchGroups } from './redux/actions';
import Posts from './Posts';
import UserPanel from './UserPanel';
import GroupPanel from './GroupPanel';
import { SimpleGrid, Box } from "@chakra-ui/core";

function Dashboard(props) {
    const { dispatch, account, posts } = props;

    useEffect(()=> {
        dispatch(fetchUsers());
        dispatch(fetchGroups());
        dispatch({type: 'SET_USER', user: account});
    }, []);

    return (
        <>
            <SimpleGrid columns={2} spacing={4}>
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
            <Posts />
        </>
    );
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(Dashboard);