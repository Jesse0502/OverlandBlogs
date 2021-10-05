import { Button } from '@chakra-ui/button';
import { Box, Center, Flex, Grid, Text } from '@chakra-ui/layout';
import { Switch } from '@chakra-ui/switch';
import React, { useState } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { Portal } from '@chakra-ui/portal';
import { ChevronDownIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/image';
import LogoutIcon from '../assets/images/logout.svg';
import ProfileIcon from '../assets/images/profile.svg';

import useAuth from '../customHooks/useAuth';
function NavLoggedIn({ fetchData, fetchIsPending, handleTheme }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  const { userLoggedIn } = useAuth();

  console.log(fetchData);
  const [open, setOpen] = useState(false);
  return (
    <Center>
      <Menu>
        <MenuButton>
          <Flex
            p='1'
            borderRadius='20'
            alignItems='center'
            _hover={{ borderColor: 'red' }}>
            <Avatar size='sm' src={!fetchIsPending && fetchData.image}></Avatar>
            {/* <ChevronDownIcon fontSize='xl' color='white' mx='1' /> */}
          </Flex>
        </MenuButton>
        <Portal>
          <MenuList bg='brand.bg' color='brand.subText'>
            <Image
              size='sm'
              w='full'
              h='24'
              objectFit='cover'
              src={!fetchIsPending && fetchData.image}></Image>{' '}
            <Text
              color='brand.bgText'
              fontWeight='bold'
              fontSize='1.2em'
              p='3'
              bg='brand.main'>
              Welcome back, {!fetchIsPending && fetchData.name}
            </Text>
            <MenuItem
              onClick={() =>
                (window.location.href = '/profile/' + userLoggedIn.id)
              }
              _hover={{ bgColor: 'brand.main', color: 'white' }}
              _active='none'
              bg='transparent'
              color='brand.text'>
              <Image src={ProfileIcon} mr='2'></Image>
              Profile
            </MenuItem>
            <MenuItem
              onClick={handleLogout}
              _hover={{ bgColor: 'brand.main', color: 'white' }}
              _active='none'
              bg='transparent'
              color='brand.text'>
              <Center>
                <Image src={LogoutIcon} mr='2'></Image>
                Logout
              </Center>
            </MenuItem>
            <MenuItem
              _hover={{ bgColor: 'brand.main', color: 'white' }}
              _active='none'
              bg='transparent'
              color='brand.text'>
              <Center justifyContent='space-between'>
                <Text>Dark Mode</Text>
                <Switch
                  ml='28'
                  value='dark'
                  id='email-alerts'
                  colorScheme='gray'
                  size='md'
                  onChange={handleTheme}
                />
              </Center>
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </Center>
  );
}

export default NavLoggedIn;
