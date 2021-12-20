import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';
import colors from '../constants/colors';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/LoginPage';
import {connect} from 'react-redux';
import {onRegisterUser} from '../redux/actions';

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

const Navigation = props => {
  const {isLoading, userToken} = props;
  console.log(props);

  useEffect(() => {
    props.tryToLogin();
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
};
const mapStateToProps = state => {
  return {
    isLoading: state.userReducer.isLoading,
    userToken: state.userReducer.userToken,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    tryToLogin: () => dispatch(onRegisterUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
