import { selectLoginUser } from '../../features/Login/loginSlice';
import React from 'react';
import { useSelector } from 'react-redux';
import ProfileForm from './components/ProfileForm';

const Profile = () => {
  const user = useSelector(selectLoginUser);

  const handleUpdateProfile = (formValues) => {
    try {
      console.log(formValues);
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 9 ~ handleUpdateProfile ~ error', error);
    }
  };
  return (
    <div className="px-5 mx-auto sm:px-10 md:px-16 bg-coolGray-100 text-coolGray-800">
      <div className="flex flex-col max-w-5xl mx-auto overflow-hidden rounded-xl">
        <img
          src="https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          className="w-full h-40 sm:h-60 bg-coolGray-500 object-cover"
        />
        <div className="p-6 pb-12 m-4 mx-auto -mt-16 space-y-6 lg:max-w-4xl sm:px-10 sm:mx-12 lg:rounded-xl shadow-lg bg-white">
          <div className="space-y-2 text-center">
            <span className="inline-block text-2xl font-semibold sm:text-3xl">{user?.name}</span>
            <div className="container flex flex-col w-full p-6 mx-auto divide-y rounded-md divide-coolGray-300 bg-coolGray-50 text-coolGray-800">
              <div className="flex justify-between p-4">
                <div className="flex space-x-4">
                  <div>
                    <img
                      src={`https://i.pravatar.cc/300?u=${user?.name}`}
                      alt
                      className="object-cover w-12 h-12 rounded-full bg-coolGray-500"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{user?.owner?.fullName}</h4>
                    <span className="text-xs text-coolGray-600">
                      {user?.location?.street}, {user?.location?.ward}, {user?.location?.district},
                      {user?.location?.city}.
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-yellow-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M494,198.671a40.536,40.536,0,0,0-32.174-27.592L345.917,152.242,292.185,47.828a40.7,40.7,0,0,0-72.37,0L166.083,152.242,50.176,171.079a40.7,40.7,0,0,0-22.364,68.827l82.7,83.368-17.9,116.055a40.672,40.672,0,0,0,58.548,42.538L256,428.977l104.843,52.89a40.69,40.69,0,0,0,58.548-42.538l-17.9-116.055,82.7-83.368A40.538,40.538,0,0,0,494,198.671Zm-32.53,18.7L367.4,312.2l20.364,132.01a8.671,8.671,0,0,1-12.509,9.088L256,393.136,136.744,453.3a8.671,8.671,0,0,1-12.509-9.088L144.6,312.2,50.531,217.37a8.7,8.7,0,0,1,4.778-14.706L187.15,181.238,248.269,62.471a8.694,8.694,0,0,1,15.462,0L324.85,181.238l131.841,21.426A8.7,8.7,0,0,1,461.469,217.37Z" />
                  </svg>
                  <span className="text-xl font-bold">4.5</span>
                </div>
              </div>
              <div className="p-4 grid grid-cols-2 space-y-2 text-sm text-coolGray-600">
                <div className="h-full space-y-2 w-60 bg-coolGray-50 text-coolGray-800">
                  <div className="divide-y divide-coolGray-300">
                    <ul className="pt-2 pb-4 space-y-1 text-sm">
                      <li className="bg-coolGray-100 text-coolGray-900">
                        <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
                          <ion-icon name="storefront-outline"></ion-icon>
                          <span>Giờ mở cửa:</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
                          <ion-icon name="close-circle-outline"></ion-icon>
                          <span>Giờ đóng cửa:</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
                          <ion-icon name="call-outline"></ion-icon>
                          <span>Điện thoại:</span>
                        </a>
                      </li>
                      <li>
                        <a href="#" className="flex items-center p-2 space-x-3 rounded-md">
                          <ion-icon name="accessibility-outline"></ion-icon>
                          <span>Ngày sinh:</span>
                        </a>
                      </li>
                      <li>
                        <a href className="flex items-center p-2 space-x-3 rounded-md">
                          <ion-icon name="id-card-outline"></ion-icon>
                          <span>CMND:</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div>
                  <ProfileForm user={user} onUpdateProfile={handleUpdateProfile} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
