import http from '../config/http-common';

class taskDataService {
  get(id) {
    return http.get(`/task/${id}`);
  }

  create({ title, description }) {
    return http.post(`/task/create/${title}/${description}`, null);
  }

  update({ id, title, description }) {
    return http.put(`/task/update/${id}/${title}/${description}`, null);
  }

  delete(id) {
    return http.delete(`/task/delete/${id}`);
  }
}

export default new taskDataService();
