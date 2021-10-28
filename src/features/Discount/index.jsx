import { LinearProgress } from '@mui/material';
import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../../components/Common/Dialog';
import DiscountForm from './components/DiscountForm';
import DiscountTable from './components/DiscountTable';
import { fetchDiscountList, selectDiscountList, selectDiscountLoading } from './discountSlice';
import './Discount.css';
import discountApi from '../../apis/discountApi';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import Loading from '../../components/Common/Loading';

const Discount = () => {
  const dispatch = useDispatch();
  // selector
  const loading = useSelector(selectDiscountLoading);
  const discountList = useSelector(selectDiscountList);
  // dialog
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  // variables
  const existFood = useMemo(() => {
    return discountList
      ?.map((discount) => discount.discountDetail)
      .flat()
      .map((item) => item.idFood);
  }, [discountList]);
  // state
  const [error, setError] = useState('');
  const [loadingDelete, setLoadingDelete] = useState(false);

 // function
  const handleAddDiscount = async (formValues) => {
    try {
      const { data } = await discountApi.addDiscount(formValues);
      if (!data.success) {
        setError(data.message);
        return;
      }

      Swal.fire('Deleted!', 'Bạn đã xoá khuyen mai thành công.', 'success');
      dispatch(fetchDiscountList());
      setOpen(false);
      toast.success('Thêm khuyến mãi thành công');
    } catch (error) {
      console.log('🚀 ~ file: DiscountForm.jsx ~ line 65 ~ handleDiscountSubmit ~ error', error);
    }
  };

  const handleDeleteDiscount = (discountId) => {
    try {
      Swal.fire({
        title: 'Bạn muốn xoá khuyến mãi này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#F87171',
        cancelButtonText: 'Huỷ',
        confirmButtonText: 'Có, tôi chắc chắn!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          setLoadingDelete(true);
          await discountApi.deleteDiscount(discountId);
          setLoadingDelete(false);
          Swal.fire('Deleted!', 'Bạn đã xoá khuyến mãi thành công.', 'success');
        }
        window.location.reload();
      });
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 41 ~ handleRemoveMenu ~ error', error);
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
        &nbsp; Thêm khuyến mãi
      </button>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-min sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <DiscountTable discountList={discountList} onDeleteDiscount={handleDeleteDiscount} />
            </div>
          </div>
        </div>
      </div>

      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DiscountForm error={error} existFood={existFood} onAddDiscount={handleAddDiscount} />
      </Dialog>
    </div>
  );
};

export default Discount;
