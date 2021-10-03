import React from 'react';
import { Button } from '@chakra-ui/button';
import { Box, Center, Flex, Heading, Text } from '@chakra-ui/layout';
import { Switch } from '@chakra-ui/switch';
import { themeContext } from '../contexts/context';
import { useContext } from 'react';
import useAuth from '../customHooks/useAuth';
import useFetch from '../customHooks/useFetch';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from '@chakra-ui/react';
import NavNotLoggedIn from './NavNotLoggedIn';
import NavLoggedIn from './NavLoggedIn';
function Nav() {
  const [url, setUrl] = useState(null);
  const { currentTheme, setCurrentTheme } = useContext(themeContext);
  const { userLoggedIn } = useAuth();

  const handleTheme = () => {
    if (currentTheme) {
      setCurrentTheme(false);
    } else {
      setCurrentTheme(true);
    }
  };
  useEffect(() => {
    localStorage.removeItem('theme');
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme]);
  useEffect(() => {
    if (userLoggedIn) {
      setUrl('user/' + userLoggedIn.id);
    }
  }, [userLoggedIn]);
  const { fetchData, fetchIsPending, fetchError } = useFetch(url, 'GET');
  return (
    <Flex
      justify='space-between'
      h='7vh'
      alignItems='center'
      px='4'
      bgColor='brand.main'>
      <Box>
        <Heading size='lg' color='brand.bgText'>
          <Link href='/'>Blog App</Link>
        </Heading>
      </Box>
      {!userLoggedIn ? (
        <Center>
          <Switch
            value='dark'
            id='email-alerts'
            colorScheme='gray'
            size='lg'
            onChange={handleTheme}
          />
          <NavNotLoggedIn />
        </Center>
      ) : (
        <Center>
          <Switch
            px='2'
            value='dark'
            id='email-alerts'
            colorScheme='gray'
            size='lg'
            onChange={handleTheme}
          />
          <NavLoggedIn fetchData={fetchData} fetchIsPending={fetchIsPending} />
        </Center>
      )}
    </Flex>
  );
}

export default Nav;
