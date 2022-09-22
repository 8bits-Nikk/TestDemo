import React from 'react';
import {
  cleanup,
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';
import CardView from '../../src/components/CardView';

describe('CardView Tests', () => {
  const item = {
    id: 1,
    email: 'test@mail.com',
    gender: 'male',
    status: 'active',
    name: 'Test',
  };

  const onPress = jest.fn();

  afterEach(() => {
    cleanup();
  });

  it('Should render correctly', () => {
    const tree = render(<CardView item={item} onPress={onPress} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('Should render correct name and status', () => {
    render(<CardView item={item} onPress={onPress} />);
    const nameText = screen.queryByTestId('card-name');
    const statusText = screen.queryByTestId('card-status');

    expect(nameText?.props.children).toBe(item.name);
    expect(statusText?.props.children).toBe(item.status);
  });

  it('Should render correct color', () => {
    render(<CardView item={item} onPress={onPress} />);
    const dot = screen.queryByTestId('status-dot');
    const dotColor = dot?.props.style[1].backgroundColor;
    // active => '#00ff00' inactive => '#ff0000'
    expect(dotColor).toBe('#00ff00');
  });

  it('Should run onClick Fun', () => {
    render(<CardView item={item} onPress={onPress} />);
    fireEvent.press(screen.getByTestId('card-view'));
    expect(onPress).toBeCalledTimes(1);
  });
});
