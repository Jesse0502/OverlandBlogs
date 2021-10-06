import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import React from 'react';
import { useHistory } from 'react-router';

function NavNotLoggedIn() {
  const history = useHistory();
  return (
    <div>
      {' '}
      <Box>
        <Button
          onClick={() => {
            history.push('/login');
          }}
          variant='ghost'
          color='brand.bgText'
          _hover='none'
          _active='none'>
          Login
        </Button>
        <Button
          onClick={() => {
            history.push('/register');
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
