import { ACCESS_TOKEN } from '../constants/global';
import axiosClient from './axiosClient';
const token = localStorage.getItem(ACCESS_TOKEN);

const comboApi = {
  getCombo() {
    const url = '/combo';
    return axiosClient({
      url,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  addCombo(comboValues) {
    const url = '/combo';
    return axiosClient({
      url,
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: comboValues,
    });
  },
};

export default comboApi;
