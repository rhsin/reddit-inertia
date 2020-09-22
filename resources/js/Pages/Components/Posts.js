import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { fetchGroups } from './redux/actions';

function Posts(props) {
    const { dispatch, users, groups } = props;
    const [group, setGroup] = useState('webdev');
    const [posts, setPosts] = useState([]);
    const url = 'https://www.reddit.com';
    const urlAPI = 'http://localhost:8000/';

    useEffect(()=> {
        fetch(url + '/r/' + group + '.json')
        .then(res => res.json())
        .then(data => {
            const newPosts = data.data.children
                .map(item => item.data);
            setPosts(newPosts);
        })
        .catch(err => {
            console.log(err);
        }); 
        dispatch(fetchGroups());
    }, [group]);

    const getDate = (time) => {
        const date = new Date(time * 1000);
        return date.toUTCString().slice(0, -7);
    };

    const savePost = (post) => {
        axios.post(urlAPI + 'posts', {
            title: post.title,
            score: post.score,
            link: post.permalink,
            group_id: groups[1].id
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <>
            <div className='bg-green-100'>Posts Component</div>
            <table>
                <thead className='table-auto'> 
                    <tr>
                        <th>Title</th>
                        <th>Score</th>
                        <th>Created</th>
                        <th>Archive</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((item, index) => index < 10 &&
                        <tr key={item.id}>
                            <td>
                                <a href={url + item.permalink}>
                                    {item.title}
                                </a>
                            </td> 
                            <td>
                                {item.score.toLocaleString()}
                            </td> 
                            <td>
                                {getDate(item.created)}
                            </td>
                            <td>
                                <button
                                    className="bg-teal-100 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                                    onClick={()=> savePost(item)}
                                >
                                    <svg
                                        className="fill-current w-4 h-4 mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
                                    </svg>
                                    <span>Save</span>
                                </button> 
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

function mapStateToProps(state) {
    return {
        users: state.users,
        groups: state.groups
    };
}

export default connect(mapStateToProps)(Posts);