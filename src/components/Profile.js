import React from 'react';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import useFetch from './customHooks/useFetch';
import useAuth from './customHooks/useAuth';
import { useState } from 'react';
import { useEffect } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Blog from './Dashboard/Blog';
import { Progress } from '@chakra-ui/progress';
import jwt from 'jsonwebtoken';
import UnPublishedBlogs from './Dashboard/UnPublishedBlogs';
import { useHistory } from 'react-router';

function Profile(props) {
  const [url, setUrl] = useState(null);
  const [noBlogs, setNoBlogs] = useState();
  const [userInfo, setUserInfo] = useState();
  const [userLoggedIn, setUserLoggedIn] = useState();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if (user) {
        if (!user == undefined) {
          setUserLoggedIn(user);
        } else {
          setUserLoggedIn({});
        }
      } else {
        setUserLoggedIn({});
      }
    }
  }, []);
  useEffect(() => {
    // if (userLoggedIn) {
    setNoBlogs(false);
    fetch('https://s5po6.sse.codesandbox.io/profile/' + props.match.params.id)
      .then((result) => {
        return result.json();
      })
      .then((user) => {
        console.log(user);
        if (user !== null || undefined) {
          setUserInfo(user);
        } else {
          setUserInfo(null);
        }

        if (user.blogs.length) {
          setNoBlogs(false);
          const ublog = user.blogs.filter((blog) => blog.isPublished === false);
          setPublisher(ublog);
        } else {
          setNoBlogs(true);
        }
      });
    // }
  }, []);
  const [publisher, setPublisher] = useState();
  return (
    <Box minH='100vh'>
      <Center
        pt='12'
        px={{ lg: '96' }}
        justifyContent='space-evenly'
        background='brand.gray'
        boxShadow='lg'
        h='72'>
        <Box>
          <Heading
            color='brand.text'
            fontFamily='fantasy'
            opacity='0.8'
            textDecor='underline'>
            {userInfo && userInfo.user.name}
          </Heading>
          {userInfo && (
            <Text
              overflowWrap='anywhere'
              w={{ base: '52', lg: '48' }}
              color='brand.text'
              opacity='0.5'>
              Overlander for{' '}
              {userInfo.user.createdAt
                ? formatDistanceToNow(new Date(userInfo.user.createdAt))
                : 'No Info :('}
            </Text>
          )}
          <Text pt='5' fontWeight='bold' color='brand.text' opacity='0.5'>
            Blogs Published:{' '}
            {(publisher &&
              userInfo &&
              userInfo.blogs.length - publisher.length) ||
              'None'}{' '}
          </Text>
          {userLoggedIn !== undefined &&
            publisher &&
            userLoggedIn.id !== props.match.params.id && (
              <Text fontWeight='bold' color='brand.text' opacity='0.5'>
                Un-Published: {(publisher && publisher.length) || 'None'}
              </Text>
            )}
        </Box>
        <Avatar
          src={userInfo && userInfo.user.image}
          size={{ lg: '20vh', base: '14vh' }}
          size='2xl'
        />
      </Center>
      {userLoggedIn !== undefined &&
        publisher &&
        userLoggedIn.id !== props.match.params.id && (
          <Box>
            <UnPublishedBlogs blogs={publisher} />
          </Box>
        )}
      {userInfo ? (
        <Box>
          {userInfo.blogs.length && (
            <Heading
              textAlign='center'
              py='10'
              textDecor='underline'
              bg='brand.bg'
              color='brand.text'>
              <Text opacity='0.7'>Published Blogs</Text>
            </Heading>
          )}

          <Grid
            // pr='5'
            bg='brand.bg'
            color='brand.text'
            templateColumns={{ lg: 'repeat(2, 1fr)', base: '1' }}>
            {userInfo &&
              userInfo.blogs.map(
                (blog) =>
                  blog.isPublished && (
                    <Blog
                      blog={blog}
                      user={userLoggedIn}
                      profile={true}
                      comments={blog.comments}
                    />
                  )
              )}
          </Grid>
        </Box>
      ) : (
        <Box>
          <Progress
            isIndeterminate
            size='xs'
            colorScheme='green'
            rounded='sm'
          />
          <Heading textAlign='center' opacity='0.7' pt='48'>
            Getting blogs...
          </Heading>
        </Box>
      )}

      {noBlogs && (
        <Box>
          <Heading textAlign='center' opacity='0.7' pt='10'>
            No Blogs to show
          </Heading>
        </Box>
      )}
    </Box>
  );
}

export default Profile;
