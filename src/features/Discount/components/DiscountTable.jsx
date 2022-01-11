import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/vi';
import { Alert } from '@mui/material';

moment.locale('vi');

function DiscountTable({ discountList, onDeleteDiscount, getUpdateDiscount }) {
  return (
    <>
      {discountList.length !== 0 && (
        <table className="divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tên khuyến mãi
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Các món ăn trong khuyến mãi
              </th>
              {/* <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            % khuyến mãi
          </th> */}
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ngày bắt đầu
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Ngày kết thúc
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit and Remove</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...discountList]
              ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              ?.map((discount) => (
                <tr key={discount?._id}>
                  <td className="px-6 py-4  max-w-xs">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-14 w-14">
                        <img
                          className="h-14 w-14 rounded-full object-cover"
                          src={discount?.photo}
                        />
                      </div>
                      <div className="ml-4 max-w-max-w-so-small">
                        <div className="text-sm capitalize font-medium text-gray-900">
                          {discount?.nameDiscount}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4  max-w-xs" style={{ width: '400px' }}>
                    <div className="text-sm capitalize text-gray-900 combo-content food-scroll pr-2">
                      {discount?.discountDetail.map((food) => (
                        <div key={food._id} className="flex space-x-2 my-2 items-center ">
                          <img
                            className="h-10 w-10 rounded-full object-cover"
                            src={food?.idFood?.photo}
                          />
                          <label className="text-gray-900 text-sm cursor-pointer">
                            {food?.idFood?.name}
                          </label>
                          <ion-icon name="close-outline"></ion-icon> {food?.idFood?.quantity}
                          <div className="text-xs text-green-500 flex-shrink-0">
                            (Giảm {food?.discount}%)
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  {/* <td className="px-6 py-4 text-right max-w-xs">
              <div className="text-sm capitalize text-green-500">{discount??.discount} %</div>
            </td> */}
                  <td className="px-6 py-4  max-w-xs">
                    <div className="text-sm capitalize ">
                      {moment(discount?.discountDetail[0]?.start)?.format('LLLL')}
                    </div>
                  </td>
                  <td className="px-6 py-4  max-w-xs">
                    <div className="text-sm capitalize ">
                      {moment(discount?.discountDetail[0]?.end).format('LLLL')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                    <a
                      onClick={() => getUpdateDiscount(discount)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Sửa <ion-icon name="create-outline"></ion-icon>
                    </a>
                    <a
                      onClick={() => {
                        onDeleteDiscount(discount?._id);
                      }}
                      className="text-red-600  hover:text-red-900 ml-5"
                    >
                      Xoá <ion-icon name="trash-outline"></ion-icon>
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      {discountList.length === 0 && <Alert severity="error">Hiện tại chưa khuyến mãi nào!</Alert>}
    </>
  );
}

DiscountTable.propTypes = {
  discountList: PropTypes.array,
  onDeleteDiscount: PropTypes.func,
};

export default DiscountTable;
