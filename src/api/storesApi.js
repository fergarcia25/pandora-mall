import axiosInstance from './axiosInstance';

export const storesApi = {
  getAll: (params) => axiosInstance.get('/stores', { params }),
  getById: (id) => axiosInstance.get(`/stores/${id}`),
  getMallLayout: () => axiosInstance.get('/stores/layout'),
};
