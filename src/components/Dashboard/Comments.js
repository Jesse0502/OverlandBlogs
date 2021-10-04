import React, { useEffect, useState } from 'react';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Grid, Heading, Text, Center } from '@chakra-ui/layout';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Button } from '@chakra-ui/button';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Input,
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import useFetch from '../customHooks/useFetch';
import { CircularProgress } from '@chakra-ui/react';
function Comments({ user, blogID, comments }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState();
  const [postBody, setPostBody] = useState();
  const [comment, setComment] = useState(false);
  const [commentData, setCommentData] = useState(null);
  const [userDetail, setUserDetail] = useState();
  const handleOpen = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  const handleComment = (e) => {
    e.preventDefault();
    setComment(true);
    setUrl('/blog/comment/' + blogID + '?_method=PUT');
    setPostBody({
      comment: document.querySelector('#form')[0].value,
      createdAt: Date.now(),
      user: user.id,
      image: userDetail.image,
      name: userDetail.name,
    });
    console.log(document.querySelector('#form')[0].value);
  };
  useEffect(() => {
    fetch(`http://localhost:9000/user/${user.id}`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setUserDetail(result);
        console.log(comments);
      })
      .catch((err) => {});
  }, []);
  useEffect(() => {
    fetch(`http://localhost:9000/blog/comments/${blogID}`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setComment(false);
        setCommentData(result.comments);
        document.querySelector('#form')[0].value = null;
      })
      .catch((err) => {});
  }, [open, comment]);
  const { fetchData, fetchError, fetchIsPending } = useFetch(
    url,
    'POST',
    postBody
  );
  return (
    <Box transition='ease' transitionDuration='0.3s'>
      <Center py='3'>
        <Button
          onClick={handleOpen}
          rounded='2xl'
          bg='brand.bg'
          color='brand.text'
          _hover={{ bg: 'whiteAlpha.300' }}>
          Comments
          {!open ? <ChevronDownIcon mx='1' /> : <ChevronUpIcon mx='1' />}
        </Button>
      </Center>
      <Box display={open ? 'block' : 'none'}>
        <Box
          overflowY='auto'
          maxH='500px'
          transition='ease'
          transitionDuration='0.3s'>
          {commentData ? (
            commentData.map((comment) => (
              <Flex px='5' py='3' key={comment.createdAt}>
                <Avatar src={comment.image} mr='4' />
                <Flex flexDir='column'>
                  <Heading fontSize='md'>
                    {comment.name}{' '}
                    <span>
                      &#8226;
                      <Text
                        fontWeight='normal'
                        fontSize='sm'
                        color='brand.subText'
                        display='inline-block'
                        px='1'>
                        {formatDistanceToNow(comment.createdAt, {
                          addSuffix: true,
                        })}
                      </Text>
                    </span>{' '}
                  </Heading>

                  <Text mt='1' color='brand.text' opacity='0.7'>
                    {comment.comment}
                  </Text>
                </Flex>
              </Flex>
            ))
          ) : (
            <Center my='5'>
              <Text fontWeight='bold'>Hold on!</Text>
              <Text mx='2'>Getting comments...</Text>
              <CircularProgress size='6' isIndeterminate color='brand.main' />
            </Center>
          )}
        </Box>
        {open && (
          <form onSubmit={handleComment} id='form'>
            <Center px='3' py='3'>
              <Avatar src={userDetail.image} />
              <Input
                mx='4'
                borderColor='brand.subText'
                placeholder='Comment something...'
                border='1px'
                borderColor='brand.subText'
                _placeholder={{ color: 'brand.subText' }}
              />

              <Button
                bg='brand.main'
                _hover='none'
                _active='none'
                isDisabled={comment}
                color='white'
                w='32'
                type='submit'>
                {!comment ? (
                  <Text>Submit</Text>
                ) : (
                  <Center>
                    <CircularProgress
                      size='6'
                      isIndeterminate
                      color='brand.main'
                    />
                  </Center>
                )}
              </Button>
            </Center>
          </form>
        )}
      </Box>
    </Box>
  );
}

export default Comments;
