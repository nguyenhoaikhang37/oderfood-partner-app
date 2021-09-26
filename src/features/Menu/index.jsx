import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MenuTable from './components/MenuTable';
import { fetchMenuList, selectMenuList } from './menuSlice';

const Menu = () => {
  const dispatch = useDispatch();
  const menuList = useSelector(selectMenuList);
  //Menu by res
  const menuListByRes = menuList.filter((menu) => menu.restaurant == '61454e9d3456f3c4aceacea0');

  React.useEffect(() => {
    dispatch(fetchMenuList());
  }, []);

  return (
    <div>
      <button
        type="button"
        className="py-2 px-4 flex justify-center items-center  bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full mb-4"
      >
        <ion-icon name="add-circle-outline"></ion-icon>
        &nbsp; Thêm menu
      </button>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-min sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <MenuTable menuList={menuListByRes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
