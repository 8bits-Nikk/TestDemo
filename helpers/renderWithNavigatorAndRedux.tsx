import React from 'react';
import 'react-native';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, createStore, Store} from 'redux';
import rootReducer from '../src/App.reducers';
import root from '../src/App.sagas';
import {render} from '@testing-library/react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';

export function renderWithNavigatorAndRedux(
  renderComponent: any,
  reduxEvent?: (store: Store) => void,
) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(root);

  if (reduxEvent) {
    reduxEvent(store);
  }

  return render(
    <NavigationContainer>
      <Provider store={store}>{renderComponent}</Provider>
    </NavigationContainer>,
  );
}
