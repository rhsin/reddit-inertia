import React from 'react';
import { connect } from 'react-redux';
import {  } from '@chakra-ui/core';

function GroupPanel(props) {
    const { groups, user } = props;

    return (
        <>
            Popular Subreddits
            {groups != null && groups.map(item =>
                <div key={item.id}>
                    {item.name}
                </div> 
            )}
        </>
    );
}

function mapStateToProps(state) {
    return {
        groups: state.groups,
        user: state.user
    };
}

export default connect(mapStateToProps)(GroupPanel);