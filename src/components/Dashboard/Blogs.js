import React, { useEffect, useState } from 'react';
import useFetch from '../customHooks/useFetch';
import { Box, Center, Flex, Grid, Heading, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import Blog from './Blog';
import jwt from 'jsonwebtoken';
import { CircularProgress, Progress } from '@chakra-ui/react';
import TimelineIcon from '../assets/images/timeline.svg';
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
    fetch(`https://s5po6.sse.codesandbox.io/blogs`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setFetchData(result);
      })
      .catch((err) => {});
  }
  return (
    <Box w={{ lg: '65%', base: '100%' }}>
      <Flex
        alignItems='center'
        w='90%'
        m='auto'
        pl={{ lg: '12' }}
        pt={{ base: '20', lg: 0 }}>
        <Heading opacity='0.7' fontSize={{ base: '3em' }} textDecor='underline'>
          Timeline
        </Heading>

        <Image pl='2' src={TimelineIcon} w='50px' />
      </Flex>
      {fetchData ? (
        fetchData.blogs.map(
          (blog) => blog.isPublished && <Blog blog={blog} user={user} />
        )
      ) : (
        <Center pt={{ base: '32', lg: '44' }} w='90%' m='auto'>
          <Heading
            fontSize={{ base: '2xl', lg: '2.3em' }}
            opacity='0.7'
            pr={{ base: '3', lg: '7' }}>
            Getting Blogs
          </Heading>
          <CircularProgress
            isIndeterminate
            size={{ base: '40px', lg: '60px' }}
            color='brand.main'
          />
        </Center>
      )}
    </Box>
  );
}

export default Blogs;
