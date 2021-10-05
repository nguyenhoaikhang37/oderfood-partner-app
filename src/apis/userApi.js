import axiosClient from './axiosClient';

const userApi = {
  layThongTinTaiKhoan(token) {
    const url = `/restaurant/profile`;
    return axiosClient({
      url,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  dangNhap(formValues) {
    const url = `/restaurant/login`;
    return axiosClient.post(url, formValues);
  },
};

export default userApi;
