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
import { selectFoodList, selectFoodLoading } from './foodSlice';
import Swal from 'sweetalert2';

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
      window.location.reload();
      toast.success('Thêm món ăn thành công');
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
          await foodApi.deleteFood(foodId);

          Swal.fire('Deleted!', 'Bạn đã xoá món ăn thành công.', 'success');
          window.location.reload();
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
      window.location.reload();
      setOpen(false);
    } catch (error) {
      console.log('Failed to add menu', error);
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <div>
      <button
        onClick={handleOpen}
        type="button"
        className="py-2 px-4 flex justify-center items-center  bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full mb-4"
      >
        <ion-icon name="add-circle-outline"></ion-icon>
        &nbsp; Thêm món ăn
      </button>

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
    </div>
  );
};

export default Food;
