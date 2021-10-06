import React, { useEffect, useState } from 'react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import useFetch from '../customHooks/useFetch';
import { Textarea } from '@chakra-ui/textarea';
import { CircularProgress, Image } from '@chakra-ui/react';
import { useHistory } from 'react-router';
function CreateBlog({ data, user }) {
  const [url, setUrl] = useState();
  const [postBody, setPostBody] = useState();
  const [uploadImg, setUploadImg] = useState();
  const [spinner, setSpinner] = useState(true);
  const [editor, setEditor] = useState();
  const history = useHistory();
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
  const [publish, setPublish] = useState(false);
  const handlePublish = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    if (publish) {
      const blogData = {
        title: e.target[0].value,
        body: e.target[1].value,
        author: data.name,
        authorID: user.id,
        isPublished: true,
        image: uploadImg ?? '',
        authorImage: data.image,
      };
      setUrl('/');
      setPostBody(blogData);
      setSpinner(false);
    } else {
      const blogData = {
        title: e.target[0].value,
        body: e.target[1].value,
        author: data.name,
        authorID: user.id,
        isPublished: false,
        image: uploadImg ?? '',
        authorImage: data.image,
      };
      setUrl('/');
      setPostBody(blogData);
      setSpinner(false);
    }
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
    fetchData && setPublish(null);
  }, [fetchData]);
  return (
    <Box
      w='96'
      px={{ lg: '0', base: '2' }}
      m={{ base: 'auto', lg: '0' }}
      py={{ lg: '0', base: '2' }}>
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
          <Flex justify='space-between'>
            <Button
              type='submit'
              bg='brand.main'
              borderColor='brand.subText'
              onClick={() => {
                setPublish(true);
              }}
              w='68%'
              isDisabled={!spinner}
              _hover='none'
              color='brand.bgText'>
              {spinner || !publish ? (
                'Publish'
              ) : (
                <CircularProgress
                  isIndeterminate
                  color='brand.main'
                  size='30px'
                  thickness='12'
                />
              )}
            </Button>
            <Button
              type='submit'
              bg='twitter.600'
              borderColor='brand.subText'
              onClick={() => {
                setPublish(false);
                history.goBack();
              }}
              w='30%'
              isDisabled={!spinner}
              _hover='none'
              color='brand.bgText'>
              {spinner || publish ? (
                'Save'
              ) : (
                <CircularProgress
                  display={!publish}
                  isIndeterminate
                  color='twitter.600'
                  size='30px'
                  thickness='12'
                />
              )}
            </Button>
          </Flex>
          {fetchData.success && <Text>{fetchData.success}</Text>}
        </FormControl>
      </form>
    </Box>
  );
}

export default CreateBlog;
