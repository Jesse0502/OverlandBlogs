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

function Profile(props) {
  const [url, setUrl] = useState(null);
  // const { userLoggedIn } = useAuth();
  const [noBlogs, setNoBlogs] = useState();
  const [userInfo, setUserInfo] = useState();
  // useEffect(() => {
  //   if (userLoggedIn) {
  //     setUrl('user/' + userLoggedIn.id);
  //   }
  // }, [userLoggedIn]);
  // const { fetchData, fetchIsPending, fetchError } = useFetch(url, 'GET');
  const [userLoggedIn, setUserLoggedIn] = useState();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if (user) {
        setUserLoggedIn(user);
      } else {
        setUserLoggedIn(null);
      }
    }
  }, []);
  useEffect(() => {
    setNoBlogs(false);
    fetch('https://s5po6.sse.codesandbox.io/profile/' + props.match.params.id)
      .then((result) => {
        return result.json();
      })
      .then((user) => {
        console.log(user);
        setUserInfo(user);
        if (user.blogs.length) {
          setNoBlogs(false);
        } else {
          setNoBlogs(true);
        }
      });
  }, [props.match.params.id]);
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
              Overlander since:{' '}
              {userInfo.user.createdAt
                ? formatDistanceToNow(new Date(userInfo.user.createdAt))
                : 'No Info :('}
            </Text>
          )}
          <Text pt='5' fontWeight='bold' color='brand.text' opacity='0.5'>
            Blogs Published: {userInfo && userInfo.blogs.length}
          </Text>
        </Box>
        <Avatar
          src={userInfo && userInfo.user.image}
          size={{ lg: '20vh', base: '14vh' }}
          size='2xl'
        />
      </Center>
      {userInfo ? (
        <Grid
          pr='5'
          bg='brand.bg'
          color='brand.text'
          templateColumns={{ lg: 'repeat(2, 1fr)', base: '1' }}
          gap={{ lg: 3, base: 0 }}>
          {userInfo &&
            userInfo.blogs.map((blog) => (
              <Blog blog={blog} user={userLoggedIn} profile={true} />
            ))}
        </Grid>
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
          <Heading textAlign='center' opacity='0.7' pt='48'>
            No Blogs to show
          </Heading>
        </Box>
      )}
    </Box>
  );
}

export default Profile;
