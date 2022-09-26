import React from 'react';
import {render, screen} from '@testing-library/react-native';
import {Text, View} from 'react-native';

it('should be truthy', () => {
  expect(1 + 3).toBe(4);
});

test('Render Correctly', () => {
  render(
    <View>
      <Text>Hello App</Text>
    </View>,
  );
  const element = screen.queryByText('Hello App');
  expect(element?.props.children).toBe('Hello App');
});
