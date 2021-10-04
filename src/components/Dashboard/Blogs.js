import React, { useEffect, useState } from 'react';
import useFetch from '../customHooks/useFetch';
import { Box, Center, Flex, Grid, Heading, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import Blog from './Blog';
import jwt from 'jsonwebtoken';
import { Progress } from '@chakra-ui/react';

function Blogs() {
  const [url, setUrl] = useState();
  const [fetchData, setFetchData] = useState();
  const [user, setUser] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwt.decode(token);
      if (user) {
        setUser(user);
      } else {
      }
    }
  }, []);
  function getData() {
    fetch(`http://localhost:9000/blogs`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setFetchData(result);
      })
      .catch((err) => {});
  }
  return (
    <Box w={{ lg: '65%', base: 'full' }} minH='120vh'>
      {fetchData ? (
        fetchData.blogs.map((blog) => <Blog blog={blog} user={user} />)
      ) : (
        <Box>
          <Progress
            isIndeterminate
            size='xs'
            colorScheme='green'
            rounded='sm'
          />
          <Center fontSize='2xl'>Getting Blogs...</Center>
        </Box>
      )}
    </Box>
  );
}

export default Blogs;
