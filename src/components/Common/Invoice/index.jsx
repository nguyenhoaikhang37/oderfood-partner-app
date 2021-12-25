import moment from 'moment';
import React from 'react';
import Images from '../../../constants/images';
import './Invoice.css';

const Invoice = React.forwardRef(({ printOrder }, ref) => {
  console.log('🚀 ~ file: index.jsx ~ line 6 ~ Invoice ~ printOrder', printOrder);
  return (
    <div className="page" ref={ref}>
      <img className="img" src={Images.LOGO} align="right" alt="logo" />
      <p className="address"></p>
      <div className="flex justify-center space-x-4 mb-3">
        <div>
          <h6 className="font-bold">MÃ ĐƠN HÀNG</h6>
          <h6 className="font-bold">NGÀY GIỜ ĐẶT MÓN</h6>
          <h6 className="font-bold">NGÀY GIỜ GIAO MÓN</h6>
        </div>
        <div>
          <p>{printOrder?._id}</p>
          <p>{moment(printOrder?.user?.createdAt).format('LLL')}</p>
          <p>{moment(printOrder?.createdAt).format('LLL')}</p>
        </div>
      </div>
      <div className="flex justify-around mb-10">
        <div className="w-6/12">
          <h6 className="font-bold">GỬI TỪ</h6>
          <p>tên ch</p>
          <p>địa chỉ</p>
          <p>US-001</p>
        </div>
        <div className="w-6/12">
          <h6 className="font-bold">ĐỊA CHỈ KHÁCH HÀNG</h6>
          <p>
            <span className="font-semibold">Tên:</span> {printOrder?.user?.profile?.fullName}
          </p>
          <p>
            <span className="font-semibold">Địa chỉ:</span> {printOrder?.user?.profile?.address}
          </p>
          <p>
            <span className="font-semibold">Sđt:</span> {printOrder?.user?.phoneNumber}
          </p>
        </div>
      </div>

      <div className="main-strip">
        <h6 className="font-bold">SL</h6>
        <h6 className="font-bold">MÓN</h6>
        <h6 className="font-bold">GIÁ</h6>
      </div>
      {printOrder?.cartFood?.map((food) => (
        <div key={food._id} className="main-strip">
          <p>{food?.quantityFood}</p>
          <p>{food?.idFood?.name}</p>
          <p>{food?.amount?.toLocaleString()}đ</p>
        </div>
      ))}
      {printOrder?.cartCombo?.map((combo) => (
        <div key={combo._id} className="main-strip">
          <p>{combo?.quantityCombo}</p>
          <p>{combo?.idCombo?.name}</p>
          <p>{combo?.amount?.toLocaleString()}đ</p>
        </div>
      ))}
      <total>
        <div className="shipping-total">
          <p className="text-base">Giá</p>
          <p className="text-base">{(printOrder?.total - printOrder?.ship)?.toLocaleString()}đ</p>
        </div>
        <div className="shipping-total-1">
          <p className="text-base">Tiền ship</p>
          <p className="text-base">{printOrder?.ship?.toLocaleString()}đ</p>
        </div>
        <div className="shipping-total-2">
          <h6 className="font-bold">TỔNG</h6>
          <h6 className="font-bold">{printOrder?.total?.toLocaleString()}đ</h6>
        </div>
      </total>
    </div>
  );
});

export default Invoice;
