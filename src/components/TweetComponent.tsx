import React, {useCallback, useEffect, useState} from 'react';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import {View, Text} from 'react-native';
import {useForm} from 'react-hook-form';
import {arrayUnion, doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from '../config/firebase';
function createTweet(author, username, content) {
  return {
    author: author,
    username: username,
    content: content,
    date: Date.now(),
  };
}
function TweetComponent({id}) {
  const {control, handleSubmit} = useForm();
  const saveTweet = async data => {
    try {
      const userRef = doc(db, 'users', id);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        console.log(userData.email);
       

        await updateDoc(userRef, {
          tweets: arrayUnion(
            createTweet(userData.fullname, userData.username, data.content),
          ),
        });
      }
    } catch (error) {
      console.error('Error submitting tweet:', error);
    }
  };
  return (
    <View>
      <InputComponent
        secureTextEntry={false}
        name="content"
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
        onPress={handleSubmit(saveTweet)}
      />
    </View>
  );
}

export default TweetComponent;
