import http from '../config/http-common';

class listDataService {
  getAll() {
    return http.get('/tasks');
  }
}

export default new listDataService();
