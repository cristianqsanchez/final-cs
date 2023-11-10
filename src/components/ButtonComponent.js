import React from 'react';
import {StyleSheet, Text, Pressable} from 'react-native';

const ButtonComponent = ({onPress, text, backgroundColor}) => {
  return (
    <Pressable onPress={onPress} style={[styles.container, {backgroundColor}]}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#B9C0D5',
    width: '97%',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ButtonComponent;
