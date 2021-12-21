import PropTypes from 'prop-types';

const OrderFoodPopup = ({ order }) => {
  console.log('🚀 ~ file: OrderFoodPopup.jsx ~ line 4 ~ OrderFoodPopup ~ order', order);
  return (
    <div>
      <div className="mb-6 text-3xl font-light text-center text-indigo-800 dark:text-white">
        Chi tiết đơn hàng
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center bg-transparent w-full border-collapse ">
          <thead>
            <tr>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Món
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Số lượng
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Giá
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Giảm
              </th>
              <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                Tổng cộng
              </th>
            </tr>
          </thead>
          <tbody>
            {order?.cartFood?.map((food) => (
              <tr key={food?.idFood?._id}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={food?.idFood?.photo}
                    />
                    <div>
                      <p className="font-bold">{food?.idFood?.name}</p>
                      {food?.listChoose?.map((item) => item?.idChoose?.name).join(' ')}
                    </div>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  {food?.quantityFood}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-green-600">
                  {(food?.cost).toLocaleString()} đ
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  {(food?.cost - food?.amount).toLocaleString()} đ
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-500 font-bold">
                  {food?.amount.toLocaleString()} đ
                </td>
              </tr>
            ))}
            {order?.cartCombo?.map((combo) => (
              <tr>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                  <div className="flex items-center space-x-4">
                    <img
                      className="w-10 h-10 rounded-full object-cover"
                      src={combo?.idCombo?.photo}
                    />
                    <div>
                      <p className="font-bold">{combo?.idCombo?.name}</p>
                    </div>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  {combo?.quantityCombo}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-green-600">
                  {(combo?.amount * (100 / (100 - combo?.idCombo?.discountCombo))).toLocaleString()}{' '}
                  đ
                </td>
                <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  -
                  {(
                    combo?.amount * (100 / (100 - combo?.idCombo?.discountCombo)) -
                    combo?.amount
                  ).toLocaleString()}{' '}
                  đ
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-red-500 font-bold">
                  {combo?.amount.toLocaleString()} đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-base mt-2 text-right font-bold">
        <span className="text-red-500">Tổng cộng:</span>{' '}
        {(order?.total - order?.ship).toLocaleString()} đ
      </div>
    </div>
  );
};

OrderFoodPopup.propTypes = {
  order: PropTypes.object,
};

export default OrderFoodPopup;
