import axios from 'axios';
import routes from '../routes.js';


const handleLogin = async (value) => {
  try {
    const response = await axios.post(routes.loginPath(), {
        username: value.username,
        password: value.password,
      });
    return response.data;
  } catch (err) {
    throw new Error('Неверный логин или пароль');
  }
};

export default handleLogin;