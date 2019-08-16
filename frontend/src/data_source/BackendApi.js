import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/',
  timeout: 30000,
  headers: {
    'content-type': 'application/json',
  }
});

class BackendApi {

  static getAll() {
    return instance.request({
      url: '/docs',
      method: 'GET',
    });
  }

  static getOne(id) {
    return instance.request({
      url: `/docs/${id}`,
      method: 'GET',
    });
  }

  static create() {
    return instance.request({
      url: '/docs',
      method: 'POST',
    });
  }

  static update(id, content) {
    return instance.request({
      method: 'PUT',
      url: `/docs/${id}`,
      data: { content },
    });
  }

}

export default BackendApi;
