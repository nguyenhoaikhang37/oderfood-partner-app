import axiosClient from './axiosClient';
import { ACCESS_TOKEN } from '../constants/global';
const token = localStorage.getItem(ACCESS_TOKEN);

const chooseApi = {
  getChooseList(userId) {
    const url = `/choose/${userId}`;
    return axiosClient.get(url);
  },
  addChoose(formValues) {
    const url = '/choose';
    return axiosClient({
      url,
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      data: formValues,
    });
  },
  deleteChoose(chooseId) {
    const url = `/choose/${chooseId}`;
    return axiosClient({
      url,
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  updateChoose(formValues) {
    const url = `/choose/${formValues._id}`;
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

export default chooseApi;
