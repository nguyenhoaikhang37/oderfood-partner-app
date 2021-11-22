import { ACCESS_TOKEN } from '../constants/global';
import axiosClient from './axiosClient';
const token = localStorage.getItem(ACCESS_TOKEN);

const incomeApi = {
  thongKeTheoThang(start, end) {
    const url = `/order/thong-ke-theo-thang?dateStart=${start}&dateEnd=${end}`;
    return axiosClient({
      url,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
  thongKeTheoNgay(day) {
    const url = `/order/thong-ke-theo-ngay?dateStart=${day}`;
    return axiosClient({
      url,
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
  },
};

export default incomeApi;
