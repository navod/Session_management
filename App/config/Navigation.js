import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import colors from '../constants/colors';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/LoginPage';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';

const StackNavigator = createStackNavigator();

const LoginStackNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
    </StackNavigator.Navigator>
  );
};

const DashboardStackNavigator = () => {
  return (
    <StackNavigator.Navigator>
      <StackNavigator.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
    </StackNavigator.Navigator>
  );
};

const ModalStack = createStackNavigator();

const LoginNavigator = () => (
  <ModalStack.Navigator>
    <ModalStack.Screen
      name="LoginStackNavigator"
      component={LoginStackNavigator}
      options={{headerShown: false}}
    />

    <ModalStack.Screen
      name="Dashboard"
      component={Dashboard}
      options={{headerShown: false}}
    />
  </ModalStack.Navigator>
);

const DashboardNavigator = () => (
  <ModalStack.Navigator>
    <ModalStack.Screen
      name="DashboardStackNavigator"
      component={DashboardStackNavigator}
      options={{headerShown: false}}
    />

    <ModalStack.Screen
      name="Login"
      component={Login}
      options={{headerShown: false}}
    />
  </ModalStack.Navigator>
);

export default function Navigation() {
  const {isLoading} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const [userToken, setUserToken] = useState(null);
  useEffect(() => {
    setTimeout(async () => {
      try {
        let user = await AsyncStorage.getItem('userToken');
        setUserToken(user);
      } catch (e) {
        console.log(e);
      }
      dispatch({type: 'REGISTER', token: userToken});
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }
  return (
    <NavigationContainer>
      {userToken !== null ? <DashboardNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  );
}
