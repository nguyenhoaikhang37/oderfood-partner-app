import React, { memo } from 'react';
import { getColorQuantity } from '../../../utils/common';

const FoodTable = ({ foodList, menuList, onDeleteFood }) => {
  const handleDeteleFood = (foodId) => {
    onDeleteFood?.(foodId);
  };
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
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
            Trong menu
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Mô tả
          </th>
          {/* <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Đặc điểm món ăn
          </th> */}
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Giá
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Số lượng
          </th>

          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Edit and Remove</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {foodList?.map((food) => (
          <tr key={food._id}>
            <td className="px-6 py-4 ">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-14 w-14">
                  <img className="h-14 w-14 rounded-full object-cover" src={food.photo} />
                </div>
                <div className="ml-4 max-w-max-w-so-small">
                  <div className="text-sm capitalize font-medium text-gray-900">{food.name}</div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4  max-w-xs">
              <div className="text-sm capitalize text-gray-900">
                {menuList.find((menu) => menu._id == food.menu)?.name}
              </div>
            </td>
            <td className="px-6 py-4  max-w-xs">
              <div className="text-sm text-gray-900">{food.description}</div>
            </td>
            {/* <td className="px-6 py-4  text-right whitespace-nowrap text-sm">
              {food.choose?.map((item, index) => (
                <p className="py-1" key={index}>
                  {item}
                </p>
              ))}
            </td> */}
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex  text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                {food.price.toLocaleString()} vnđ
              </span>
            </td>
            <td
              className={`${getColorQuantity(
                food.quantity
              )} px-6 py-4 text-right whitespace-nowrap text-sm`}
            >
              {food.quantity}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
              <a className="text-indigo-600 hover:text-indigo-900">
                Edit <ion-icon name="create-outline"></ion-icon>
              </a>
              <a
                onClick={() => {
                  handleDeteleFood(food._id);
                }}
                className="text-red-600  hover:text-red-900 ml-5"
              >
                Remove <ion-icon name="trash-outline"></ion-icon>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default memo(FoodTable);
