import React, { useEffect, useState } from 'react';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/layout';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Button } from '@chakra-ui/button';
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from '@chakra-ui/react';
import {
  ExternalLinkIcon,
  EditIcon,
  ViewIcon,
  DeleteIcon,
} from '@chakra-ui/icons';
import likeButton from '../assets/images/like.svg';
import dislikeButton from '../assets/images/dislike.svg';
import unlikeButton from '../assets/images/unlike.svg';
import undislikeButton from '../assets/images/undislike.svg';
import useFetch from '../customHooks/useFetch';
import noImage from '../assets/images/question-mark-img.JPEG';
import Comments from './Comments';
function Blog({ blog, user }) {
  const [userExists, setUserExits] = useState(false);
  useEffect(() => {
    if (blog.authorID === user.id) {
      setUserExits(true);
    }
  });
  const [url, setUrl] = useState();
  const [postbody, setPostbody] = useState();
  const [deleted, setDeleted] = useState(false);
  const [fakeLike, setFakeLike] = useState(blog.likes);
  const [readFullExpand, setReadFullExpand] = useState(3);
  const handlefullBody = () => {
    if (readFullExpand == 3) {
      setReadFullExpand(null);
    } else {
      setReadFullExpand(3);
    }
  };
  const handleDelete = () => {
    setUrl('/blog/' + blog._id + '?_method=DELETE');
    setPostbody({ blogID: blog._id });
    setDeleted(true);
  };

  const { fetchData, fetchIsPending, fetchError } = useFetch(
    url,
    'POST',
    postbody
  );
  return (
    <Flex
      overflowWrap='break-word'
      display={!deleted ? 'flex' : 'none'}
      key={blog._id}
      // overflowY='hidden'
      w={{ base: '60%', lg: 'full' }}
      py='6'
      transition='ease'
      borderRadius='10'
      transitionDuration='0.3s'>
      <Flex flexDir='column' px={{ lg: '5', base: '2' }} pt='10'>
        <Box
          display={{ base: 'none', lg: 'contents' }}
          _hover={{ opacity: '0.8', cursor: 'pointer' }}
          onMouseOver={() => {}}>
          <Avatar size='md' src={blog.authorImage} />
        </Box>
      </Flex>
      <Box>
        <Text
          color='brand.subText'
          py='2'
          transition='ease'
          transitionDuration='0.3s'
          _hover={{
            color: 'brand.text',
            cursor: 'pointer',
          }}>
          Created{' '}
          {formatDistanceToNow(new Date(blog.createdAt), {
            addSuffix: true,
          })}
        </Text>
        <Box boxShadow='lg' borderRadius='10' w={{ lg: 'full', base: '96' }}>
          <Box pos='relative'>
            <Image
              transition='ease'
              transitionDuration='0.3s'
              _hover={{ opacity: '0.8' }}
              src={blog.image ? blog.image : noImage}
              h='200px'
              objectFit='cover'
              w='100vh'
              borderTopRadius='10'
            />
            <Menu autoSelect={false}>
              <MenuButton
                pos='absolute'
                top='5px'
                right='5px'
                _hover={{
                  outline: 'none',
                }}
                _active={{
                  outline: '1px solid black',
                  outlineColor: 'brand.bg',
                }}
                as={Button}
                px='4'
                borderRadius='10'
                bg='whiteAlpha.500'
                color='blackAlpha.800'>
                {/* <TriangleDownIcon /> */}
                &#8226;&#8226;&#8226;
              </MenuButton>
              <MenuList
                bg='brand.bg'
                color='brand.text'
                border='2px solid black'
                borderColor='#a3a3a3'>
                <MenuItem
                  onClick={() => alert('Read')}
                  _hover={{ bgColor: 'brand.main', color: 'white' }}
                  _active='none'
                  bg='transparent'
                  color='brand.text'>
                  <ExternalLinkIcon mr='2' /> Goto Profile
                </MenuItem>
                {userExists ? (
                  <MenuItem
                    onClick={() => alert('edit')}
                    _hover={{ bgColor: 'brand.main', color: 'white' }}
                    _active='none'
                    bg='transparent'
                    color='brand.text'>
                    <EditIcon mr='2' /> Edit
                  </MenuItem>
                ) : (
                  ''
                )}
                {userExists ? (
                  <MenuItem
                    onClick={handleDelete}
                    _hover={{ bgColor: 'brand.main', color: 'white' }}
                    _active='none'
                    bg='transparent'
                    color='brand.text'>
                    <DeleteIcon mr='2' /> Delete
                  </MenuItem>
                ) : (
                  ''
                )}

                <MenuItem
                  onClick={() => alert('Read')}
                  _hover={{ bgColor: 'brand.main', color: 'white' }}
                  _active='none'
                  bg='transparent'
                  color='brand.text'>
                  <ViewIcon mr='2' />
                  Read full
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Grid flexDir='column' gap='6' p='5'>
            <Heading
              color='brand.main'
              w='100%'
              overflowWrap='break-word'
              transition='ease'
              transitionDuration='0.3s'
              _hover={{
                // color: 'brand.text',
                cursor: 'pointer',
                opacity: '0.9',
              }}>
              {blog.title}
            </Heading>
            {user ? (
              <Text fontWeight='bold'> {blog.author}</Text>
            ) : (
              <Text fontWeight='bold'>Anonymous</Text>
            )}

            <Text
              noOfLines={readFullExpand}
              transitionDuration='0.3s'
              transition='ease'
              textOverflow='ellipsis'>
              {blog.body}
            </Text>
            <Flex justify='flex-start'>
              <Button variant='link' onClick={handlefullBody}>
                {readFullExpand ? 'Read more' : 'Read Less'}
              </Button>
            </Flex>
            {/* <Flex>
              <Flex>
                <Image
                  src={!liked ? unlikeButton : likeButton}
                  color='brand.text'
                  cursor='pointer'
                  onClick={handleLike}
                />
                <Text px='1' fontWeight='bold'>
                  {fakeLike}
                </Text>
              </Flex>
            </Flex> */}
          </Grid>
          {user && (
            <Comments user={user} blogID={blog._id} comments={blog.comments} />
          )}
        </Box>
      </Box>
    </Flex>
  );
}

export default Blog;
