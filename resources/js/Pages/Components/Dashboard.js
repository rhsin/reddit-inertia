import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchGroups, fetchAccount } from './redux/actions';
import Posts from './Posts';
import UserPanel from './UserPanel';
import GroupPanel from './GroupPanel';
import { SimpleGrid, Box } from '@chakra-ui/core';

function Dashboard(props) {
    const { dispatch, account, posts } = props;

    const [refresh, setRefresh] = useState(false);

    useEffect(()=> {
        dispatch(fetchUsers());
        dispatch(fetchGroups());
        dispatch({type: 'SET_USER', user: account});
        dispatch(fetchAccount(account.id))
    }, [refresh]);

    return (
        <>
            <SimpleGrid columns={2} spacing={4} m='4'>
                <Box
                    p={4}
                    shadow='md'
                    borderWidth='1px'
                >
                    <UserPanel
                        refresh={()=> setRefresh(!refresh)}
                    />
                </Box>
                <Box
                    p={4}
                    shadow='md'
                    borderWidth='1px'
                >
                    <GroupPanel
                        refresh={()=> setRefresh(!refresh)}
                    />
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
        user: state.user
    };
}

export default connect(mapStateToProps)(Dashboard);