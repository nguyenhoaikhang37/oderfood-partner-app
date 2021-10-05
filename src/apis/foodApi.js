import { ACCESS_TOKEN } from '../constants/global';
import axiosClient from './axiosClient';
const token = localStorage.getItem(ACCESS_TOKEN);

const foodApi = {
  getFoodList() {
    const url = '/food';
    return axiosClient.get(url);
  },
  addFood(formValues) {
    const url = '/food';
    return axiosClient({
      url,
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: formValues,
    });
  },
  deleteFood(foodId) {
    const url = `/food/${foodId}`;
    return axiosClient({
      url,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
};

export default foodApi;
