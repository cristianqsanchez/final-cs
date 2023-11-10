import React, {useState} from 'react';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import {View, Text, StyleSheet} from 'react-native';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';
import {collection, getDocs, where, query} from 'firebase/firestore';
import {db} from '../config/firebase';

export default function Login() {
  const {control, handleSubmit} = useForm();
  const navigation = useNavigation();
  const [text, setText] = useState('');

  const login = async (data: {username: unknown; password: any}) => {
    const userQuery = query(
      collection(db, 'users'),
      where('username', '==', data.username),
    );
    const userSnapshot = await getDocs(userQuery);
    if (userSnapshot.empty) {
      // user does not found
      setText('Login failed. Invalid username or password.');
    } else {
      // User found, check password
      const user = userSnapshot.docs[0].data();
      if (user.password === data.password) {
        console.log(userSnapshot.docs[0].id);
        navigation.navigate('home', { id: userSnapshot.docs[0].id });
      } else {
        setText('Login failed. Invalid username or password.');
      }
    }
  };

  return (
    <View>
      <InputComponent
        name="username"
        placeholder="Username"
        secureTextEntry={false}
        control={control}
        rules={{
          required: 'Username is required',
          maxLength: {
            value: 30,
            message: 'Text should be maximum 30 characters long',
          },
        }}
      />
      <InputComponent
        name="password"
        placeholder="Password"
        control={control}
        secureTextEntry={true}
        rules={{
          required: 'Password is required',
          maxLength: {
            value: 30,
            message: 'Text should be maximum 30 characters long',
          },
        }}
      />
      <Text style={styles.errorText}>{text}</Text>
      <ButtonComponent
        backgroundColor="#0A4A5D"
        text="Sign In"
        onPress={handleSubmit(login)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});