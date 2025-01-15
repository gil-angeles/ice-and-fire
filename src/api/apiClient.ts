import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.anapioficeandfire.com/api',
  headers: {
    Accept: 'application/json'
  }
});

export default apiClient;
