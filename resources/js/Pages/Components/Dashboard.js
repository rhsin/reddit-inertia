import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchGroups } from './redux/actions';
import Posts from './Posts';

function Dashboard(props) {
    const { dispatch, users, groups, posts } = props;

    useEffect(()=> {
        dispatch(fetchUsers());
        dispatch(fetchGroups());
    }, []);

    return (
        <>
            <div>App Component</div>
            {users != null && users.map(item =>
                <div key={item.id}>
                    {item.name}
                </div> 
            )}
            {groups != null && groups.map(item =>
                <div key={item.id}>
                    {item.name}
                </div> 
            )}
            <Posts />
        </>
    );
}

function mapStateToProps(state) {
    return {
        users: state.users,
        groups: state.groups
    };
}

export default connect(mapStateToProps)(Dashboard);