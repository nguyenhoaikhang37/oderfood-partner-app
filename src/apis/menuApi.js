import { ACCESS_TOKEN } from '../constants/global';
import axiosClient from './axiosClient';
const token = localStorage.getItem(ACCESS_TOKEN);

const menuApi = {
  getMenuList() {
    const url = '/menu';
    return axiosClient.get(url);
  },
  addMenu(formValues) {
    const url = '/menu';
    return axiosClient({
      url,
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: formValues,
    });
  },
  deleteMenu(menuId) {
    const url = `/menu/${menuId}`;
    return axiosClient({
      url,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  updateMenu(formValues) {
    const url = `/menu/${formValues._id}`;
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

export default menuApi;
