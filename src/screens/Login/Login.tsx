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
import {StackActions, useNavigation} from '@react-navigation/native';
import asyncStorage from '../../service/async-storage/asyncStorage';

const Login = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = () => {
    const user = {
      userName,
      password,
    };
    asyncStorage.validateUser(user).then(res => {
      if (res) {
        asyncStorage.setLoginStatus(user).then(r => {
          if (r) {
            navigation.dispatch(StackActions.replace('HomeScreen'));
          } else {
            Alert.alert('Fail', 'Storage Error');
          }
        });
      } else {
        Alert.alert('Fail', 'Username or Password is incorrect');
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
        value={userName}
      />
      <TextInput
        testID={'password-input'}
        onChangeText={text => setPassword(text)}
        style={style.textInput}
        placeholder={'Password'}
        value={password}
      />
      <Button title={'LOGIN'} onPress={onLogin} testID={'login-btn'} />
      <TouchableOpacity
        style={style.link}
        testID={'link-btn'}
        onPress={() => navigation.navigate('RegisterScreen')}>
        <Text>Go to Register</Text>
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

export default Login;
