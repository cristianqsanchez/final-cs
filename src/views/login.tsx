import React from 'react';
import InputComponent from '../components/InputComponent';
import ButtonComponent from '../components/ButtonComponent';
import {View, Text} from 'react-native';
import {useForm} from 'react-hook-form';
import {useNavigation} from '@react-navigation/native';

export default function Login() {
  const {control, handleSubmit, watch} = useForm();
  const navigation = useNavigation();
  const login = () => {
    navigation.navigate('home');
  };
  return (
    <View>
      <InputComponent
        name="username"
        placeholder="Username"
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
        rules={{
          required: 'Password is required',
          maxLength: {
            value: 30,
            message: 'Text should be maximum 30 characters long',
          },
        }}
      />
      <ButtonComponent
        backgroundColor="#0A4A5D"
        text="Sign In"
        onPress={login}
      />
    </View>
  );
}
