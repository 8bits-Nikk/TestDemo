import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {UsersActions, UsersSelectors} from '../../service/users';
import CardView from '../../components/CardView';
import {DateFormats, formatDate} from '../../service/date/formatDate';
import {imgBack} from '../../assets/assets';
import asyncStorage from '../../service/async-storage/asyncStorage';

const Home = () => {
  const navigation = useNavigation();
  const users = useSelector(UsersSelectors.getUsers, shallowEqual);
  const [currentUser, setCurrentUser] = useState({userName: '', password: ''});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(UsersActions.getUsers(1));
    asyncStorage.getLoginStatus().then(user => {
      setCurrentUser(user);
    });
  }, []);

  const onLogout = () => {
    asyncStorage.resetLoginStatus().then(res => {
      if (res) {
        navigation.reset({routes: [{name: 'LoginScreen'}]});
      } else {
        Alert.alert('Error', 'Something went wrong');
      }
    });
  };

  return (
    <SafeAreaView style={style.body}>
      <View style={style.header}>
        <TouchableOpacity onPress={onLogout}>
          <Image source={imgBack} style={{height: 24, width: 24}} />
        </TouchableOpacity>
        <Text style={style.headerTxt}>Users</Text>
      </View>
      <View>
        <Text testID={'welcome-name'}>Welcome {currentUser.userName}</Text>
        <Text>
          Today's Date: {formatDate(new Date(), DateFormats.DateOnly)}
        </Text>
      </View>
      <View style={style.container}>
        <FlatList
          testID={'flatList-user'}
          data={users}
          ListEmptyComponent={() => (
            <View>
              <Text style={style.headerTxt}>No Items</Text>
            </View>
          )}
          renderItem={({item}) => (
            <CardView
              item={item}
              onPress={() => navigation.navigate('PostScreen')}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#eee',
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#aabbdd',
    padding: 16,
    alignItems: 'center',
  },
  headerTxt: {
    marginStart: 16,
    alignItems: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    margin: 16,
  },
});

export default Home;
