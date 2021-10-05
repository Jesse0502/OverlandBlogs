import React, { useEffect, useState } from 'react';
import useFetch from './customHooks/useFetch';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Center, Flex, Grid, Heading, Text } from '@chakra-ui/layout';
import { Spinner } from '@chakra-ui/react';
import { Button } from '@chakra-ui/button';

import { LinkIcon } from '@chakra-ui/icons';
function Register() {
  const [passwordErr, setPasswordErr] = useState();
  const [formData, setFormData] = useState();
  const [show, setShow] = useState(false);
  const [spinner, setSpinner] = useState(true);

  const handleClick = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target[2].value !== e.target[4].value) {
      return setPasswordErr('Passwords must match');
    }
    const regData = {
      name: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      createdAt: new Date(),
    };
    setFormData(regData);
  };
  const { fetchData, fetchIsPending, fetchError } = useFetch(
    '/register',
    'POST',
    formData
  );
  if (fetchData.ok) {
    window.location.href = '/';
  }
  if (fetchData.sucess) {
    window.location.href = '/login';
  }
  return (
    <Center bg='brand.bg' color='brand.text' maxH='90vh'>
      <form onSubmit={handleSubmit}>
        <Grid
          // border=' 2px solid black'
          gap={{ lg: '7', base: '10' }}
          px={{ lg: '10', base: '5' }}
          mt='32'
          py='10'
          // h='96'
          boxShadow='2xl'
          w={{ md: '2xl', base: 'sm' }}
          flexDir='column'>
          <Heading textAlign='center' color='brand.main'>
            Register <LinkIcon />
          </Heading>
          <FormControl id='email' isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              w={{ base: '38vh', lg: 'full' }}
              name='name'
              borderColor='brand.subText'
              type='text'
              _placeholder={{ color: 'brand.text' }}
              placeholder='Enter Name'
              autoComplete='false'
            />
          </FormControl>
          <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              w={{ base: '38vh', lg: 'full' }}
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
                w={{ base: '38vh', lg: 'full' }}
                pr='4.5rem'
                minLength={10}
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                _placeholder={{ color: 'brand.text' }}
                borderColor='brand.subText'
              />
              <InputRightElement width='4.5rem'>
                <Button
                  w={{ base: '38vh', lg: 'full' }}
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
          <FormControl id='passoword' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size='md'>
              <Input
                w={{ base: '38vh', lg: 'full' }}
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder='Enter password'
                _placeholder={{ color: 'brand.text' }}
                borderColor='brand.subText'
              />
              <InputRightElement width='4.5rem'>
                <Button
                  h='1.75rem'
                  w={{ base: '38vh', lg: 'full' }}
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
          <Box w={{ base: '38vh', lg: 'full' }}>
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
            <Text
              color='red'
              opacity={fetchData.msg ? '1' : '0'}
              transition='ease'
              transitionDuration='0.4s'>
              {fetchData.msg}
            </Text>
            <Text color='green'>{fetchData.success}</Text>
            <Text color='crimson'>{fetchError.msg}</Text>
            <Text color='crimson'>{passwordErr}</Text>
          </Box>
        </Grid>
      </form>
      {/* <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input name='name' type='text' required />
        <label>Email</label>
        <input name='email' type='email' required />
        <label>Pass</label>
        <input name='password' type='password' required />
        <label>Confirm Pass</label>
        <input name='password' type='password' required />
        <input type='submit' value='Submit' />
      </form> */}
    </Center>
  );
}

export default Register;
