import {GET_USERS, LOGIN_USER, LOGOUT_USER, REGISTER_USER} from './actions';

const initialState = {
  userToken: null,
  isLoading: true,
  users: null,
};

const loginUser = (state, action) => {
  return {
    ...state,
    userToken: action.token,
    isLoading: false,
  };
};

const logoutUser = (state, action) => {
  return {
    ...state,
    userToken: null,
    isLoading: false,
  };
};

const getUsers = (state, action) => {
  return {
    ...state,
    users: action.users,
  };
};
const registerUser = (state, action) => {
  return {
    ...state,
    userToken: action.token,
    isLoading: false,
  };
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return loginUser(state, action);
    case LOGOUT_USER:
      return logoutUser(state, action);
    case GET_USERS:
      return getUsers(state, action);
    case REGISTER_USER:
      return registerUser(state, action);
    default:
      return state;
  }
}

export default userReducer;
