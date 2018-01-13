import axios from 'axios';

export const FETCH_USERS = 'fetch_users';
export const fetchUsers = () => async (dispatch) => {
  // retrieve users data from API asynchronously
  const res = await axios.get('http://jsonplaceholder.typicode.com/users');

  // dispatch an action using redux-thunk
  dispatch({
    type: FETCH_USERS,
    payload: res
  })
};