import React, { useEffect, useState } from 'react';
import orderApi from '../../apis/orderApi';
import OrderTable from './components/OrderTable';

const OrderSubmit = () => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(0);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await orderApi.getOrderList();
      setOrderList(res.data.order);
      setLoading(false);
    })();
  }, []);

  const handleChoXacNhanClick = async () => {
    setIsActive(0);
  };

  const handleDangGiaoClick = async () => {
    setIsActive(1);
  };

  return (
    <div style={{ maxWidth: '1070px' }} className="block overflow-x-auto">
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
      <OrderTable loading={loading} orderList={orderList} isActiveOrder={isActive} />
    </div>
  );
};

export default OrderSubmit;
