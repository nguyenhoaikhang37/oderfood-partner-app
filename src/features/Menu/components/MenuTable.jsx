import React, { memo } from 'react';
import { Alert } from '@mui/material';

const MenuTable = ({ menuList, user, onRemoveMenu, onGetMenuById }) => {
  console.log('🚀 ~ file: MenuTable.jsx ~ line 5 ~ MenuTable ~ menuList', menuList);
  const handleDeleteMenu = (menuId) => {
    onRemoveMenu?.(menuId);
  };

  const handleGetMenuById = (menuId) => {
    onGetMenuById?.(menuId);
  };

  return (
    <>
      {menuList.filter((menu) => menu.restaurant == user?._id).length !== 0 && (
        <table className="divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Tên menu
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit and Remove</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {menuList
              .filter((menu) => menu.restaurant == user?._id)
              .map((menu) => (
                <tr key={menu._id}>
                  <td className="px-6 py-4  max-w-xs">
                    <div className="text-sm capitalize text-gray-900">{menu.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
                    <a
                      onClick={() => handleGetMenuById(menu)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Sửa <ion-icon name="create-outline"></ion-icon>
                    </a>
                    <a
                      onClick={() => handleDeleteMenu(menu._id)}
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
      {menuList.filter((menu) => menu.restaurant == user?._id).length === 0 && (
        <Alert severity="error">Hiện tại chưa combo nào!</Alert>
      )}
    </>
  );
};

export default memo(MenuTable);
