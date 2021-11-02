import { ACCESS_TOKEN } from '../constants/global';
import axiosClient from './axiosClient';
const token = localStorage.getItem(ACCESS_TOKEN);

const orderApi = {
  getOrderList() {
    const url = `/order/restaurant`;
    return axiosClient({
      url,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  confirmOrder(id) {
    const url = `/order/${id}`;
    return axiosClient({
      url,
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
};

export default orderApi;
