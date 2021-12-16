import { Alert } from '@mui/material';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import foodApi from '../../../apis/foodApi';

const RestorePopup = ({ onClose }) => {
  const [foodRestoreList, setFoodRestoreList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await foodApi.getFoodRestore();
        setFoodRestoreList(res.data.food);
      } catch (error) {
        console.log('🚀 ~ file: RestorePopup.jsx ~ line 12 ~ error', error);
      }
    })();
  }, []);

  const handleRestoreFood = async (foodId) => {
    try {
      await foodApi.updateFoodRestore(foodId);
      onClose();
      Swal.fire('Success!', 'Bạn đã khôi phục món ăn thành công.', 'success');
      window.location.reload();
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 41 ~ handleRemoveMenu ~ error', error);
    }
  };

  return (
    <div>
      <div className="mb-6 text-3xl font-light text-center text-indigo-800 dark:text-white">
        Lịch sử đã xoá
        <ion-icon name="trash-outline"></ion-icon>
      </div>
      {foodRestoreList.length === 0 && (
        <Alert variant="standard" severity="info">
          Không có món ăn nào trong lịch sử!
        </Alert>
      )}
      {foodRestoreList.length !== 0 && (
        <table className="divide-y divide-gray-200 w-full">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Hình ảnh
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tên món ăn
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Mô tả
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Giá
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Remove</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {foodRestoreList.map((food) => (
              <tr key={food._id}>
                <td className="px-6 py-4  max-w-xs">
                  <div className="text-sm capitalize text-gray-900">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-14 w-14">
                        <img className="h-14 w-14 rounded-full object-cover" src={food.photo} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4  max-w-xs">
                  <div className="text-sm capitalize text-gray-900">{food.name}</div>
                </td>
                <td className="px-6 py-4  max-w-xs">
                  <div className="text-sm capitalize text-gray-900 text-justify">
                    {food.description}
                  </div>
                </td>
                <td className="px-6 py-4  max-w-xs">
                  <div className="text-sm capitalize text-green-500">
                    {food.price.toLocaleString()}đ
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                  <a
                    onClick={() => {
                      handleRestoreFood(food._id);
                    }}
                    className="text-blue-600  hover:text-blue-900 text-xl"
                  >
                    <ion-icon name="refresh-outline"></ion-icon>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RestorePopup;
