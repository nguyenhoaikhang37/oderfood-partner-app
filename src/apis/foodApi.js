import { ACCESS_TOKEN } from '../constants/global';
import axiosClient from './axiosClient';
const token = localStorage.getItem(ACCESS_TOKEN);

const foodApi = {
  getFoodList(resId) {
    const url = `/food/restaurant/${resId}`;
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
  updateFood(formValues) {
    const url = `/food/${formValues._id}`;
    return axiosClient({
      url,
      method: 'PUT',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: formValues,
    });
  },
};

export default foodApi;
