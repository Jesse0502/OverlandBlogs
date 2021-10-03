import { Button } from '@chakra-ui/button';
import { Box, Center } from '@chakra-ui/layout';
import { Switch } from '@chakra-ui/switch';
import React from 'react';

function NavLoggedIn({ fetchData, fetchIsPending }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  return (
    <Center>
      <Box>Welcome {!fetchIsPending && fetchData.name}</Box>
      <Button onClick={handleLogout}>Logout</Button>
    </Center>
  );
}

export default NavLoggedIn;
