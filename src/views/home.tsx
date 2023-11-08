import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import React from 'react';
import {View, Text} from 'react-native';
import {useForm} from 'react-hook-form';

export default function Login() {
  const postTweet = () => {
    console.log('Tweet');
  };
  const {control, handleSubmit, watch} = useForm();
  return (
    <View>
      <InputComponent
        name="Text"
        placeholder="Write something..."
        control={control}
        rules={{
          required: 'Text is required',
          maxLength: {
            value: 280,
            message: 'Text should be maximum 280 characters long',
          },
        }}
      />
      <ButtonComponent
        backgroundColor="#0A4A5D"
        text="POST"
        onPress={postTweet}
      />
    </View>
  );
}
