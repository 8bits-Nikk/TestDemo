import {StackActions, useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {imgChat} from '../../assets/assets';
import asyncStorage from '../../service/async-storage/asyncStorage';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    asyncStorage.getLoginStatus().then(response => {
      if (response === null) {
        setTimeout(() => {
          navigation.dispatch(StackActions.replace('LoginScreen'));
        }, 1500);
      } else {
        setTimeout(() => {
          navigation.dispatch(StackActions.replace('HomeScreen'));
        }, 1500);
      }
    });
  }, [navigation]);

  return (
    <View style={styles.body}>
      <Image
        source={imgChat}
        style={styles.img}
        resizeMode={'contain'}
        testID={'logo-img'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  img: {
    width: 128,
    height: 128,
  },
});

export default Splash;
