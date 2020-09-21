import axios from 'axios';

const url = 'http://localhost:8000/';

export function fetchUsers() {
    return function(dispatch) {
        axios.get(url + 'users')
        .then(res => dispatch({
            type: 'FETCH_USERS',
            users: res.data.data
        }));
    };
}

export function fetchGroups() {
    return function(dispatch) {
        axios.get(url + 'groups')
        .then(res => dispatch({
            type: 'FETCH_GROUPS',
            groups: res.data.data
        }));
    };
}