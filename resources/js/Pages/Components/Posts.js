import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

function Posts(props) {
    const { users, groups } = props;
    const [group, setGroup] = useState('news');
    const [posts, setPosts] = useState([]);
    const url = 'https://www.reddit.com';

    useEffect(()=> {
        fetch(url + '/r/' + group + '.json')
        .then(res => res.json())
        .then(data => {
            const newPosts = data.data.children
                .map(item => item.data);
            setPosts(newPosts);
        });
    }, [group]);

    const getDate = (time) => {
        const date = new Date(time * 1000);
        return date.toUTCString().slice(0, -7);
    };

    return (
        <>
            <div>Posts Component</div>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Score</th>
                        <th>Created</th>
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