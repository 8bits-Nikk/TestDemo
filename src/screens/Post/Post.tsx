import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {imgBack} from '../../assets/assets';

const temp = [
  {
    id: 1386,
    user_id: 2874,
    title: 'Ago tripudio quos praesentium ut ut.',
    body: 'Abbas tabella crustulum. Velit voluptatem cogito. Centum ago quia. Enim suggero carmen. Coaegresco cibus cometes. Provident sordeo cohaero. Nobis corpus cunctatio. Praesentium varietas auditor. Solus decipio libero. Clamo acies adulescens. Thesis concido stillicidium. Vulgo amicitia suscipio. Vir absens compono. Sol talio terra. Sollicito culpo abduco. Consuasor carmen tenax. Defleo dedico tum. Terga expedita spectaculum. Calco certus aequus.',
  },
];

const Post = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={style.body}>
      <View style={style.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={imgBack} style={{height: 24, width: 24}} />
        </TouchableOpacity>
        <Text style={style.headerTxt}>Posts</Text>
      </View>
      <View style={style.container}>
        <FlatList
          data={temp}
          ListEmptyComponent={() => (
            <View>
              <Text style={style.headerTxt}>No Items</Text>
            </View>
          )}
          renderItem={({item}) => (
            <View style={style.itemContainer}>
              <Text style={style.text}>{item.title}</Text>
              <Text numberOfLines={8}>{item.body} </Text>
            </View>
          )}
        />
      </View>
      <TouchableOpacity style={style.flotBtn}>
        <Text style={{fontSize: 26, fontWeight: 'bold'}}>+</Text>
      </TouchableOpacity>
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
    flex: 1,
    margin: 16,
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flex: 1,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  flotBtn: {
    height: 64,
    width: 64,
    position: 'absolute',
    bottom: 32,
    right: 32,
    padding: 16,
    borderRadius: 64,
    backgroundColor: '#22bbbb',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Post;
