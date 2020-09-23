import axios from 'axios';

const url = 'http://localhost:8000/';

export function fetchUsers() {
    return function(dispatch) {
        axios.get(url + 'users')
        .then(res => dispatch({
            type: 'FETCH_USERS',
            users: res.data.data
        }))
        .catch(err => {
            console.log(err);
        });
    };
}

export function fetchGroups() {
    return function(dispatch) {
        axios.get(url + 'groups')
        .then(res => dispatch({
            type: 'FETCH_GROUPS',
            groups: res.data.data
        }))
        .catch(err => {
            console.log(err);
        });
    };
}

export function fetchAccount(id) {
    return function(dispatch) {
        axios.get(url + 'users/' + id)
        .then(res => dispatch({
            type: 'SET_USER',
            user: res.data.data
        }))
        .catch(err => {
            console.log(err);
        });
    };
}

// const savePost = (post) => {
//     fetch(urlAPI + 'posts', {
//         method: 'POST',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             title: post.title,
//             score: post.score,
//             link: post.permalink,
//             group_id: groups[1].id
//         })
//     })
//     .catch(err => {
//         console.error('Error: ', err);
//     });
// };