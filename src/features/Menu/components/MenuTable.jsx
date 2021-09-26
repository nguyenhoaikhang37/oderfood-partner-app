import React from 'react';

const MenuTable = ({ menuList }) => {
  return (
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
        {menuList.map((menu) => (
          <tr key={menu._id}>
            <td className="px-6 py-4  max-w-xs">
              <div className="text-sm text-gray-900">{menu.name}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
              <a className="text-indigo-600 hover:text-indigo-900">
                Edit <ion-icon name="create-outline"></ion-icon>
              </a>
              <a className="text-red-600  hover:text-red-900 ml-5">
                Remove <ion-icon name="trash-outline"></ion-icon>
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MenuTable;
