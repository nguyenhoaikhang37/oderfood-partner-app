import { ACCESS_TOKEN } from '../constants/global';
import axiosClient from './axiosClient';
const token = localStorage.getItem(ACCESS_TOKEN);

const discountApi = {
  getFoodDiscount() {
    const url = '/food/all';
    return axiosClient({
      url,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  getDiscountList() {
    const url = '/discount/restaurant';
    return axiosClient({
      url,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  addDiscount(discountValues) {
    const url = '/discount';
    return axiosClient({
      url,
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: discountValues,
    });
  },
  deleteDiscount(discountId) {
    const url = `/discount/${discountId}`;
    return axiosClient({
      url,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
};

export default discountApi;
