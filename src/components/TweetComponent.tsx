import React, {useCallback, useEffect, useState} from 'react';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import {db} from '../config/firebase';
function createTweet(author, username, content) {
  return {
    author: author,
    username: username,
    content: content,
    date: Date.now(),
  };
}
function TweetComponent({ id }) {
  const [latestTimestamp, setLatestTimestamp] = useState(0);
  const navigation = useNavigation();
  const {control, handleSubmit, reset} = useForm();
  const [allTweets, setAllTweets] = useState([]);
  
  const saveTweet = async data => {
    try {
      const userRef = doc(db, 'users', id);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const newTweet = createTweet(
          userData.fullname,
          userData.username,
          data.content,
        );
        await updateDoc(userRef, {
          tweets: arrayUnion(newTweet),
        });
        setLatestTimestamp(newTweet.date);
        reset();
      }
    } catch (error) {
      console.error('Error submitting tweet:', error);
    }
  };

  useEffect(() => {
    const fetchAllTweets = async () => {
      try {
        const userRef = doc(db, 'users', id);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const userFollowing = userData.following || [];

          const tweets = [];
          if (userData.tweets) {
            tweets.push(...userData.tweets);
          }
          for (const followingUserId of userFollowing) {
            const followingUserRef = doc(db, 'users', followingUserId);
            const followingUserDoc = await getDoc(followingUserRef);

            if (followingUserDoc.exists()) {
              const followingUserData = followingUserDoc.data();

              if (followingUserData.tweets) {
                tweets.push(...followingUserData.tweets);
              }
            }
          }

          tweets.sort((a, b) => b.date - a.date);
          setAllTweets(tweets);
        }
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchAllTweets();
  }, [latestTimestamp]);
  const signOut = () => {
    navigation.navigate('login');
  };
  const renderTweet = ({item}) => (
    <View style={styles.tweetContainer} key={item.date}>
      <View style={styles.headerContainer}>
        <Text style={styles.authorText}>{item.author}</Text>
        <Text style={styles.usernameText}>@{item.username}</Text>
      </View>
      <Text style={styles.dateText}>{item.date}</Text>
      <Text style={styles.contentText}>{item.content}</Text>
    </View>
  );
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <InputComponent
            secureTextEntry={false}
            name="content"
            placeholder="Write something..."
            control={control}
            rules={{
              maxLength: {
                value: 280,
                message: 'Text should be maximum 280 characters long',
              },
            }}
          />
          <ButtonComponent
            backgroundColor="black"
            text="POST"
            onPress={handleSubmit(saveTweet)}
            color={'#081D5D'}
          />
          <FlatList
            data={allTweets}
            renderItem={renderTweet}
            keyExtractor={item => item.date.toString()}
          />
          <ButtonComponent
            backgroundColor="black"
            text="SIGN OUT"
            onPress={handleSubmit(signOut)}
            color={'red'}
          />
        </View>
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
});

export default TweetComponent;
