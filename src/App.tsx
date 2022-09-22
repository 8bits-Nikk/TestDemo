import React from 'react';
import {Provider} from 'react-redux';
import rootReducer from './App.reducers';
import MainNavigator from './routes/MainNavigator';
import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import root from './App.sagas';

const App = () => {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(root);

  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
