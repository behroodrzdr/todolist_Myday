import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:9002',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-type': 'application/json',
  },
});
