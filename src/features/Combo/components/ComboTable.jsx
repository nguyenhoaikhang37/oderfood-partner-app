import PropTypes from 'prop-types';
import { Alert } from '@mui/material';

const ComboTable = ({ comboList, onDeleteCombo }) => {
  return (
    <>
      {comboList.length !== 0 ? (
        <table className="divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tên combo món ăn
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Các món ăn trong combo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                % khuyến mãi combo
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Đơn giá
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Thành tiền
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit and Remove</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {comboList?.map((combo) => (
              <tr key={combo._id}>
                <td className="px-6 py-4 ">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-14 w-14">
                      <img className="h-14 w-14 rounded-full object-cover" src={combo?.photo} />
                    </div>
                    <div className="ml-4 max-w-max-w-so-small">
                      <div className="text-sm capitalize font-medium text-gray-900">
                        {combo?.nameCombo}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4  max-w-xs">
                  <div className="text-sm capitalize text-gray-900 combo-content food-scroll pr-2">
                    {combo?.comboDetails.map((food) => (
                      <div key={food._id} className="flex space-x-2 my-2 items-center ">
                        <img
                          className="h-10 w-10 rounded-full object-cover"
                          src={food.idFood.photo}
                        />
                        <label className="text-gray-900 text-sm cursor-pointer">
                          {food.idFood.name}
                        </label>
                        <ion-icon name="close-outline"></ion-icon> {food.quanlity}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4  max-w-xs">
                  <div className="text-sm text-right capitalize text-green-500">
                    {combo?.discountCombo}
                  </div>
                </td>
                <td className="px-6 py-4  max-w-xs">
                  <div className="text-sm text-right capitalize text-yellow-600">
                    {combo?.total}
                  </div>
                </td>
                <td className="px-6 py-4  max-w-xs">
                  <div className="text-sm text-right capitalize text-blue-500">
                    {combo?.lastPrice}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                  <a
                    onClick={() => {
                      onDeleteCombo(combo?._id);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit <ion-icon name="create-outline"></ion-icon>
                  </a>
                  <a
                    onClick={() => {
                      onDeleteCombo(combo?._id);
                    }}
                    className="text-red-600  hover:text-red-900 ml-5"
                  >
                    Remove <ion-icon name="trash-outline"></ion-icon>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
          <Alert severity="error">Hiện tại chưa combo nào!</Alert>
        </table>
      ) : (
        <Alert severity="error">Hiện tại chưa combo nào!</Alert>
      )}
    </>
  );
};

ComboTable.propTypes = {
  comboList: PropTypes.array,
  onDeleteCombo: PropTypes.func,
};

export default ComboTable;
