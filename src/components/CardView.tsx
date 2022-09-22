import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IUsers} from '../service/users/users';

type props = {
  item: IUsers;
  onPress: () => void;
};
const CardView: React.FC<props> = ({item, onPress}) => {
  return (
    <TouchableOpacity
      testID={'card-view'}
      style={style.itemContainer}
      onPress={onPress}>
      <Text style={style.text} numberOfLines={1} testID={'card-name'}>
        {item.name}
      </Text>
      <View style={style.subContainer}>
        <View
          testID={'status-dot'}
          style={[
            style.dot,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              backgroundColor: item.status === 'active' ? '#00ff00' : '#ff0000',
            },
          ]}
        />
        <Text testID={'card-status'}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    flex: 0.8,
  },
  dot: {
    backgroundColor: '#ff0000',
    padding: 6,
    borderRadius: 8,
    marginEnd: 8,
  },
  subContainer: {flexDirection: 'row', alignItems: 'center', flex: 0.2},
});

export default CardView;
