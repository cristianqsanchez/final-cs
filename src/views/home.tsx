import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import TweetComponent from '../components/TweetComponent';
import React from 'react';
import {View, Text} from 'react-native';
import {useForm} from 'react-hook-form';
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs, doc} from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import {db} from '../config/firebase';

export default function Home() {
  const getTweets = async () =>{
    const userCollection = collection(db, 'users');
    const userSnapshot = await getDocs(userCollection);
    const userList = userSnapshot.docs.map(doc => doc.data());
    console.log(userList);
  }
  return (
    <SafeAreaView>
      <View>
        <TweetComponent/>
        <ButtonComponent
        backgroundColor="#0A4A5D"
        text="getUser"
        onPress={getTweets}
      />
      </View>
    </SafeAreaView>
  );
}
