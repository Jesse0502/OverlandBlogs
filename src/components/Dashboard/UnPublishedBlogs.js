import React, { useState } from 'react';
import { Box, Center, Flex, Heading, Text } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import noImage from '../assets/images/question-mark-img.JPEG';
import { Menu, MenuButton, MenuList, MenuItem, Avatar } from '@chakra-ui/react';
import {
  ExternalLinkIcon,
  EditIcon,
  ViewIcon,
  DeleteIcon,
} from '@chakra-ui/icons';

import { Button } from '@chakra-ui/button';
import { useHistory } from 'react-router';
function UnPublishedBlogs({ blogs }) {
  console.log('Unpublished');
  console.log(blogs);
  const history = useHistory();

  const [published, setPublished] = useState(false);
  const handlePublished = (e) => {
    setPublished(true);

    fetch(`https://s5po6.sse.codesandbox.io/blog/publish/${e}?_method=PUT`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isPublished: true, createdAt: Date.now() }),
    })
      .then((res) => {
        return res.json();
      })
      .then((e) => {
        alert('Blog Published!');
        history.push('/');
      })
      .catch((err) => {
        alert(err);
      });
  };
  const [deleted, setDeleted] = useState(false);
  const handleEdit = (e) => {
    // alert(e._id);
    window.location.href = `/edit/${e._id}`;
  };
  const handleDelete = (e) => {
    fetch(`https://s5po6.sse.codesandbox.io/blog/${e}?_method=DELETE`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        window.location.reload();
        // window.location.href = '/';
      })
      .catch((err) => {
        alert('Some error occured, blog was not deleted.');
      });
    setDeleted(true);
  };
  return (
    <Box>
      {blogs && blogs.length && (
        <Box py='10' bg='brand.bg' color='brand.text' px='10'>
          <Heading
            py='5'
            textAlign='center'
            textDecor='underline'
            opacity='0.7'>
            Un-Published Blogs
          </Heading>
          <span>
            <Text
              textAlign='center'
              opacity='0.7'
              fontSize='sm'
              textDecor='none'>
              (Refresh to see changes)
            </Text>
          </span>
          <Flex overflow='auto' py='10'>
            {blogs &&
              blogs.map((blog) => (
                <Box mx='5'>
                  <Text opacity='0.7'>Un-Published</Text>
                  <Box
                    w='370px'
                    minW='370px'
                    bg='brand.bg'
                    boxShadow='2xl'
                    borderRadius='12'
                    color='brand.text'>
                    <Box pos='relative'>
                      <Image
                        borderRadius='10'
                        h='270px'
                        shadow='xl'
                        objectFit='cover'
                        w='full'
                        src={blog.image ? blog.image : noImage}></Image>
                      <Menu autoSelect={false}>
                        <MenuButton
                          pos='absolute'
                          top='10px'
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
                          &#8226;&#8226;&#8226;
                        </MenuButton>
                        <MenuList
                          bg='brand.bg'
                          color='brand.text'
                          border='2px solid black'
                          borderColor='#a3a3a3'>
                          {/* {userExists ? ( */}
                          <MenuItem
                            _hover={{ bgColor: 'brand.main', color: 'white' }}
                            _active='none'
                            bg='transparent'
                            onClick={(e) => handlePublished(blog._id)}
                            color='brand.text'>
                            <ExternalLinkIcon mr='2' /> Publish
                          </MenuItem>

                          <MenuItem
                            _hover={{ bgColor: 'brand.main', color: 'white' }}
                            _active='none'
                            bg='transparent'
                            onClick={() => handleEdit(blog)}
                            color='brand.text'>
                            <EditIcon mr='2' /> Edit
                          </MenuItem>

                          <MenuItem
                            _hover={{ bgColor: 'brand.main', color: 'white' }}
                            _active='none'
                            bg='transparent'
                            onClick={(e) => handleDelete(blog._id)}
                            color='brand.text'>
                            <DeleteIcon mr='2' /> Delete
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </Box>
                    <Box p='5'>
                      <Heading pb='2' opacity='0.7'>
                        {blog.title}
                      </Heading>
                      <Text noOfLines={1}>{blog.body}</Text>
                    </Box>
                  </Box>
                </Box>
              ))}
          </Flex>
        </Box>
      )}
    </Box>
  );
}

export default UnPublishedBlogs;
