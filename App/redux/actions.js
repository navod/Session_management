import AsyncStorage from '@react-native-async-storage/async-storage';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const GET_USERS = 'GET_USERS';
export const REGISTER_USER = 'REGISTER_USER';

const loginUser = token => {
  return {type: LOGIN_USER, token: token};
};

const getAllUsers = users => {
  return {type: GET_USERS, users: users};
};

const logoutUser = () => {
  return {type: LOGOUT_USER};
};

const registerUser = userToken => {
  return {type: REGISTER_USER, token: userToken};
};

export const onLoginUser = (email, password, navigation, toggleCheckBox) => {
  return dispatch => {
    fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(e => {
        return e.json();
      })
      .then(e => {
        if (e.error) {
          alert(e.error);
        } else {
          if (toggleCheckBox) {
            AsyncStorage.setItem('userToken', e.token);
          }
          console.log(e.token);
          dispatch(loginUser(e.token));
          navigation.navigate('Dashboard');
        }
      })
      .catch(err => {
        alert('Invalid user name or password');
        console.log(err);
      });
  };
};

export const onLogoutUser = () => {
  return dispatch => {
    AsyncStorage.removeItem('userToken');
    dispatch(logoutUser());
  };
};

export const onGetUsers = () => {
  return dispatch => {
    fetch('https://reqres.in/api/users?page=2')
      .then(res => {
        return res.json();
      })
      .then(data => {
        dispatch(getAllUsers(data.data));
      })
      .catch(err => {
        if (err.name === 'AbortError') {
          console.log('fetch aborted');
        } else {
          console.log(err.message);
        }
      });
  };
};

export const onRegisterUser = () => {
  return dispatch => {
    let userToken = AsyncStorage.getItem('userToken');
    console.log(userToken);
    dispatch(registerUser(userToken));
  };
};
