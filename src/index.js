import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'react-router-redux'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import { unregister } from './registerServiceWorker'
import { createBrowserHistory } from 'history'
import configureStore from './store'
import { PersistGate } from 'redux-persist/es/integration/react'

export const history = createBrowserHistory()
const {store, persistor} = configureStore(history)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>, 
  document.getElementById('root'));
unregister();
