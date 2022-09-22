import React from 'react';
import {renderWithNavigatorAndRedux} from '../../helpers/renderWithNavigatorAndRedux';
import {fireEvent, screen, waitFor} from '@testing-library/react-native';
import asyncStorage from '../../src/service/async-storage/asyncStorage';
import {Alert} from 'react-native';
import Register from '../../src/screens/Register/Register';

const mockDispatch = jest.fn();
const mockNavigation = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    dispatch: mockDispatch,
    navigate: mockNavigation,
  }),
}));

const mockAddUser = jest.spyOn(asyncStorage, 'addUser');
const mockAlert = jest.spyOn(Alert, 'alert');

describe('Register Screen Test', () => {
  it('should render correctly', () => {
    const tree = renderWithNavigatorAndRedux(<Register />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should get inputValues', async () => {
    renderWithNavigatorAndRedux(<Register />);

    const userNameInput = screen.getByTestId('userName-input');
    const passwordInput = screen.getByTestId('password-input');
    await waitFor(() => {
      fireEvent.changeText(userNameInput, 'Test');
      fireEvent.changeText(passwordInput, 'test123');

      expect(userNameInput.props.value).toBe('Test');
      expect(passwordInput.props.value).toBe('test123');
    });
  });

  it('should run addUser', async () => {
    mockAddUser.mockReturnValue(Promise.resolve(true));
    renderWithNavigatorAndRedux(<Register />);

    const userNameInput = screen.getByTestId('userName-input');
    const passwordInput = screen.getByTestId('password-input');
    const registerButton = screen.getByTestId('register-btn');

    await waitFor(() => {
      fireEvent.changeText(userNameInput, 'Test');
      fireEvent.changeText(passwordInput, 'test123');

      expect(userNameInput.props.value).toBe('Test');
      expect(passwordInput.props.value).toBe('test123');

      fireEvent.press(registerButton);
      expect(mockAddUser).toHaveBeenCalled();
      expect(mockAddUser).toHaveBeenCalledWith({
        userName: 'Test',
        password: 'test123',
      });
    });

    expect(mockAlert).toHaveBeenCalled();
    expect(mockAlert).toHaveBeenCalledWith('Success');
  });

  it('should give Error Alert', async () => {
    mockAddUser.mockReturnValue(Promise.resolve(false));
    renderWithNavigatorAndRedux(<Register />);
    const registerButton = screen.getByTestId('register-btn');

    await waitFor(() => {
      fireEvent.press(registerButton);

      expect(mockAlert).toHaveBeenCalled();
      expect(mockAlert).toHaveBeenCalledWith('Error');
    });
  });

  it('should navigate to Login', async () => {
    renderWithNavigatorAndRedux(<Register />);
    const linkButton = screen.getByTestId('link-btn');

    await waitFor(() => {
      fireEvent.press(linkButton);

      expect(mockNavigation).toHaveBeenCalled();
      expect(mockNavigation).toHaveBeenCalledWith('LoginScreen');
    });
  });
});
