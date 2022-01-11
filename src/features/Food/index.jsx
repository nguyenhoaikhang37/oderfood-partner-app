import { LinearProgress } from '@mui/material';
import foodApi from '../../apis/foodApi';
import Dialog from '../../components/Common/Dialog';
import { selectLoginUser } from '../../features/Login/loginSlice';
import { fetchMenuList, selectMenuList, selectMenuOptions } from '../../features/Menu/menuSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import FoodForm from './components/FoodForm';
import FoodTable from './components/FoodTable';
import { fetchFoodList, selectFoodList, selectFoodLoading } from './foodSlice';
import Swal from 'sweetalert2';
import ImportFoodForm from '../ImportFood/components/ImportFoodForm';
import importFoodApi from '../../apis/importFoodApi';
import RestorePopup from './components/RestorePopup';

const Food = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoginUser);
  const menuList = useSelector(selectMenuList);
  const foodList = useSelector(selectFoodList);
  const loading = useSelector(selectFoodLoading);
  //Food & menu by res
  const foodListByRes = foodList?.filter((food) => food.restaurant == user?._id);
  const menuListByRes = menuList?.filter((menu) => menu.restaurant == user?._id);
  //Dialog
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFoodNeedUpdate(null);
  };
  //Dialog nhap them mon
  const [openImport, setOpenImport] = React.useState(false);
  const handleOpenImport = () => setOpenImport(true);
  const handleCloseImport = () => {
    setOpenImport(false);
  };
  //Dialog khoi phuc mon an
  const [openRestore, setOpenRestore] = React.useState(false);
  const handleOpenRestore = () => setOpenRestore(true);
  const handleCloseRestore = () => {
    setOpenRestore(false);
  };
  //Menu options
  const menuOptions = useSelector(selectMenuOptions);
  const menuOptionsByRes = menuOptions?.filter((menu) => menu.restaurant == user?._id);
  // State
  const [foodNeedUpdate, setFoodNeedUpdate] = useState(null);

  React.useEffect(() => {
    dispatch(fetchMenuList());
  }, []);

  const handleAddFoodSubmit = async (formValues) => {
    try {
      await foodApi.addFood(formValues);
      // window.location.reload();
      toast.success('Thêm món ăn thành công');
      dispatch(fetchFoodList(user?._id));
      setOpen(false);
    } catch (error) {
      console.log('Failed to add food', error);
    }
  };

  const handleDeleteFood = (foodId) => {
    try {
      Swal.fire({
        title: 'Bạn muốn xoá món ăn này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#F87171',
        cancelButtonText: 'Huỷ',
        confirmButtonText: 'Có, tôi chắc chắn!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await foodApi.updateFoodRestore(foodId);

          Swal.fire('Deleted!', 'Bạn đã xoá món ăn thành công.', 'success');
          dispatch(fetchFoodList(user?._id));
        }
      });
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 41 ~ handleRemoveMenu ~ error', error);
    }
  };

  const getUpdateFood = (values) => {
    setFoodNeedUpdate(values);
    setOpen(true);
  };

  const handleUpdateFood = async (formValues) => {
    try {
      await foodApi.updateFood(formValues);
      toast.success('Sửa món ăn thành công');
      dispatch(fetchFoodList(user?._id));

      setOpen(false);
    } catch (error) {
      console.log('Failed to add menu', error);
    }
  };

  const handleAddImportFood = async ({ quantity, checkedFood }) => {
    try {
      await importFoodApi.addImportFood({ quantity, arrayFood: checkedFood });
      setOpenImport(false);
      toast.success('Nhập hàng thành công');
      dispatch(fetchFoodList(user?._id));
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 23 ~ handleAddImportFood ~ error', error);
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <button
            onClick={handleOpen}
            type="button"
            className="py-2 px-4 flex justify-center items-center  bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full mb-4"
          >
            <ion-icon name="add-circle-outline"></ion-icon>
            &nbsp; Thêm món ăn
          </button>
          <button
            onClick={handleOpenImport}
            type="button"
            className="py-2 px-4 flex justify-center items-center  bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full mb-4"
          >
            <ion-icon name="bag-add-outline"></ion-icon>
            &nbsp; Thêm số lượng món
          </button>
        </div>
        <button
          onClick={handleOpenRestore}
          type="button"
          className="py-2 px-4 flex justify-center items-center  bg-red-400 hover:bg-red-500 focus:ring-red-400 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full mb-4"
        >
          <ion-icon name="trash-outline"></ion-icon>
          &nbsp; Khôi phục món ăn
        </button>
      </div>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <FoodTable
                onDeleteFood={handleDeleteFood}
                foodList={foodListByRes}
                menuList={menuListByRes}
                getUpdateFood={getUpdateFood}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <FoodForm
          onAddFoodSubmit={handleAddFoodSubmit}
          menuOptions={menuOptionsByRes}
          foodNeedUpdate={foodNeedUpdate}
          onUpdateFood={handleUpdateFood}
        />
      </Dialog>

      {/* Dialog them food */}
      <Dialog open={openImport} onClose={handleCloseImport}>
        <ImportFoodForm onAddImportFood={handleAddImportFood} foodList={foodList} />
      </Dialog>

      {/* Dialog khoi phuc food */}
      <Dialog open={openRestore} onClose={handleCloseRestore}>
        <RestorePopup isRestore onClose={handleCloseRestore} />
      </Dialog>
    </div>
  );
};

export default Food;
