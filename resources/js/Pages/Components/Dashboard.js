import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers, fetchGroups } from './redux/actions';

function Dashboard(props) {
    const { dispatch, users, groups, posts } = props;
    const [refresh, setRefresh] = useState(false);

    useEffect(()=> {
        dispatch(fetchUsers());
        dispatch(fetchGroups());
    }, [refresh]);

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
            {posts != null && posts.map(item =>
                <div key={item.id}>
                    {item.title}
                </div> 
            )}
            <button onClick={()=> setRefresh(!refresh)}>
                Refresh
            </button>
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