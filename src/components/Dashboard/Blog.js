import React, { useEffect, useState } from 'react';
import { Image } from '@chakra-ui/image';
import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Link,
  Text,
  Wrap,
} from '@chakra-ui/layout';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { Button } from '@chakra-ui/button';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Avatar,
} from '@chakra-ui/react';
function Blog({ blog, user }) {
  const [userExists, setUserExits] = useState(false);
  useEffect(() => {
    if (blog.authorID === user.id) {
      setUserExits(true);
    }
  });
  return (
    <Flex
      key={blog._id}
      w='full'
      py='6'
      transition='ease'
      borderRadius='10'
      transitionDuration='0.3s'>
      <Flex flexDir='column' px='5' pt='10'>
        <Box
          _hover={{ opacity: '0.8', cursor: 'pointer' }}
          onMouseOver={() => {}}>
          <Avatar size='md' src={blog.image} />
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
        <Box boxShadow='lg' borderRadius='10'>
          <Box pos='relative'>
            <Image
              src={blog.image}
              h='200px'
              objectFit='cover'
              w='100%'
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
              <MenuList bg='brand.bg' color='brand.text'>
                <MenuItem
                  onClick={() => alert('Read')}
                  _hover={{ bgColor: 'brand.main', color: 'white' }}
                  _active='none'
                  bg='transparent'
                  color='brand.text'>
                  Goto Profile
                </MenuItem>
                {userExists ? (
                  <MenuItem
                    onClick={() => alert('edit')}
                    _hover={{ bgColor: 'brand.main', color: 'white' }}
                    _active='none'
                    bg='transparent'
                    color='brand.text'>
                    Edit
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
                  Read full
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
          <Grid flexDir='column' gap='6' p='5'>
            <Heading
              color='brand.main'
              w='max'
              _hover={{
                // color: 'brand.text',
                cursor: 'pointer',
              }}>
              {blog.title}
            </Heading>
            {user ? (
              <Text fontWeight='bold'> {blog.author}</Text>
            ) : (
              <Text fontWeight='bold'>Anonymous</Text>
            )}

            <Text>{blog.body}</Text>
            <Flex justify='flex-start'>
              <Button variant='link'>Read more</Button>
            </Flex>
          </Grid>
        </Box>
      </Box>
    </Flex>
  );
}

export default Blog;
