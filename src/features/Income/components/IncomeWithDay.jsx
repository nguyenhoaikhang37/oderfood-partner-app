import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Alert, CircularProgress, TextField } from '@mui/material';
import { useState } from 'react';
import incomeApi from '../../../apis/incomeApi';
import moment from 'moment';

const IncomeWithDay = ({ incomeDay, setIncomeDay, setExcelDay }) => {
  const [dayValue, setDayValue] = useState(new Date('1/1/2021'));
  const [loading, setLoading] = useState(false);

  const handleChangeDay = (newValue) => {
    setDayValue(newValue);
  };

  const handleSubmit = async () => {
    try {
      const formatDay = moment(dayValue).format('DD/MM/YYYY');

      setLoading(true);
      const response = await incomeApi.thongKeTheoNgay(formatDay);

      const formatExcelIncomeWithDay = response.data.order
        .filter((x) => x)
        .map((item) => ({
          ...item,
          user: item.user.profile.fullName,
          restaurant: item.restaurant.name,
          pay: item.pay.name,
          cartFood: item.cartFood.map((food) => food.idFood.name).join(','),
          cartCombo: item.cartCombo.map((food) => food.idFood.name).join(','),
        }));
      setExcelDay(formatExcelIncomeWithDay);
      setIncomeDay(response.data.order.filter((x) => x));

      setLoading(false);
    } catch (error) {
      console.log('🚀 ~ file: IncomeWithDay.jsx ~ line 27 ~ handleSubmit ~ error', error);
    }
  };

  return (
    <div className="p-4 flex flex-col space-y-4">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="col-span-1 mt-2" style={{ maxWidth: 200 }}>
          <DesktopDatePicker
            label="Ngày"
            inputFormat="MM/dd/yyyy"
            value={dayValue}
            onChange={handleChangeDay}
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

      {incomeDay.filter((x) => x._id).length !== 0 ? (
        <table className="divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Người mua
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Chi tiết đơn hàng
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Hình thức thanh toán
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ngày giờ đặt món
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tiền ship
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tiền món ăn
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tổng tiền
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Confirm</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {incomeDay.map((income) => (
              <tr key={income?._id}>
                <td className="px-6 py-4  max-w-xs">
                  <div className="text-sm capitalize text-gray-900">
                    {income?.user?.profile?.fullName}
                  </div>
                </td>
                <td className="px-6 py-4  max-w-xs">
                  <div className="text-sm capitalize text-gray-900 combo-content food-scroll pr-2">
                    {income?.cartFood.map((food) => (
                      <div key={food._id} className="flex space-x-2 my-2 items-center ">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={food.idFood.photo}
                        />
                        <label className="text-gray-900 text-sm cursor-pointer">
                          {food.idFood.name}
                        </label>
                        <ion-icon name="close-outline"></ion-icon> {food.quantityFood}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-right max-w-xs">
                  <div className="text-sm capitalize">{income?.pay?.name}</div>
                </td>
                <td className="px-6 py-4  max-w-xs">
                  <div className="text-sm capitalize">
                    {moment(income?.updatedAt).format('LLLL')}
                  </div>
                </td>
                <td className="px-6 py-4 text-right max-w-xs">
                  <div className="text-sm capitalize text-green-500">
                    {income?.total.toLocaleString()}đ
                  </div>
                </td>
                <td className="px-6 py-4 text-right max-w-xs">
                  <div className="text-sm capitalize text-green-500">
                    {income?.ship.toLocaleString()}đ
                  </div>
                </td>
                <td className="px-6 py-4 text-right max-w-xs">
                  <div className="text-sm capitalize font-semibold">
                    {(income?.total + income?.ship).toLocaleString()}đ
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-6 py-4  max-w-xs"></td>
              <td className="px-6 py-4  max-w-xs"></td>
              <td className="px-6 py-4 text-right max-w-xs"></td>
              <td className="px-6 py-4  max-w-xs"></td>
              <td colSpan={3} className="px-6 py-4 text-right max-w-xs font-semibold">
                Tổng hoá đơn:{' '}
                <span className="text-red-500">
                  {incomeDay
                    .reduce((sum, curr) => sum + curr.total + curr.ship, 0)
                    .toLocaleString()}
                  đ
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

export default IncomeWithDay;
