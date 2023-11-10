import React from 'react';
import {View, StyleSheet, TextInput, Text} from 'react-native';
import {Controller} from 'react-hook-form';

const InputComponent = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              {borderColor: error ? 'red' : '#081D5D'},
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={{color: '#081D5D'}}
              placeholderTextColor="#081D5D" 
              secureTextEntry={secureTextEntry}
            />
          </View>
          {error && (
            <Text
              style={{
                color: 'red',
                alignSelf: 'flex-end',
                marginHorizontal: '7%',
              }}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: 'black',
    width: '97%',
    borderColor: '#0000',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  }
});

export default InputComponent;
