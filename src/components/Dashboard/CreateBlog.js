import React, { useEffect, useState } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input, InputGroup, InputRightElement } from '@chakra-ui/input';
import { Box, Center, Flex, Grid, Heading, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Spinner } from '@chakra-ui/spinner';
import useFetch from '../customHooks/useFetch';
import { Textarea } from '@chakra-ui/textarea';
import {
  CircularProgress,
  CircularProgressLabel,
  Image,
} from '@chakra-ui/react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

function CreateBlog({ data, user }) {
  const [url, setUrl] = useState();
  const [postBody, setPostBody] = useState();
  const [uploadImg, setUploadImg] = useState();
  const [spinner, setSpinner] = useState(true);
  const [editor, setEditor] = useState();
  function previewFile() {
    var preview = document.querySelector('#img');
    var file = document.querySelector('input[type=file]').files[0];
    var reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
      setUploadImg(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const blogData = {
      title: e.target[0].value,
      body: e.target[1].value,
      author: data.name,
      authorID: user.id,
      image: uploadImg ?? '',
      authorImage: data.image,
    };
    setUrl('/');
    setPostBody(blogData);
    setSpinner(false);
    console.log(blogData);
  };
  const { fetchData, fetchIsPending, fetchError } = useFetch(
    url,
    'POST',
    postBody
  );
  useEffect(() => {
    if (fetchData) {
      window.location.href = '/';
    }
    fetchData && setSpinner(true);
  }, [fetchData]);
  return (
    <Box
      w='96'
      px={{ lg: '0', base: '2' }}
      m={{ base: 'auto', lg: '0' }}
      py={{ lg: '0', base: '2' }}>
      {/* <Center>
        <Button color='brand.main' bg='brand.bg'>
          Create Blog
        </Button>
      </Center> */}
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Heading color='brand.main'>Create Blog</Heading>
          <Grid py='5' pb='2' w='full'>
            <FormLabel>Title</FormLabel>
            <Textarea
              type='text'
              placeholder='Title for your blog'
              _placeholder={{ color: 'brand.text' }}
              borderColor='brand.subText'
              required
            />
            <Box py='2'>
              <FormLabel>Body</FormLabel>
              <Textarea
                required
                borderColor='brand.subText'
                placeholder='Describe your Blog'
                _placeholder={{ color: 'brand.text' }}
                type='text'
              />
            </Box>
            <FormLabel>Image</FormLabel>
            <Input
              type='file'
              border='none'
              p='0px'
              m='0px'
              onChange={previewFile}
            />
            <Image
              w={{ lg: 'full', base: '96' }}
              objectFit='cover'
              src=''
              alt=''
              id='img'
            />
          </Grid>
          <Button
            type='submit'
            bg='brand.main'
            borderColor='brand.subText'
            w='full'
            isDisabled={!spinner}
            _hover='none'
            color='brand.bgText'>
            {spinner ? (
              'Submit'
            ) : (
              <CircularProgress
                isIndeterminate
                color='brand.main'
                size='30px'
                thickness='12'
              />
            )}
          </Button>

          {fetchData.success && <Text>{fetchData.success}</Text>}
        </FormControl>
      </form>
    </Box>
  );
}

export default CreateBlog;
