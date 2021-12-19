import Images from '../../constants/images';
import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Fragment>
      <div className="flex items-center justify-center pt-6">
        <img className="w-24 h-24 cursor-pointer object-cover" src={Images.LOGO} alt="logo" />
      </div>
      <nav className="mt-6">
        <div>
          {/* text-indigo-500 bg-gradient-to-r from-white to-indigo-100 border-r-4 border-indigo-500 dark:from-gray-700 dark:to-gray-800 border-r-4 border-indigo-500 */}
          <NavLink
            className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-indigo-500"
            to="/admin/profile"
            activeClassName="text-indigo-500 bg-gradient-to-r from-white to-indigo-100 border-r-4 border-indigo-500 dark:from-gray-700 dark:to-gray-800 border-r-4 border-indigo-500"
          >
            <span className="text-left">
              <svg
                width={20}
                height={20}
                fill="currentColor"
                className="m-auto"
                viewBox="0 0 2048 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"></path>
              </svg>
            </span>
            <span className="mx-4 text-sm font-normal">Quản lí thông tin</span>
          </NavLink>

          <NavLink
            className={`w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-indigo-500`}
            to="/admin/menu"
            activeClassName="text-indigo-500 bg-gradient-to-r from-white to-indigo-100 border-r-4 border-indigo-500 dark:from-gray-700 dark:to-gray-800 border-r-4 border-indigo-500"
          >
            <span className="text-left text-xl">
              <ion-icon name="book-outline"></ion-icon>
            </span>
            <span className="mx-4 text-sm font-normal">Menu</span>
          </NavLink>
          <NavLink
            className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-indigo-500"
            to="/admin/detail"
            activeClassName="text-indigo-500 bg-gradient-to-r from-white to-indigo-100 border-r-4 border-indigo-500 dark:from-gray-700 dark:to-gray-800 border-r-4 border-indigo-500"
          >
            <span className="text-left text-xl">
              <ion-icon name="funnel-outline"></ion-icon>
            </span>
            <span className="mx-4 text-sm font-normal">Đặc điểm món ăn</span>
          </NavLink>
          <NavLink
            className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-indigo-500"
            to="/admin/food"
            activeClassName="text-indigo-500 bg-gradient-to-r from-white to-indigo-100 border-r-4 border-indigo-500 dark:from-gray-700 dark:to-gray-800 border-r-4 border-indigo-500"
          >
            <span className="text-left text-xl">
              <ion-icon name="fast-food-outline"></ion-icon>
            </span>
            <span className="mx-4 text-sm font-normal">Món ăn</span>
          </NavLink>
          <NavLink
            className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-indigo-500"
            to="/admin/combo"
            activeClassName="text-indigo-500 bg-gradient-to-r from-white to-indigo-100 border-r-4 border-indigo-500 dark:from-gray-700 dark:to-gray-800 border-r-4 border-indigo-500"
          >
            <span className="text-left text-xl">
              <ion-icon name="basket-outline"></ion-icon>
            </span>
            <span className="mx-4 text-sm font-normal">Combo món ăn</span>
          </NavLink>

          <NavLink
            className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-indigo-500"
            to="/admin/discount"
            activeClassName="text-indigo-500 bg-gradient-to-r from-white to-indigo-100 border-r-4 border-indigo-500 dark:from-gray-700 dark:to-gray-800 border-r-4 border-indigo-500"
          >
            <span className="text-left text-xl">
              <ion-icon name="qr-code-outline"></ion-icon>
            </span>
            <span className="mx-4 text-sm font-normal">Khuyến mãi</span>
          </NavLink>
          <NavLink
            className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-indigo-500"
            to="/admin/order"
            activeClassName="text-indigo-500 bg-gradient-to-r from-white to-indigo-100 border-r-4 border-indigo-500 dark:from-gray-700 dark:to-gray-800 border-r-4 border-indigo-500"
          >
            <span className="text-left text-xl">
              <ion-icon name="checkmark-done-circle-outline"></ion-icon>
            </span>
            <span className="mx-4 text-sm font-normal">Xác nhận đơn hàng</span>
          </NavLink>
          <NavLink
            className="w-full font-thin uppercase text-gray-500 dark:text-gray-200 flex items-center p-4 my-2 transition-colors duration-200 justify-start hover:text-indigo-500"
            to="/admin/income"
            activeClassName="text-indigo-500 bg-gradient-to-r from-white to-indigo-100 border-r-4 border-indigo-500 dark:from-gray-700 dark:to-gray-800 border-r-4 border-indigo-500"
          >
            <span className="text-left text-xl">
              <ion-icon name="cellular-outline"></ion-icon>
            </span>
            <span className="mx-4 text-sm font-normal">Doanh thu cửa hàng</span>
          </NavLink>
        </div>
      </nav>
    </Fragment>
  );
};

export default Sidebar;
