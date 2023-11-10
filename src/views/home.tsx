import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import TweetComponent from '../components/TweetComponent';
import React from 'react';
import {View, Text} from 'react-native';
import {useForm} from 'react-hook-form';
import {initializeApp} from 'firebase/app';
import {getFirestore, collection, getDocs, doc} from 'firebase/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import {db} from '../config/firebase';
import {useRoute} from '@react-navigation/native';
export default function Home() {
  const route = useRoute();
  const id = route.params?.id;
  const getTweets = async () => {
    // const userCollection = collection(db, 'users');
    // const userSnapshot = await getDocs(userCollection);
    // const userList = userSnapshot.docs.map(doc => doc.data());
    console.log(id);
  };
  return (
    <SafeAreaView>
      <View>
        <TweetComponent id={id} />
      </View>
    </SafeAreaView>
  );
}
