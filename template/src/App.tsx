import 'react-native-gesture-handler';

import React, { useState, useCallback} from 'react';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { ThemeProvider } from 'styled-components'
import light from './styles/themes/light'
import dark from './styles/themes/dark'

import AppProvider from './hooks';

import Routes from './routes';

const App: React.FC = () => {
  const [theme, setTheme] = useState(dark)

  const toggleTheme = useCallback(
    () => {
      setTheme(theme.title === 'dark' ? light : dark)
    },
    [],
  )

 return (
  <NavigationContainer>
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#312e38' }}>
          <Routes />
        </View>
      </AppProvider>
    </ThemeProvider>
  </NavigationContainer>
)}

export default App;
