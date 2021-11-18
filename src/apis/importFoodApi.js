import { ACCESS_TOKEN } from '../constants/global';
import axiosClient from './axiosClient';
const token = localStorage.getItem(ACCESS_TOKEN);

const importFoodApi = {
  addImportFood(values) {
    const url = '/food/add/sl';
    return axiosClient({
      url,
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: values,
    });
  },
};

export default importFoodApi;
