export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch, getState, axiosInstance) => {
  // retrieve users data from API asynchronously
  const res = await axiosInstance.get('/users');

  // dispatch an action using redux-thunk
  dispatch({
    type: FETCH_USERS,
    payload: res
  })
};

export const FETCH_CURRENT_USER = 'fetch_current_user';
export const fetchCurrentUser = () => async (dispatch, getState, axiosInstance) => {
  const res = await axiosInstance.get('/current_user');

  dispatch({
    type: FETCH_CURRENT_USER,
    payload: res
  })
};

export const FETCH_ADMINS = 'fetch_users';
export const fetchAdmins = () => async (dispatch, getState, axiosInstance) => {
  // retrieve users data from API asynchronously
  const res = await axiosInstance.get('/admins');

  // dispatch an action using redux-thunk
  dispatch({
    type: FETCH_USERS,
    payload: res
  })
};