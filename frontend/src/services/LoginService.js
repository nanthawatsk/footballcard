import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/';

const LoginService = {
  login: (username, password) => {
    const url = `${BASE_URL}login/`; // Replace 'login/' with your actual login endpoint

    return axios.post(url, { username, password })
      .then(response => response.data)
      .catch(error => {
        throw new Error(error.response.data.detail || 'Login failed');
      });
  }
};

export default LoginService;
