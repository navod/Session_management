import AsyncStorage from '@react-native-async-storage/async-storage';

export const login = 'login';
export const logout = 'logout';

export const loginUser = userToken => async dispatch => {
  if (userToken != null) {
    try {
      await AsyncStorage.setItem('userToken', userToken);
    } catch (e) {
      console.log(e);
    }
  }
  dispatch({
    type: login,
    token: userToken,
  });
};

export const logoutUser = userToken => async dispatch => {
  try {
    await AsyncStorage.removeItem('userToken');
  } catch (e) {
    console.log(e);
  }

  dispatch({
    type: login,
  });
};
