/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {Provider} from 'react-redux';

import {store, persistor} from './source/store/store';
import {PersistGate} from 'redux-persist/integration/react';
import {StripeProvider} from '@stripe/stripe-react-native';

const ApnaFood = () => {
  return (
    <StripeProvider publishableKey="pk_test_51NBYdsSDNpU8To2ojr3jlhUauiLP8YblTG1zkk7a8Jt7SHr318VllJtSJyKyRbH2bplOYIJea1A6Ewv0X7Kw5fyK00Y3N7m9tB">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
};

AppRegistry.registerComponent(appName, () => ApnaFood);
