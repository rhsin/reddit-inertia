import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

function Posts(props) {
    const { users, groups } = props;

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
    }, [group]);

    const savePost = (post) => {
        axios.post(urlAPI + 'posts', {
            title: post.title,
            score: post.score,
            link: post.permalink,
            group_id: groups[1].id
        })
        .then(res => console.log(res))
        .catch(err => {
            console.log(err);
        });
    };

    const getDate = (time) => {
        const date = new Date(time * 1000);
        return date.toUTCString().slice(0, -7);
    };

    return (
        <>
            <div className='bg-green-100'>Posts Component</div>
            <div className="inline-block relative w-64">
                <select
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    onChange={e => setGroup(e.target.value)}
                >
                    {groups.map(item => 
                        <option value={item.name} key={item.id}>
                            {item.name}
                        </option>
                    )}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                </div>
            </div>
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