import React, { useEffect, useState } from 'react';
import useFetch from '../customHooks/useFetch';
import { Box, Center, Flex, Grid, Heading, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import Blog from './Blog';
import jwt from 'jsonwebtoken';

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
    <Box w='60%' minH='120vh'>
      {fetchData ? (
        fetchData.blogs.map((blog) => <Blog blog={blog} user={user} />)
      ) : (
        <Box>Loading...</Box>
      )}
    </Box>
  );
}

export default Blogs;
