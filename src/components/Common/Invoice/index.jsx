import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import Images from '../../../constants/images';
import { selectLoginUser } from '../../../features/Login/loginSlice';
import './Invoice.css';

const Invoice = React.forwardRef(({ printOrder }, ref) => {
  const user = useSelector(selectLoginUser);

  return (
    <div className="page" ref={ref}>
      <img className="img" src={Images.LOGO} align="right" alt="logo" />
      <p className="address"></p>
      <div className="flex space-x-4 mb-3">
        <div>
          <h6 className="font-bold">MÃ ĐƠN HÀNG</h6>
          <h6 className="font-bold">NGÀY GIỜ ĐẶT MÓN</h6>
        </div>
        <div>
          <p>{printOrder?._id}</p>
          <p>{moment(printOrder?.createdAt).format('LLL')}</p>
        </div>
      </div>
      <div className="flex justify-around mb-10">
        <div className="w-6/12">
          <h6 className="font-bold">GỬI TỪ</h6>
          <p>
            <span className="font-bold">Tên cửa hàng:</span> {user?.name}
          </p>
          <p>
            <span className="font-bold">Địa chỉ:</span> {user?.location}
          </p>
          <p>
            <span className="font-bold">Sđt:</span> {user?.phoneNumber}
          </p>
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

      <table className="table">
        <tr>
          <th>Món</th>
          <th>Số lượng</th>
          <th>Giá gốc</th>
          <th>Giảm</th>
          <th>Tổng giá</th>
        </tr>
        {printOrder?.cartFood?.map((food) => (
          <tr>
            <td style={{ maxWidth: 200 }}>
              <p className="font-semibold">{food?.idFood?.name}</p>
              <p className="italic">
                {food?.listChoose?.map((choose) => choose._id.name).join(', ')}
              </p>
            </td>
            <td>{food?.quantityFood}</td>
            <td>{food?.cost?.toLocaleString()} đ</td>
            <td>{(food?.cost - food?.amount)?.toLocaleString()} đ</td>
            <td>{food?.amount?.toLocaleString()} đ</td>
          </tr>
        ))}
        {printOrder?.cartCombo?.map((combo) => (
          <tr>
            <td style={{ maxWidth: 200 }}>
              <p className="font-semibold">{combo?.idCombo?.name}</p>
              <p className="italic">
                {combo?.listChoose?.map((choose) => choose._id.name).join(', ')}
              </p>
            </td>
            <td>{combo?.quantityCombo}</td>
            <td>{combo?.cost?.toLocaleString()} đ</td>
            <td>{(combo?.cost - combo?.amount)?.toLocaleString()} đ</td>
            <td>{combo?.amount?.toLocaleString()} đ</td>
          </tr>
        ))}
      </table>
      {/* {printOrder?.cartFood?.map((food) => (
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
      ))} */}
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
