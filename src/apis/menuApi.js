import axiosClient from './axiosClient';
const token = localStorage.getItem('accessToken');

const menuApi = {
  getMenuList() {
    const url = '/menu';
    return axiosClient.get(url);
  },
  addMenu(formValues) {
    const url = '/menu';
    return axiosClient.post({
      url,
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: formValues,
    });
  },
};

export default menuApi;
