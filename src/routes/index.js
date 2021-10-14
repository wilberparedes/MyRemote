import * as React from 'react';
import {Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {
  App1,
  Login,
  HomeTabs,
  User,
  Settings,
  Language,
  FormatDate,
  FormatTime,
  FomatNumber,
  FormatLength,
  FormatTemperature,
  FormatTimeZone,
  ServerUrl,
  ChangePassword,
  TechnicalSupport,
  About,
  Device,
  Notifications,
  Turn,
  DetailsTurn,
  DetailTimelog,
  InConstruction,
  DetailsPermission,
  ManagePermission,
  Times,
  TypePerson,
  DetailsTime,
  DetailsGeolocationTime,
  DetailsCountry,
  InitialEnroll,
  Files,
} from '../screens';

import {
  LoadingComponent,
  Camera,
  CameraFaceDetected,
} from '../screens/components';

const stackApp = createStackNavigator();
const MenuStackApp = () => (
  <stackApp.Navigator initialRouteName="HomeTabs" headerMode="none">
    <stackApp.Screen name="HomeTabs" component={HomeTabs} />
    <stackApp.Screen name="App1" component={App1} />
    <stackApp.Screen name="InConstruction" component={InConstruction} />
    <stackApp.Screen name="Notifications" component={Notifications} />
    <stackApp.Screen name="User" component={User} />
    <stackApp.Screen name="Camera" component={Camera} />
    <stackApp.Screen name="CameraFaceDetected" component={CameraFaceDetected} />
    <stackApp.Screen name="ChangePassword" component={ChangePassword} />
    <stackApp.Screen name="TechnicalSupport" component={TechnicalSupport} />
    <stackApp.Screen name="About" component={About} />
    <stackApp.Screen name="DetailsCountry" component={DetailsCountry} />
    <stackApp.Screen name="Device" component={Device} />
    <stackApp.Screen name="Turn" component={Turn} />
    <stackApp.Screen name="DetailsTurn" component={DetailsTurn} />
    <stackApp.Screen name="DetailTimelog" component={DetailTimelog} />
    <stackApp.Screen name="DetailsPermission" component={DetailsPermission} />
    <stackApp.Screen name="Files" component={Files} />
    <stackApp.Screen name="ManagePermission" component={ManagePermission} />
    <stackApp.Screen name="Times" component={Times} />
    <stackApp.Screen name="DetailsTime" component={DetailsTime} />
    <stackApp.Screen
      name="DetailsGeolocationTime"
      component={DetailsGeolocationTime}
    />
    <stackApp.Screen name="TypePerson" component={TypePerson} />
    <stackApp.Screen name="InitialEnroll" component={InitialEnroll} />
    <stackApp.Screen name="Settings" component={Settings} />
  </stackApp.Navigator>
);

const Stack = createStackNavigator();
const PERSISTENCE_KEY = 'NAVIGATION_STATE';
const AppStack = ({Token}) => {
  const [isReady, setIsReady] = React.useState(false);
  const [initialState, setInitialState] = React.useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (initialUrl == null) {
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;
          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };
    if (!isReady) {
      restoreState();
      return <LoadingComponent />;
    }
  }, [isReady, Token]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={state =>
        AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))
      }>
      <Stack.Navigator headerMode="none">
        {Token ? (
          <>
            <Stack.Screen name="App" component={MenuStackApp} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
          </>
        )}
        <stackApp.Screen name="Language" component={Language} />
        <stackApp.Screen name="FormatDate" component={FormatDate} />
        <stackApp.Screen name="FormatTime" component={FormatTime} />
        <stackApp.Screen name="FomatNumber" component={FomatNumber} />
        <stackApp.Screen name="FormatLength" component={FormatLength} />
        <stackApp.Screen
          name="FormatTemperature"
          component={FormatTemperature}
        />
        <stackApp.Screen name="FormatTimeZone" component={FormatTimeZone} />
        <stackApp.Screen name="ServerUrl" component={ServerUrl} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = ({auth}) => {
  return {
    Token: auth.token,
  };
};

export default connect(mapStateToProps, null)(AppStack);
