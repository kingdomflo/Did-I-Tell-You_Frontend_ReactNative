export const logout = () => (
  {
    type: 'LOGOUT',
  }
);

export const login = (token) => (
  {
    type: 'LOGIN',
    payload: token
  }
);