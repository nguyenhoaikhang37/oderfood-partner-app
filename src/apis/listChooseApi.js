import axiosClient from './axiosClient';
import { ACCESS_TOKEN } from '../constants/global';
const token = localStorage.getItem(ACCESS_TOKEN);

const listChooseApi = {
  getListChooseAll() {
    const url = `/listChoose`;
    return axiosClient.get(url);
  },
  getListChooseById(id) {
    const url = `/listChoose/${id}`;
    return axiosClient.get(url);
  },
  addListChoose(formValues) {
    const url = '/listChoose';
    return axiosClient({
      url,
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: formValues,
    });
  },
  deleteListChoose(chooseId) {
    const url = `/listChoose/${chooseId}`;
    return axiosClient({
      url,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  updateListChoose(formValues) {
    const url = `/listChoose/${formValues._id}`;
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

export default listChooseApi;
