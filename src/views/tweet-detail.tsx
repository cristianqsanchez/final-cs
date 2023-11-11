import React, {useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import globalStyles from '../styles/styles';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import {db} from '../config/firebase';

export default function TweetDetail(metadata = {}) {
  const [tweetResponse, setTweetResponse] = useState('');
  const data = metadata.route.params.metadata;
  const userID = metadata.route.params.id;
  const [responsesOfTweet, setResponsesOfTweet] = useState(data?.responses);

  const newResponse = async ({username, date}) => {
    const findUser = query(
      collection(db, 'users'),
      where('username', '==', username),
    );
    const snapshot = await getDocs(findUser);
    const user = snapshot.docs[0].data();

    const userRef = doc(db, 'users', snapshot.docs[0].id);

    const tweetToResponse = user.tweets.find(tweet => tweet.date === date);
    console.log(tweetToResponse);
    tweetToResponse.responses = responsesOfTweet;
    await updateDoc(userRef, {
      ...user,
      tweets: [...user.tweets, tweetResponse],
    });
  };

  const handleClick = () => {
    setResponsesOfTweet([
      ...responsesOfTweet,
      {
        author: data.author,
        username: data.username,
        content: tweetResponse,
        date: Date.now(),
      },
    ]);
    newResponse({username: data.username, date: data.date});
  };
  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <View>
          <Text>{data.date}</Text>
          <Text>{data.author}</Text>
          <Text>@ {data.username}</Text>
        </View>
        {responsesOfTweet?.map(response => (
          <View style={styles.tweetContainer} key={response.date}>
            <View style={styles.headerContainer}>
              <Text style={styles.authorText}>{response.author}</Text>
              <Text style={styles.usernameText}>@{response.username}</Text>
            </View>
            <Text style={styles.dateText}>{response.date}</Text>
            <Text style={styles.contentText}>{response.content}</Text>
          </View>
        ))}
        <TextInput value={tweetResponse} onChangeText={setTweetResponse} />
        <Button title="click me" onPress={handleClick} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tweetContainer: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  authorText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  usernameText: {
    color: 'white',
    marginBottom: 5,
  },
  dateText: {
    color: '#8B8B8B',
    fontSize: 12,
    marginBottom: 5,
  },
  contentText: {
    color: 'white',
    fontSize: 14,
  },
  responses: {
    color: 'white',
    fontSize: 12,
  },
});
