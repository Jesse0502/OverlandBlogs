import { Button } from '@chakra-ui/button';
import { Box, Center, Flex, Grid, Text } from '@chakra-ui/layout';
import { Switch } from '@chakra-ui/switch';
import React, { useState } from 'react';
import { Avatar } from '@chakra-ui/avatar';
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu';
import { Portal } from '@chakra-ui/portal';
import { ChevronDownIcon, ExternalLinkIcon } from '@chakra-ui/icons';
function NavLoggedIn({ fetchData, fetchIsPending }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  console.log(fetchData.email);
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
          <MenuList>
            {' '}
            <Text
              color='brand.bgText'
              fontWeight='bold'
              fontSize='1.2em'
              p='3'
              bg='brand.main'>
              Welcome back, {!fetchIsPending && fetchData.name}
            </Text>
            <MenuItem onClick={handleLogout}>
              <Center>
                <ExternalLinkIcon mr='2' />
                Logout
              </Center>
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    </Center>
  );
}

export default NavLoggedIn;
