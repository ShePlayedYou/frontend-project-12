import axios from 'axios';
import routes from '../routes.js';


export const handleLogin = async (value, t) => {
  try {
    const response = await axios.post(routes.loginPath(), {
        username: value.username,
        password: value.password,
      });
    return response.data;
  } catch (err) {
    throw new Error(t('logInError'));
  }
};

export const handleReg = async (value, t) => {
  try {
    const response = await axios.post(routes.regPath(), {
        username: value.username,
        password: value.password,
      });
    return response.data;
  } catch (err) {
    throw new Error(t('registerErrors.userExists'));
  }
};

export const fetchChannels = (token) =>
  axios.get(routes.getChannels(), {
    headers: { Authorization: `Bearer ${token}` },
});
  
export const fetchMessages = (token) =>
  axios.get(routes.getMessages(), {
    headers: { Authorization: `Bearer ${token}` },
});
