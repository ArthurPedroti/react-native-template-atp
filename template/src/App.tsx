import 'react-native-gesture-handler';

import React from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from 'styled-components';
// import light from './styles/themes/light';
import dark from './styles/themes/dark';

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      {/* tem que passar o thema inteiro e não um texto */}
      <ThemeProvider theme={dark}>
        <StatusBar barStyle="light-content" backgroundColor="#312e38" />
        <AppProvider>
          <View style={{ flex: 1, backgroundColor: '#312e38' }}>
            <Routes />
          </View>
        </AppProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
