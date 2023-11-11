import React, {useCallback, useEffect, useState} from 'react';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {useForm} from 'react-hook-form';
// import {getTimeAgo} from '../utils/relative-time';
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
  const timestamp = Timestamp.now();
  const date = timestamp.toDate();

  const options = {timeZone: 'America/Bogota'};
  const formattedDate = date.toLocaleString('es-ES', options);

  return {
    author: author,
    username: username,
    content: content,
    date: {
      milliseconds: date.getTime(),
      formatted: date.toLocaleString('es-ES', {timeZone: 'America/Bogota'}), 
    },
  };
}
function TweetComponent({id}) {
  const {control, handleSubmit} = useForm();
  const [allTweets, setAllTweets] = useState([]);
  const saveTweet = async data => {
    try {
      const userRef = doc(db, 'users', id);
      const userDoc = await getDoc(userRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
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

  useEffect(() => {
    const fetchAllTweets = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const tweets = [];

        querySnapshot.forEach(doc => {
          const userData = doc.data();
          if (userData.tweets) {
            tweets.push(...userData.tweets);
          }
        });
        tweets.sort((a, b) => b.date.milliseconds - a.date.milliseconds);
        setAllTweets(tweets);
      } catch (error) {
        console.error('Error fetching tweets:', error);
      }
    };

    fetchAllTweets();
  }, []);

  const renderTweet = ({item}) => (
    <View style={styles.tweetContainer} key={item.date}>
      <View style={styles.headerContainer}>
        <Text style={styles.authorText}>{item.author}</Text>
        <Text style={styles.usernameText}>@{item.username}</Text>
      </View>
      <Text style={styles.dateText}>{item.date.formatted}</Text>
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
              required: 'Text is required',
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
