import axiosClient from './axiosClient';
const token = localStorage.getItem('accessToken');

const userApi = {
  layThongTinTaiKhoan() {
    const url = `/restaurant/profile`;
    return axiosClient({
      url,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
};

export default userApi;
