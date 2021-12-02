import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import orderApi from '../../apis/orderApi';
import { ACCESS_TOKEN } from '../../constants/global';
import OrderTable from './components/OrderTable';

const token = localStorage.getItem(ACCESS_TOKEN);

const todosEndpoint = 'https://server-express-foodapp.herokuapp.com/api/order/restaurant';

const OrderSubmit = () => {
  // const [orderList, setOrderList] = useState([]);
  const [isActive, setIsActive] = useState(0);

  const fetcher = async () => {
    try {
      const response = await axios.get(todosEndpoint, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      return await response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const { data, error } = useSWR(todosEndpoint, fetcher);
  const loading = !error && !data;

  // useEffect(() => {
  //   (async () => {
  //     setLoading(true);
  //     const res = await orderApi.getOrderList();
  //     setOrderList(res.data.order);
  //     setLoading(false);
  //   })();
  // }, []);

  const handleChoXacNhanClick = async () => {
    setIsActive(0);
  };

  const handleDangGiaoClick = async () => {
    setIsActive(1);
  };

  return (
    <div style={{ maxWidth: '1300px' }} className="block overflow-x-auto">
      <div className="flex items-center mb-8">
        <div>
          <div
            onClick={handleChoXacNhanClick}
            className={`py-2 px-6 cursor-pointer ${
              isActive === 0 && 'bg-indigo-100 text-indigo-700 rounded-full'
            }`}
          >
            <p>Chờ xác nhận</p>
          </div>
        </div>
        <div>
          <div
            onClick={handleDangGiaoClick}
            className={`py-2 px-6 cursor-pointer ${
              isActive === 1 && 'bg-indigo-100 text-indigo-700 rounded-full'
            }`}
          >
            <p>Đang giao</p>
          </div>
        </div>
      </div>
      {data?.order?.length !== 0 && (
        <OrderTable loading={loading} orderList={data?.order} isActiveOrder={isActive} />
      )}
    </div>
  );
};

export default OrderSubmit;
