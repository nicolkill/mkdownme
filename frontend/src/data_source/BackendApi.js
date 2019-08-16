import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 30000,
});

class BackendApi {

  static getAll() {
    return instance.request({
      url: '/docs',
      method: 'get',
    });
  }

  static getOne(id) {
    return instance.request({
      url: `/docs/${id}`,
      method: 'get',
    });
  }

}

export default BackendApi;
