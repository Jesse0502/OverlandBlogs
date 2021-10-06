import React, { useEffect, useState } from 'react';
import { Box, Center, Heading, Text } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Image } from '@chakra-ui/image';
import { Button } from '@chakra-ui/button';
import { useHistory } from 'react-router';

function Edit(props) {
  let history = useHistory();

  const id = props.match.params.id;
  const [fetchData, setFetchData] = useState();
  const [updatePending, setUpdatePending] = useState(false);
  useEffect(() => {
    fetch(`https://overland-api.herokuapp.com/blog/edit/${id}`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        console.log(result);
        setFetchData(result);
      })
      .catch(() => {});
  }, [id]);
  const [uploadImg, setUploadImg] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      title: e.target[0].value,
      body: e.target[1].value,
      image: uploadImg ?? fetchData.blog.image,
    };
    setUpdatePending(true);

    fetch(`https://overland-api.herokuapp.com/blog/edit/${id}?_method=PUT`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((res) => {
        return res.json();
      })
      .then(() => {
        setUpdatePending(false);
        history.goBack();
        // window.location.href = '/';
      })
      .catch(() => {});
  }
  const handleImageUpload = (e) => {
    e.preventDefault();
    let preview = document.querySelector('#img');
    let file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
      setUploadImg(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = '';
    }
  };
  return (
    <Box bg='brand.bg' color='brand.text' minH='100vh'>
      <Box pt='20' w='70vh' m='auto'>
        <Heading textAlign='center'>Edit</Heading>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Center flexDir='column'>
            <FormControl id='title' isRequired pt='5'>
              <FormLabel>Title</FormLabel>
              <Input
                name='title'
                borderColor='brand.subText'
                type='text'
                defaultValue={fetchData && fetchData.blog.title}
                _placeholder={{ color: 'brand.text' }}
                placeholder='Enter Email'></Input>
            </FormControl>
            <FormControl id='body' isRequired py='3'>
              <FormLabel>Body</FormLabel>
              <Input
                name='body'
                borderColor='brand.subText'
                type='text'
                defaultValue={fetchData && fetchData.blog.body}
                _placeholder={{ color: 'brand.text' }}
                placeholder='Enter Title'
              />
            </FormControl>
            <FormControl id='image'>
              <FormLabel>Image</FormLabel>

              <Text py='3'>
                {fetchData && fetchData.blog.image
                  ? 'Select Another?'
                  : 'You have no image uploaded yet... Upload One'}
              </Text>
              <input type='file' onChange={(e) => handleImageUpload(e)}></input>
              {fetchData && fetchData.blog.image ? (
                <Image
                  w='full'
                  h='300px'
                  pt='2'
                  id='img'
                  objectFit='contain'
                  src={fetchData && fetchData.blog.image}></Image>
              ) : (
                <Image
                  w='full'
                  pt='2'
                  h='300px'
                  id='img'
                  objectFit='contain'></Image>
              )}
            </FormControl>
          </Center>
          <Button
            isDisabled={updatePending}
            my='1'
            color='brand.bgText'
            w='full'
            _hover='none'
            bg='brand.main'
            type='submit'>
            {!updatePending ? 'Submit' : 'Submiting...'}
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default Edit;
