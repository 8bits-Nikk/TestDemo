import React from 'react';
import Splash from '../../src/screens/Splash/Splash';
import {renderWithNavigatorAndRedux} from '../../helpers/renderWithNavigatorAndRedux';
import {act, cleanup, screen} from '@testing-library/react-native';

const mockDispatch = jest.fn().mockImplementation(args => args);
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    dispatch: mockDispatch,
    goBack: jest.fn(),
    navigate: jest.fn(),
  }),
}));

describe('<Splash/> test', () => {
  afterEach(() => {
    cleanup();
  });

  test('Render Correctly', () => {
    const tree = renderWithNavigatorAndRedux(<Splash />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('render Image View', () => {
    renderWithNavigatorAndRedux(<Splash />);
    const imgView = screen.queryByTestId('logo-img');
    expect(imgView?.type).toBe('Image');
    expect(imgView?.props.source).not.toBe(null);
  });

  test('navigation', () => {
    jest.useFakeTimers();
    renderWithNavigatorAndRedux(<Splash />);
    act(() => {
      jest.runAllTimers();
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: {name: 'HomeScreen', params: undefined},
      type: 'REPLACE',
    });
  });
});
