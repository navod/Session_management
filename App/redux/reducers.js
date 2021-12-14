import {login, logout} from './actions';

const initialState = {
  userToken: '',
  isLoading: true,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case login:
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };

    case logout:
      return {
        ...state,
        userToken: null,
        isLoading: false,
        userName: null,
      };

    case 'REGISTER':
      return {
        ...state,
        userToken: action.token,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default userReducer;
