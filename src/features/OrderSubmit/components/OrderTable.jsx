import { LinearProgress } from '@mui/material';
import PropTypes from 'prop-types';
import OrderItem from './OrderItem';
import { Alert } from '@mui/material';

const OrderTable = ({ orderList, loading, isActiveOrder }) => {
  if (loading) {
    return <LinearProgress />;
  }
  if (orderList.length === 0) {
    return <Alert severity="info">Hiện tại chưa có đơn đặt hàng nào!</Alert>;
  }
  return (
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
            Tiền ship
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Tổng tiền
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
            Hình thức thanh toán
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Confirm</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {orderList
          .filter((x) => x.status === isActiveOrder)
          .map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
      </tbody>
    </table>
  );
};

OrderTable.propTypes = {
  orderList: PropTypes.array,
};

export default OrderTable;
