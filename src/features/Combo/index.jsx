import { LinearProgress } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import comboApi from '../../apis/comboApi';
import Dialog from '../../components/Common/Dialog';
import { selectLoginUser } from '../Login/loginSlice';
import { selectMenuOptions } from '../Menu/menuSlice';
import './Combo.css';
import { fetchComboList, selectComboList, selectComboLoading } from './comboSlice';
import ComboForm from './components/ComboForm';
import ComboTable from './components/ComboTable';

const Combo = () => {
  const dispatch = useDispatch();
  // useSelector
  const comboList = useSelector(selectComboList);
  const loading = useSelector(selectComboLoading);
  // dialog
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  //Menu options
  const user = useSelector(selectLoginUser);
  const menuOptions = useSelector(selectMenuOptions);
  const menuOptionsByRes = menuOptions?.filter((menu) => menu.restaurant == user?._id);

  // function
  const handleAddCombo = async (comboValues) => {
    const { formValues, foodChecked, image } = comboValues;
    const formatFormValues = { ...formValues, photo: image, arrayFood: foodChecked };
    try {
      await comboApi.addCombo(formatFormValues);
      dispatch(fetchComboList());
      setOpen(false);
      toast.success('Thêm combo món ăn thành công');
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 19 ~ handleAddCombo ~ error', error);
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
        &nbsp; Thêm combo món ăn
      </button>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-min sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <ComboTable comboList={comboList} />
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <ComboForm menuOptions={menuOptionsByRes} onAddCombo={handleAddCombo} />
      </Dialog>
    </div>
  );
};

export default Combo;
