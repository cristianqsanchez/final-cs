import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import TweetComponent from '../components/TweetComponent';
import React from 'react';
import {View, Text} from 'react-native';
import {useForm} from 'react-hook-form';
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs} from 'firebase/firestore';

export default function Login() {
  return (
    <View>
     <TweetComponent/>
    </View>
  );
}
