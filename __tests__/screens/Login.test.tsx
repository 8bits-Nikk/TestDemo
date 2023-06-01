import React from 'react';
import { renderWithNavigatorAndRedux } from '../../helpers/renderWithNavigatorAndRedux';
import Login from '../../src/screens/Login/Login';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import asyncStorage from '../../src/service/async-storage/asyncStorage';
import { Alert } from 'react-native';

const mockDispatch = jest.fn();
const mockNavigation = jest.fn();
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    dispatch: mockDispatch,
    navigate: mockNavigation,
  }),
}));

const mockValidate = jest.spyOn(asyncStorage, 'validateUser');
const mockSetStatus = jest.spyOn(asyncStorage, 'setLoginStatus');
const mockAlert = jest.spyOn(Alert, 'alert');

describe('Login Screen Test', () => {
  it('should render correctly', () => {
    const tree = renderWithNavigatorAndRedux(<Login />);
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('should get inputValues', async () => {
    renderWithNavigatorAndRedux(<Login />);

    const userNameInput = screen.getByTestId('userName-input');
    const passwordInput = screen.getByTestId('password-input');
    fireEvent.changeText(userNameInput, 'Test');
    fireEvent.changeText(passwordInput, 'test123');
    await waitFor(() => {
      expect(userNameInput.props.value).toBe('Test');
      expect(passwordInput.props.value).toBe('test123');
    });
  });

  it('should run validateUser and Navigate to Home', async () => {
    mockValidate.mockReturnValue(Promise.resolve(true));
    mockSetStatus.mockReturnValue(Promise.resolve(true));
    renderWithNavigatorAndRedux(<Login />);

    const userNameInput = screen.getByTestId('userName-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByTestId('login-btn');

    fireEvent.changeText(userNameInput, 'Test');
    fireEvent.changeText(passwordInput, 'test123');

    expect(userNameInput.props.value).toBe('Test');
    expect(passwordInput.props.value).toBe('test123');

    fireEvent.press(loginButton);

    expect(mockDispatch).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: { name: 'HomeScreen', params: undefined },
      type: 'REPLACE',
    });
  });

  it('should give Error Alert', async () => {
    mockValidate.mockReturnValue(Promise.resolve(false));
    renderWithNavigatorAndRedux(<Login />);
    const loginButton = screen.getByTestId('login-btn');

    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalled();
      expect(mockAlert).toHaveBeenCalledWith(
        'Fail',
        'Username or Password is incorrect',
      );
    });
  });

  it('should give storage Error', async () => {
    mockValidate.mockReturnValue(Promise.resolve(true));
    mockSetStatus.mockReturnValue(Promise.resolve(false));
    renderWithNavigatorAndRedux(<Login />);

    const loginButton = screen.getByTestId('login-btn');

    fireEvent.press(loginButton);
    await waitFor(() => {
      expect(mockAlert).toHaveBeenCalled();
      expect(mockAlert).toHaveBeenCalledWith('Fail', 'Storage Error');
    });
  });

  it('should navigate to Register', async () => {
    renderWithNavigatorAndRedux(<Login />);
    const linkButton = screen.getByTestId('link-btn');

    fireEvent.press(linkButton);
    await waitFor(() => {
      expect(mockNavigation).toHaveBeenCalled();
      expect(mockNavigation).toHaveBeenCalledWith('RegisterScreen');
    });
  });
});
