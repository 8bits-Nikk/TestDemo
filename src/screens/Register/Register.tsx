import React, {useState} from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import asyncStorage from '../../service/async-storage/asyncStorage';

const Register = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onRegister = () => {
    const user = {
      userName,
      password,
    };
    asyncStorage.addUser(user).then(r => {
      if (r) {
        Alert.alert('Success');
      } else {
        Alert.alert('Error');
      }
    });
  };

  return (
    <SafeAreaView style={style.body}>
      <TextInput
        testID={'userName-input'}
        onChangeText={text => setUserName(text)}
        style={style.textInput}
        placeholder={'UserName'}
      />
      <TextInput
        testID={'password-input'}
        onChangeText={text => setPassword(text)}
        style={style.textInput}
        placeholder={'Password'}
      />
      <Button title={'REGISTER'} onPress={onRegister} testID={'register-btn'} />
      <TouchableOpacity
        style={style.link}
        testID={'link-btn'}
        onPress={() => navigation.navigate('LoginScreen')}>
        <Text>Go to Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    fontSize: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#333',
    padding: 16,
    width: '90%',
    marginBottom: 16,
  },
  link: {
    margin: 16,
  },
});

export default Register;
