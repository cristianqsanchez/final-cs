import TweetComponent from '../components/TweetComponent';
import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useRoute} from '@react-navigation/native';
import globalStyles from '../styles/styles';
export default function Home() {
  const route = useRoute();
  const id = route.params?.id;
  return (
    <View style={globalStyles.container}>
      <TweetComponent id={id} />
    </View>
  );
}
