const ImportFoodTable = () => {
  return (
    <table className="divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Tên món ăn và số lượng nhập
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Ngày nhập
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Edit and Remove</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        <tr>
          <td className="px-6 py-4  max-w-xs">
            <div className="text-sm capitalize text-gray-900 combo-content food-scroll pr-2">
              <div className="flex space-x-2 my-2 items-center ">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="http://res.cloudinary.com/mwg/image/upload/v1634794142/foods/aityt6fmleveagy0zwwh.jpg"
                />
                <label className="text-gray-900 text-sm cursor-pointer">mon 1</label>
                <ion-icon name="close-outline"></ion-icon> 2
              </div>
              <div className="flex space-x-2 my-2 items-center ">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="http://res.cloudinary.com/mwg/image/upload/v1634794142/foods/aityt6fmleveagy0zwwh.jpg"
                />
                <label className="text-gray-900 text-sm cursor-pointer">mon 1</label>
                <ion-icon name="close-outline"></ion-icon> 2
              </div>
              <div className="flex space-x-2 my-2 items-center ">
                <img
                  className="h-10 w-10 rounded-full object-cover"
                  src="http://res.cloudinary.com/mwg/image/upload/v1634794142/foods/aityt6fmleveagy0zwwh.jpg"
                />
                <label className="text-gray-900 text-sm cursor-pointer">mon 1</label>
                <ion-icon name="close-outline"></ion-icon> 2
              </div>
            </div>
          </td>
          <td className="px-6 py-4  max-w-xs"></td>
          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium cursor-pointer">
            <a className="text-indigo-600 hover:text-indigo-900">
              Edit <ion-icon name="create-outline"></ion-icon>
            </a>
            <a className="text-red-600  hover:text-red-900 ml-5">
              Remove <ion-icon name="trash-outline"></ion-icon>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ImportFoodTable;
