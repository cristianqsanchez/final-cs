import React from 'react';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import {View, Text} from 'react-native';
import {useForm} from 'react-hook-form';

function TweetComponent({id}) {
  const {control, handleSubmit, watch} = useForm();
  const postTweet = () => {
    console.log('Tweet');
  };
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

export default TweetComponent;
