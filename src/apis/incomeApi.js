import { ACCESS_TOKEN } from '../constants/global';
import axiosClient from './axiosClient';
const token = localStorage.getItem(ACCESS_TOKEN);

const incomeApi = {
  getIncomeList(start, end) {
    const url = `/order/income1?dateStart=${start}&dateEnd=${end}`;
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
