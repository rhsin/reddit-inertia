import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Stack, Box, Heading, Tag, Icon, TagLabel } from '@chakra-ui/core';
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/core";
import { Button, useToast } from '@chakra-ui/core';

function Posts(props) {
    const { user, groups } = props;

    const [group, setGroup] = useState('PS4');
    const [posts, setPosts] = useState([]);
    const [groupId, setGroupId] = useState(null);

    const toast = useToast();

    const url = 'https://www.reddit.com';
    const urlAPI = 'http://localhost:8000/';

    useEffect(()=> {
        fetch(url + '/r/' + group + '/top.json')
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
            group_id: groupId
        })
        .then(res => res.status == 201 &&
            toast({
                position: 'top',
                title: 'Post Archived!',
                description: 'We saved this post for you.',
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        )
        .catch(err => {
            toast({
                position: 'top',
                title: 'Not Allowed!',
                description: 'Cannot save this post.',
                status: 'error',
                duration: 9000,
                isClosable: true,
            }); 
            console.log(err);
        });
    };

    const selectGroup = (item) => {
        setGroup(item.name);
        setGroupId(item.id);
    };

    const getDate = (time) => {
        const date = new Date(time * 1000);
        return date.toUTCString().slice(0, -7);
    };

    return (
        <>
            <Heading fontSize='lg' mb='3' ml='1'>
                Browse Posts: {group}
            </Heading>
            <Menu>
                <MenuButton as={Button} rightIcon="chevron-down">
                    Subreddit
                </MenuButton>
                <MenuList>
                    {user.groups != null && user.groups.map(item =>    
                        <MenuItem
                            key={item.id}
                            onClick={() => selectGroup(item)}
                        >
                            {item.name}
                        </MenuItem>
                    )}
                </MenuList>
            </Menu>
            <Stack spacing={3} mt='1'>
                {posts.map((item, index) => index < 40 &&
                    <Box
                        p={4}
                        shadow='md'
                        borderWidth='1px'
                        key={item.id}
                    >
                        <Heading fontSize='lg' mb='3'>
                            <a href={url + item.permalink}>
                                {item.title}
                            </a>
                        </Heading>
                        <Tag variantColor='blue' mr='2'>
                            <Icon name='up-down' size='12px' mr='1' />
                            <TagLabel fontSize='sm'>
                                {item.score.toLocaleString()}
                            </TagLabel>
                        </Tag> 
                        <Tag mr='2'>
                            <TagLabel fontSize='xs'>
                                {getDate(item.created)}
                            </TagLabel>
                        </Tag>
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
        user: state.user,
        groups: state.groups
    };
}

export default connect(mapStateToProps)(Posts);