import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import OrderFoodPopup from './OrderFoodPopup';
import Dialog from '../../../components/Common/Dialog';

import { useState } from 'react';
import Swal from 'sweetalert2';
import moment from 'moment';
import 'moment/locale/vi';
import orderApi from '../../../apis/orderApi';
import axios from 'axios';

moment.locale('vi');

const OrderItem = ({ order }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirmOrder = (id) => {
    try {
      Swal.fire({
        title: 'Bạn muốn xác nhận đơn hàng này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#F87171',
        cancelButtonText: 'Huỷ',
        confirmButtonText: 'Có, tôi chắc chắn!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await orderApi.confirmOrder(id);

          Swal.fire('Success!', 'Bạn đã xác nhận đơn hàng thành công.', 'success');
          window.location.reload();
        }
      });
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 41 ~ handleRemoveMenu ~ error', error);
    }
  };

  const handleConfirmShip = (id) => {
    try {
      Swal.fire({
        title: 'Bạn muốn xác nhận đã giao thành công?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#F87171',
        cancelButtonText: 'Huỷ',
        confirmButtonText: 'Có, tôi chắc chắn!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await orderApi.confirmOrder(id);

          Swal.fire('Success!', 'Bạn đã giao hàng thành công.', 'success');
          window.location.reload();
        }
      });
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 41 ~ handleRemoveMenu ~ error', error);
    }
  };

  const handleDeleteOrder = (id) => {
    try {
      Swal.fire({
        title: 'Bạn chắn chắn muốn xoá đơn hàng này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#F87171',
        cancelButtonText: 'Huỷ',
        confirmButtonText: 'Có, tôi chắc chắn!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await orderApi.deleteOrder(id);

          Swal.fire('Deleted!', 'Bạn đã xoá đơn hàng thành công.', 'success');
          window.location.reload();
        }
      });
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 41 ~ handleRemoveMenu ~ error', error);
    }
  };

  return (
    <>
      <tr>
        <td style={{ minWidth: '280px' }} className="px-6 py-4 max-w-xs">
          <div className="flex items-center space-x-3">
            <img
              src={`https://i.pravatar.cc/300?u=${order?.user?.profile?.fullName}`}
              className="mx-auto object-cover rounded-full h-12 w-12"
            />
            <div>
              <p>{order?.user?.profile?.fullName}</p>
              <p className="text-xs text-gray-500">{order?.user?.phoneNumber}</p>
              <p className="text-xs">{order?.user?.profile?.address}</p>
            </div>
          </div>
        </td>
        <td className="px-6 py-4  max-w-xs">
          <span
            onClick={handleOpen}
            className="flex items-center cursor-pointer text-2xl hover:text-indigo-500"
          >
            <ion-icon name="search-circle-outline"></ion-icon>
          </span>
        </td>
        <td className="px-6 py-4 text-indigo-600 text-right max-w-xs">
          {order?.ship?.toLocaleString()}đ
        </td>
        <td className="px-6 py-4 text-green-600 max-w-xs">
          {(order?.total + order?.ship).toLocaleString()}đ
        </td>
        <td style={{ minWidth: '280px' }} className="px-6 py-4 max-w-xs text-base">
          {moment(order?.createdAt).format('LLLL')}
        </td>
        <td style={{ minWidth: '150px' }} className="px-6 py-4  max-w-xs text-base">
          Tiền mặt
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium cursor-pointer">
          {order?.status === 0 ? (
            <>
              <Button
                onClick={() => handleConfirmOrder(order?._id)}
                sx={{ margin: '10px' }}
                color="primary"
                variant="outlined"
              >
                Xác nhận đơn hàng <ion-icon name="checkmark-done-outline"></ion-icon>
              </Button>
              <Button
                onClick={() => handleDeleteOrder(order?._id)}
                sx={{ margin: '10px' }}
                color="secondary"
                variant="outlined"
              >
                Xoá đơn hàng <ion-icon name="trash-outline"></ion-icon>
              </Button>
            </>
          ) : order?.status === 1 ? (
            <div>
              <span className="relative inline-block px-4 py-2 font-semibold text-indigo-900 leading-tight">
                <span
                  aria-hidden
                  className="absolute inset-0 bg-indigo-200 opacity-50 rounded-full"
                />
                <span className="relative text-sm">Đang giao</span>
              </span>
              <Button
                onClick={() => handleConfirmShip(order?._id)}
                sx={{ margin: '10px' }}
                color="primary"
              >
                Xác nhận đã giao <ion-icon name="bicycle-outline"></ion-icon>
              </Button>
            </div>
          ) : (
            <span className="relative inline-block px-4 py-2 font-semibold text-green-900 leading-tight">
              <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full" />
              <span className="relative text-sm">Đã giao</span>
            </span>
          )}
        </td>
      </tr>
      <Dialog open={open} onClose={handleClose}>
        <OrderFoodPopup order={order} />
      </Dialog>
    </>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object,
};

export default OrderItem;
