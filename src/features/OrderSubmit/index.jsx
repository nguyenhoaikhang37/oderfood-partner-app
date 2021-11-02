import React, { useEffect, useState } from 'react';
import orderApi from '../../apis/orderApi';
import OrderTable from './components/OrderTable';

const OrderSubmit = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await orderApi.getOrderList();
      setOrderList(res.data.order);
    })();
  }, []);

  return (
    <div style={{ maxWidth: '1070px' }} className="block overflow-x-auto">
      <OrderTable orderList={orderList} />
    </div>
  );
};

export default OrderSubmit;
