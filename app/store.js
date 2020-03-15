import { combineReducers } from 'redux';

const INITIAL_STATE = {
  auth: {
    connected: false
  }
};

const storeReducer = (state = INITIAL_STATE, action) => {
  const {
    auth
  } = state;
  let newState;
  switch (action.type) {
    case 'LOGOUT':
      console.log('logout', action);
      newState = { auth: { connected: false } };
      return newState;
    case 'LOGIN':
      console.log('login', action);
      newState = { auth: action.payload }
      return newState;
    default:
      return state
  }
};

export default combineReducers({
  store: storeReducer,
});