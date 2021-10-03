import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import React from 'react';

function NavNotLoggedIn() {
  return (
    <div>
      {' '}
      <Box>
        <Button
          onClick={() => {
            window.location.href = '/login';
          }}
          variant='ghost'
          color='brand.bgText'
          _hover='none'
          _active='none'>
          Login
        </Button>
        <Button
          onClick={() => {
            window.location.href = '/register';
          }}
          variant='ghost'
          color='brand.bgText'
          _hover='none'
          _active='none'>
          Signup
        </Button>
      </Box>
    </div>
  );
}

export default NavNotLoggedIn;
