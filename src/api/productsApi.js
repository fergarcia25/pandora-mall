import axiosInstance from './axiosInstance';

export const productsApi = {
  getAll: (params) => axiosInstance.get('/products', { params }),
  getById: (id) => axiosInstance.get(`/products/${id}`),
  getByStore: (storeId) => axiosInstance.get(`/products`, { params: { storeId } }),
};
