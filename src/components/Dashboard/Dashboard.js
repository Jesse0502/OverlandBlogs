import React, { useContext, useEffect, useState } from 'react';
import useFetch from '../customHooks/useFetch';
import { userLoginContext } from '../contexts/context';
import useAuth from '../customHooks/useAuth';
import jwt from 'jsonwebtoken';
import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
} from '@chakra-ui/layout';
import CreateBlog from './CreateBlog';
import Blogs from './Blogs';
import { Button } from '@chakra-ui/button';

function Dashboard() {
  const [url, setUrl] = useState();
  const [userData, setUserData] = useState();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if (user) {
        setUrl(`user/${user.id}`);
        setUserData(user);
      } else {
      }
    }
  }, []);
  const { fetchData, fetchIsPending, fetchError } = useFetch(url, 'GET');
  console.log(!fetchIsPending && fetchData);

  return (
    <Box bg='brand.bg' minH='94vh' color='brand.text'>
      <Heading
        textAlign='center'
        pt='10'
        color='brand.main'
        textDecor='underline'>
        Overland Blogs
      </Heading>
      <Flex justify='space-between' px='10' w='container.xl' m='auto' py='20'>
        <Blogs />
        {userData ? (
          <CreateBlog data={fetchData} user={userData} />
        ) : (
          <Box textAlign='left' w='96'>
            <Heading color='brand.main'>Welcome to Overland Blogs</Heading>
            <Text color='brand.subText' py='2'>
              Please Login To Create Post
            </Text>
            <Link href='/login'>
              <Button
                w='full'
                mt='6'
                _hover='none'
                _active='none'
                h='12'
                bg='brand.main'
                color='brand.bgText'>
                Login
              </Button>
            </Link>
            <Flex alignItems='center' my='3'>
              <Divider />{' '}
              <Text px='5' color='brand.subText'>
                OR
              </Text>{' '}
              <Divider />
            </Flex>
            <Link href='/register'>
              <Button
                w='full'
                _hover='none'
                _active='none'
                h='12'
                color='white'
                bg='twitter.700'>
                Register
              </Button>
            </Link>
          </Box>
        )}
      </Flex>
    </Box>
  );
}

export default Dashboard;
