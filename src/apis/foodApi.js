import axiosClient from './axiosClient';

const foodApi = {
  getFoodList() {
    const url = '/food';
    return axiosClient.get(url);
  },
};

export default foodApi;
