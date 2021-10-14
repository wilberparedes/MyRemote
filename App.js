import React, { useEffect } from 'react';
import {
  // useColorScheme,
} from 'react-native';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';

import SplashScreen from 'react-native-splash-screen'
import { I18nextProvider } from "react-i18next";
import { configureFontAwesomePro } from "react-native-fontawesome-pro";
import {
  DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';

import { i18n } from "./src/config/i18n";
import App1 from './src/screens/containers/App1';
import AppStack from './src/routes';
import { COLORS } from './src/settings/theme';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.PRIMARY,
    accent: COLORS.PRIMARY,
  },
};



const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    configureFontAwesomePro();
    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, [])

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <PaperProvider theme={theme}>
            <AppStack />
          </PaperProvider>
        </I18nextProvider>
      </PersistGate>
    </Provider>
    
  );
};

export default App;
