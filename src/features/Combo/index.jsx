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
import Swal from 'sweetalert2';
import Loading from '../../components/Common/Loading';

const Combo = () => {
  const dispatch = useDispatch();
  // useSelector
  const comboList = useSelector(selectComboList);
  console.log(comboList);
  const loading = useSelector(selectComboLoading);
  // dialog
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setComboNeedUpdate(null);
  };
  //Menu options
  const user = useSelector(selectLoginUser);
  const menuOptions = useSelector(selectMenuOptions);
  const menuOptionsByRes = menuOptions?.filter((menu) => menu.restaurant == user?._id);
  // state
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [comboNeedUpdate, setComboNeedUpdate] = useState(null);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [error, setError] = useState('');

  // function
  const handleAddCombo = async (comboValues) => {
    const { formValues, foodChecked, image, valueStart, valueEnd } = comboValues;
    const formatFormValues = {
      ...formValues,
      photo: image,
      arrayFood: foodChecked,
      start: valueStart,
      end: valueEnd,
    };

    try {
      setLoadingAdd(true);
      setError('');
      const { data } = await comboApi.addCombo(formatFormValues);
      if (!data.success) {
        setLoadingAdd(false);
        setError(data.message);
        return;
      }
      dispatch(fetchComboList());
      setOpen(false);
      toast.success('Thêm combo món ăn thành công');
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 19 ~ handleAddCombo ~ error', error);
    }
    setLoadingAdd(false);
  };

  const handleDeleteCombo = (comboId) => {
    try {
      Swal.fire({
        title: 'Bạn muốn xoá combo này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#F87171',
        cancelButtonText: 'Huỷ',
        confirmButtonText: 'Có, tôi chắc chắn!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoadingDelete(true);
          await comboApi.deleteCombo(comboId);
          setLoadingDelete(false);
          Swal.fire('Deleted!', 'Bạn đã xoá combo thành công.', 'success');
          window.location.reload();
        }
      });
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 41 ~ handleRemoveMenu ~ error', error);
    }
  };

  const getUpdateCombo = (values) => {
    setComboNeedUpdate(values);
    setOpen(true);
  };

  const handleUpdateCombo = async ({ formValues, image, valueStart, valueEnd }) => {
    const formatFormValues = { ...formValues, photo: image };

    console.log(
      '🚀 ~ file: index.jsx ~ line 99 ~ handleUpdateCombo ~ formatFormValues',
      formatFormValues
    );
    try {
      await comboApi.updateCombo(formatFormValues);
      toast.success('Sửa combo thành công');
      dispatch(fetchComboList());
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
      {loadingDelete && <Loading />}
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
              {comboList && (
                <ComboTable
                  comboList={comboList}
                  onDeleteCombo={handleDeleteCombo}
                  getUpdateCombo={getUpdateCombo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <ComboForm
          loadingAdd={loadingAdd}
          error={error}
          menuOptions={menuOptionsByRes}
          onAddCombo={handleAddCombo}
          onUpdateCombo={handleUpdateCombo}
          comboNeedUpdate={comboNeedUpdate}
        />
      </Dialog>
    </div>
  );
};

export default Combo;
