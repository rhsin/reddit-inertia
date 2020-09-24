// This component shows the current users' account info & archived posts that the current user saved

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { refresh } from './redux/actions';
import { Stack, Box, Heading, Tag, Icon, TagLabel } from '@chakra-ui/core';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/core';
import { Button, useToast, Link } from '@chakra-ui/core';

function UserPosts(props) {
    const { dispatch, user } = props;

    const [posts, setPosts] = useState([]);
    const [limit, setLimit] = useState(10);

    const toast = useToast();
    
    const url = 'https://www.reddit.com';
    const urlAPI = 'http://localhost:8000/detach/posts/';

    useEffect(()=> {
        setPosts(user.posts);
    }, [user]);

    const removePost = (postId) => {
        axios.post(urlAPI + postId)
        .then(res => res.status == 204 &&
            toast({
                position: 'top',
                title: 'Post Removed!',
                description: 'We removed this post for you.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        )
        .catch(err => {
            toast({
                position: 'top',
                title: 'Not Allowed!',
                description: 'Cannot remove this post.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            }); 
            console.log(err);
        });
        dispatch(refresh());
    };

    return (
        <>
            <Heading fontSize='lg' mb='3' ml='1'>
                {user.name}'s Archived Posts
            </Heading>
            <Menu>
                <MenuButton
                    as={Button}
                    rightIcon='arrow-down'
                    size='sm'
                    mr='1'
                >
                    Show
                </MenuButton>
                <MenuList>
                    <MenuItem onClick={() => setLimit(10)}>
                        10
                    </MenuItem>
                    <MenuItem onClick={() => setLimit(20)}>
                        20
                    </MenuItem>
                    <MenuItem onClick={() => setLimit(30)}>
                        All
                    </MenuItem>
                </MenuList>
            </Menu>
            <Stack spacing={2} mt='1'>
                {posts && posts.map((item, index) => index < limit &&
                    <Box
                        p={3}
                        shadow='md'
                        borderWidth='1px'
                        key={item.id}
                    >
                        <Heading fontSize='md' mb='2'>
                            <Link
                                href={url + item.link}
                                isExternal
                            >
                                {item.title}
                            </Link>
                        </Heading>
                        <Tag variantColor='green' mr='2' size='sm'>
                            <Icon name='external-link' size='12px' mr='1' />
                            <TagLabel fontSize='sm'>
                                <Link
                                    href={url + '/r/' + item.group_id}
                                    isExternal    
                                >
                                    {item.group_id}
                                </Link>
                            </TagLabel>
                        </Tag> 
                        <Tag variantColor='blue' mr='2' size='sm'>
                            <Icon name='up-down' size='12px' mr='1' />
                            <TagLabel fontSize='sm'>
                                {item.score.toLocaleString()}
                            </TagLabel>
                        </Tag> 
                        <Tag mr='2' size='sm'>
                            <TagLabel fontSize='xs'>
                                {item.created_at.slice(0, 10)}
                            </TagLabel>
                        </Tag>
                        <Button
                            leftIcon='delete'
                            variantColor='red'
                            variant='outline'
                            size='xs'
                            onClick={()=> removePost(item.id)}
                        >
                            Remove
                        </Button> 
                    </Box>
                )}
            </Stack>
        </>
    );
}

function mapStateToProps(state) {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps)(UserPosts);