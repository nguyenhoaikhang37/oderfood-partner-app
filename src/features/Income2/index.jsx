import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { CircularProgress, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

import incomeApi from '../../apis/incomeApi';
import OrderTable from '../OrderSubmit/components/OrderTable';

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const Income2 = () => {
  // state
  const [incomeList, setIncomeList] = useState([]);
  const [valueStart, setValueStart] = useState(new Date('1/1/2021'));
  const [valueEnd, setValueEnd] = useState(new Date('12/30/2021'));
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   (async () => {
  //     const res = await incomeApi.getOrderListByDay();
  //     setOrderList(res.data.order);
  //   })();
  // }, []);

  // useEffect(() => {
  //   (async () => {
  //     const res = await incomeApi.getIncomeList('1/1/2021', '12/30/2021');
  //     setIncomeList(res.data);
  //   })();
  // }, []);

  const data = {
    labels: incomeList.sort((a, b) => a._id - b._id)?.map((income) => `Tháng ${income._id}`),
    datasets: [
      {
        label: 'Ẩn doanh thu',
        data: incomeList?.map((income) => income.total),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleChangeStart = (newValue) => {
    setValueStart(newValue);
  };

  const handleChangeEnd = (newValue) => {
    setValueEnd(newValue);
  };

  const handleSearchIncome = async () => {
    setLoading(true);
    const resIncome = await incomeApi.getIncomeList(valueStart, valueEnd);
    setIncomeList(resIncome.data);
    const resTable = await incomeApi.getOrderListByDay(valueStart, valueEnd);
    setOrderList(resTable.data.order);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '1070px' }} className="block overflow-x-auto">
      <div className="header px-8">
        <div className="mb-6 text-3xl font-light text-center text-indigo-800 dark:text-white">
          Doanh thu cửa hàng <ion-icon name="cellular-outline"></ion-icon>
        </div>
        <div className="grid max-w-xl grid-cols-3 gap-2 m-auto mb-4">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="col-span-1 mt-2">
              <DesktopDatePicker
                label="Ngày bắt đầu"
                inputFormat="dd/MM/yyyy"
                value={valueStart}
                onChange={handleChangeStart}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
              />
            </div>
            <div className="col-span-1 mt-2">
              <DesktopDatePicker
                label="Ngày kết thúc"
                inputFormat="dd/MM/yyyy"
                value={valueEnd}
                onChange={handleChangeEnd}
                renderInput={(params) => <TextField fullWidth size="small" {...params} />}
              />
            </div>
            <button
              onClick={handleSearchIncome}
              type="submit"
              className="flex items-center justify-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg col-span-1 mt-2"
            >
              Tìm kiếm {loading && <CircularProgress size="1rem" color="inherit" />}
            </button>
          </LocalizationProvider>
        </div>
      </div>
      <OrderTable orderList={orderList} isIncomeTable="incomeTable" />
      <Bar className="p-8" data={data} options={options} />
    </div>
  );
};

export default Income;
