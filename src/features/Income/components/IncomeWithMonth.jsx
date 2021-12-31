import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Alert, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import incomeApi from '../../../apis/incomeApi';
import moment from 'moment';

const IncomeWithMonth = ({ incomeMonth, setIncomeMonth, setTopFood, setExcelMonth }) => {
  const [valueStart, setValueStart] = useState(new Date('1/1/2021'));
  const [valueEnd, setValueEnd] = useState(new Date('12/30/2021'));
  const [loading, setLoading] = useState(false);

  const handleChangeStart = (newValue) => {
    setValueStart(newValue);
  };

  const handleChangeEnd = (newValue) => {
    setValueEnd(newValue);
  };

  const handleSubmit = async () => {
    try {
      const formatStart = moment(valueStart).format('MM/DD/YYYY');
      const formatEnd = moment(valueEnd).format('MM/DD/YYYY');

      setLoading(true);
      const response = await incomeApi.thongKeTheoThang(formatStart, formatEnd);
      const response2 = await incomeApi.layTopFood(formatStart, formatEnd);
      setTopFood(response2.data.data);
      setIncomeMonth(response.data.income);
      setExcelMonth(
        response.data.income.map((item) => ({
          'Ngày mua': `Ngày ${moment(item?.createdAt).format('DD')} Tháng ${moment(
            item?.createdAt
          ).format('MM')}`,
          'Tổng đơn': `${item?.sum.toLocaleString()} đơn`,
          'Giá gốc': `${(item?.totalCost - item?.totalShip).toLocaleString()}đ`,
          'Giá sau khuyến mãi': `${(item?.total - item?.totalShip).toLocaleString()}đ`,
          'Tổng tiền ship': `${item?.totalShip.toLocaleString()}đ`,
          'Tổng cộng': `${(item?.total).toLocaleString()}`,
        }))
      );
    } catch (error) {
      console.log('🚀 ~ file: IncomeWithMonth.jsx ~ line 52 ~ handleSubmit ~ error', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 flex flex-col space-y-4">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="col-span-1 mt-2" style={{ maxWidth: 200 }}>
          <DesktopDatePicker
            label="Ngày bắt đầu"
            inputFormat="dd/MM/yyyy"
            value={valueStart}
            onChange={handleChangeStart}
            renderInput={(params) => <TextField fullWidth size="small" {...params} />}
          />
        </div>
        <div className="col-span-1 mt-2" style={{ maxWidth: 200 }}>
          <DesktopDatePicker
            label="Ngày kết thúc"
            inputFormat="dd/MM/yyyy"
            value={valueEnd}
            onChange={handleChangeEnd}
            renderInput={(params) => <TextField fullWidth size="small" {...params} />}
          />
        </div>
        <button
          style={{ maxWidth: 200 }}
          onClick={handleSubmit}
          type="submit"
          className="flex items-center justify-center py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg col-span-1 mt-2"
        >
          Tìm kiếm {loading && <CircularProgress size="1rem" color="inherit" />}
        </button>
      </LocalizationProvider>

      {incomeMonth.filter((x) => x._id).length !== 0 ? (
        <table className="divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tháng
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tổng đơn
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Giá gốc
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Giá sau khuyến mãi
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tổng tiền ship
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tổng cộng
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {incomeMonth
              .sort(function (a, b) {
                return new Date(a.createdAt) - new Date(b.createdAt);
              })
              .map((income) => (
                <tr key={income?._id}>
                  <td className="px-6 py-4  max-w-xs">
                    <div className="text-sm capitalize text-gray-900">
                      Ngày {moment(income?.createdAt).format('DD')} Tháng{' '}
                      {moment(income?.createdAt).format('MM')}
                    </div>
                  </td>
                  <td className="px-6 py-4  max-w-xs">
                    <div className="text-sm">{income?.sum.toLocaleString()} đơn</div>
                  </td>
                  <td className="px-6 py-4 text-left max-w-xs">
                    <div className="text-sm capitalize text-green-500">
                      {(income?.totalCost - income?.totalShip).toLocaleString()}đ
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left max-w-xs">
                    <div className="text-sm capitalize text-green-500">
                      {(income?.total - income?.totalShip).toLocaleString()}đ
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left max-w-xs">
                    <div className="text-sm capitalize text-green-500">
                      {income?.totalShip.toLocaleString()}đ
                    </div>
                  </td>
                  <td className="px-6 py-4 text-left max-w-xs">
                    <div className="text-sm capitalize font-semibold">
                      {(income?.total).toLocaleString()}đ
                    </div>
                  </td>
                </tr>
              ))}
            <tr>
              <td className="px-6 py-4  max-w-xs"></td>
              <td className="px-6 py-4  max-w-xs"></td>
              <td className="px-6 py-4 text-right max-w-xs"></td>
              <td colSpan={3} className="px-6 py-4 text-right max-w-xs font-semibold">
                Tổng doanh thu:{' '}
                <span className="text-red-500">
                  {incomeMonth.reduce((sum, curr) => sum + curr.total, 0).toLocaleString()}đ
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <Alert severity="info">Ngày bạn chọn hiện không có hoá đơn nào!</Alert>
      )}
    </div>
  );
};

export default IncomeWithMonth;
