import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'https://a274-note-app-backend.herokuapp.com/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL);
  }

  getUserBoard() {
    return axios.get(API_URL, { headers: authHeader() });
  }
}

export default new UserService();
