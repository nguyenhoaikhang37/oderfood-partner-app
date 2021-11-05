import React, { useEffect, useState } from 'react';
import orderApi from '../../apis/orderApi';
import OrderTable from './components/OrderTable';

const OrderSubmit = () => {
  const [orderList, setOrderList] = useState([]);
  console.log('🚀 ~ file: index.jsx ~ line 8 ~ OrderSubmit ~ orderList', orderList);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await orderApi.getOrderList();
      setOrderList(res.data.order);
      setLoading(false);
    })();
  }, []);

  return (
    <div style={{ maxWidth: '1070px' }} className="block overflow-x-auto">
      <OrderTable loading={loading} orderList={orderList} />
    </div>
  );
};

export default OrderSubmit;
