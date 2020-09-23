import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import {
    FormControl,
    FormLabel,
    Button,
    Select,
    useToast,
    Stack,
    Box,
    Heading,
    Text,
    Badge
} from '@chakra-ui/core';

function Posts(props) {
    const { users, groups } = props;

    const [group, setGroup] = useState('PS4');
    const [posts, setPosts] = useState([]);

    const toast = useToast();

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
        toast({
            position: 'top',
            title: 'Post Archived!',
            description: 'We saved this post for you',
            status: 'success',
            duration: 9000,
            isClosable: true,
        });
    };

    const getDate = (time) => {
        const date = new Date(time * 1000);
        return date.toUTCString().slice(0, -7);
    };

    return (
        <>
            <div className='bg-green-100'>Posts Component</div>
            <FormControl>
                <FormLabel htmlFor='subreddit'>Subreddit</FormLabel>
                <Select
                    id='subreddit'
                    onChange={e => setGroup(e.target.value)}
                >
                    {groups.map(item => 
                        <option value={item.name} key={item.id}>
                            {item.name}
                        </option>
                    )}
                </Select>
            </FormControl>
            <Stack spacing={3}>
                {posts.map((item, index) => index < 10 &&
                    <Box
                        p={5}
                        shadow='md'
                        borderWidth='1px'
                        key={item.id}
                    >
                        <Heading fontSize='lg' mb='2'>
                            <a href={url + item.permalink}>
                                {item.title}
                            </a>
                        </Heading>
                        <Badge variantColor='blue' mr='2'>
                            <Text fontSize="md">
                                {item.score.toLocaleString()}
                            </Text>
                        </Badge> 
                        <Badge mr='2'>
                            <Text fontSize="xs">
                                {getDate(item.created)}
                            </Text>
                        </Badge>
                        <Button
                            leftIcon='download'
                            variantColor='teal'
                            variant='outline'
                            size='sm'
                            onClick={()=> savePost(item)}
                        >
                            Save
                        </Button> 
                    </Box>
                )}
            </Stack>
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