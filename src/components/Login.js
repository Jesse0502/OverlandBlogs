import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Center, Flex, Grid, Heading, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';
import useFetch from './customHooks/useFetch';
import { LinkIcon } from '@chakra-ui/icons';
function Login() {
  const [loginData, setLoginData] = useState();
  const [spinner, setSpinner] = useState(true);
  const [show, setShow] = useState(false);
  const handleClick = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: e.target[0].value,
      password: e.target[1].value,
    };
    setLoginData(userData);
    setSpinner(false);
  };
  const { fetchData, fetchIsPending, fetchError } = useFetch(
    '/login',
    'POST',
    loginData
  );
  useEffect(() => {
    fetchData && setSpinner(true);
  }, [fetchData]);
  !fetchIsPending && localStorage.setItem('token', fetchData.token);
  if (fetchData.token) {
    window.location.href = '/';
  }

  return (
    <Center bg='brand.bg' h='94vh' color='brand.text'>
      <form onSubmit={handleSubmit}>
        <Grid
          // border=' 2px solid black'
          gap='10'
          px='10'
          py='32'
          boxShadow='2xl'
          w={{ md: '2xl', base: 'max' }}
          flexDir='column'>
          <Heading textAlign='center' color='brand.main'>
            Login <LinkIcon />
          </Heading>
          <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              name='email'
              borderColor='brand.subText'
              type='email'
              _placeholder={{ color: 'brand.text' }}
              placeholder='Enter Email'
              autoComplete='false'
            />
          </FormControl>
          <FormControl id='passoword' isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size='md'>
              <Input
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                _placeholder={{ color: 'brand.text' }}
                borderColor='brand.subText'
              />
              <InputRightElement width='4.5rem'>
                <Button
                  h='1.75rem'
                  size='sm'
                  onClick={handleClick}
                  color='brand.text'
                  bg='transparent'
                  _hover='none'
                  _active='none'>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Box>
            <Button
              type='submit'
              bg='brand.main'
              borderColor='brand.subText'
              w='full'
              _hover='none'
              color='brand.bgText'>
              {spinner ? (
                'Submit'
              ) : (
                <Spinner
                  thickness='4px'
                  speed='0.65s'
                  emptyColor='gray.200'
                  color='brand.main'
                  size='md'
                />
              )}
            </Button>
            <Text color='red'>{fetchData.msg}</Text>
            <Text color='green'>{fetchData.success}</Text>
          </Box>
        </Grid>
      </form>
    </Center>
  );
}

export default Login;
