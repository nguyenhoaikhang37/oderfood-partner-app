import { Button, LinearProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import chooseApi from '../../apis/chooseApi';
import listChooseApi from '../../apis/listChooseApi';
import Dialog from '../../components/Common/Dialog';
import { selectLoginUser } from '../Login/loginSlice';
import DetailForm from './components/DetailForm';
import DetailTable from './components/DetailTable';
import DetailToppingForm from './components/DetailToppingForm';
import ListChooseForm from './components/ListChooseForm';
import { fetchChooseList, selectDetailList, selectDetailLoading } from './detailSlice';
import Swal from 'sweetalert2';

export default function Detail() {
  const dispatch = useDispatch();
  //State
  const [value, setValue] = useState(0);
  const [chooseIdUpdate, setChooseIdUpdate] = useState(null);
  const [listChooseUpdate, setListChooseUpdate] = useState(null);
  //Dialog
  const [open, setOpen] = useState(false);
  const [openTopping, setOpenTopping] = useState(false);
  //Selector
  const detailList = useSelector(selectDetailList);
  const loading = useSelector(selectDetailLoading);
  const user = useSelector(selectLoginUser);
  //Variables
  const [listChoose, setListChoose] = useState([]);
  const [addBtn, setAddBtn] = useState('');
  const [idChoose, setIdChoose] = useState('');

  useEffect(() => {
    (async () => {
      const res = await listChooseApi.getListChooseById(detailList[0]?._id);
      setValue(0);
      setListChoose(res.data?.listChoose);
      setIdChoose(res.data?.listChoose[0]?.choose);
    })();
  }, [detailList]);

  const handleOpen = (btn) => {
    setOpen(true);
    setAddBtn(btn);
  };
  const handleClose = () => {
    setOpen(false);
    setChooseIdUpdate(null);
  };

  const handleOpenTopping = () => {
    setOpenTopping(true);
  };

  const handleCloseTopping = () => {
    setOpenTopping(false);
    setListChooseUpdate(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeChoose = async (id) => {
    setIdChoose(id);
    const res = await listChooseApi.getListChooseById(id);
    setListChoose(res.data?.listChoose);
  };

  const handleAddDetail = async (formValues) => {
    try {
      const newFormValues =
        addBtn === 'themDacDiem'
          ? { ...formValues, choose: false }
          : { ...formValues, choose: true };
      await chooseApi.addChoose(newFormValues);
      toast.success('Thêm đặc điểm món thành công');
      dispatch(fetchChooseList(user._id));
      setOpen(false);
    } catch (error) {
      console.log('Failed to add detail', error);
    }
  };

  const handleAddTopping = async (formValues) => {
    try {
      const newFormValues = { ...formValues, choose: idChoose };
      await listChooseApi.addListChoose(newFormValues);
      toast.success('Thêm chi tiết đặc điểm món thành công');
      const res = await listChooseApi.getListChooseById(idChoose);
      setListChoose(res.data?.listChoose);
      setOpenTopping(false);
    } catch (error) {
      console.log('Failed to add detail', error);
    }
  };

  const handleDeleteListChoose = (listChooseId) => {
    try {
      Swal.fire({
        title: 'Bạn muốn xoá lựa chọn này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#F87171',
        cancelButtonText: 'Huỷ',
        confirmButtonText: 'Có, tôi chắc chắn!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await listChooseApi.deleteListChoose(listChooseId);

          Swal.fire('Deleted!', 'Bạn đã xoá chi tiết đặc điểm thành công.', 'success');
          const res = await listChooseApi.getListChooseById(idChoose);
          setListChoose(res.data?.listChoose);
          // dispatch(fetchChooseList());
        }
      });
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 41 ~ handleRemoveMenu ~ error', error);
    }
  };

  const handleRemoveChoose = () => {
    try {
      Swal.fire({
        title: 'Bạn muốn xoá lựa chọn này?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#10B981',
        cancelButtonColor: '#F87171',
        cancelButtonText: 'Huỷ',
        confirmButtonText: 'Có, tôi chắc chắn!',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { data } = await chooseApi.deleteChoose(idChoose);
          if (!data.success) {
            Swal.fire({
              icon: 'error',
              title: `${data.message}`,
            });
            return;
          }

          Swal.fire('Deleted!', 'Bạn đã xoá đặc điểm thành công.', 'success');
          dispatch(fetchChooseList(user._id));
          // dispatch(fetchChooseList());
        }
      });
    } catch (error) {
      console.log('🚀 ~ file: index.jsx ~ line 41 ~ handleRemoveMenu ~ error', error);
    }
  };

  const handleEditChoose = () => {
    setChooseIdUpdate(detailList.filter((detail) => detail._id === idChoose)[0]);
    setOpen(true);
  };

  const handleUpdateDetal = async (formValues) => {
    try {
      await chooseApi.updateChoose(formValues);
      toast.success('Sửa đặc điểm thành công');
      dispatch(fetchChooseList(user._id));
      setOpen(false);
    } catch (error) {
      console.log('Failed to update choose', error);
    }
  };

  const handlePopupListChoose = (listChoose) => {
    setListChooseUpdate(listChoose);
    setOpenTopping(true);
  };

  const handleUpdateListChoose = async (formValues) => {
    try {
      await listChooseApi.updateListChoose(formValues);
      toast.success('Sửa chi tiết đặc điểm thành công');
      dispatch(fetchChooseList(user._id));
      setOpenTopping(false);
      setOpen(false);
    } catch (error) {
      console.log('Failed to update choose', error);
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ width: '100%', maxWidth: '1000px', typography: 'body1', margin: '0 auto' }}>
      <div
        style={{
          margin: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
          }}
        >
          <button
            onClick={() => handleOpen('themThanhPhan')}
            type="button"
            className="py-2 px-4 flex justify-center items-center  bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full mb-4 mr-4"
          >
            <ion-icon name="add-circle-outline"></ion-icon>
            &nbsp; Thêm đặc điểm (Chọn ít)
          </button>
          <button
            onClick={() => handleOpen('themDacDiem')}
            type="button"
            className="py-2 px-4 flex justify-center items-center  bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full mb-4 mr-4"
          >
            <ion-icon name="add-circle-outline"></ion-icon>
            &nbsp; Thêm thành phần (Chọn nhiều)
          </button>
        </div>
        <div>
          <a
            onClick={handleEditChoose}
            className="text-blue-600 p-3 rounded-full cursor-pointer bg-blue-200 hover:text-indigo-900"
          >
            <ion-icon name="create-outline"></ion-icon>
          </a>
          <a
            onClick={handleRemoveChoose}
            className="text-red-600 p-3 rounded-full cursor-pointer bg-red-200  hover:text-red-900 ml-5"
          >
            <ion-icon name="trash-outline"></ion-icon>
          </a>
        </div>
      </div>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {detailList.map((detail) => (
            <Tab
              onClick={() => handleChangeChoose(detail._id)}
              key={detail._id}
              label={detail.name}
            />
          ))}
        </Tabs>

        {/* <div style={{ textAlign: 'right', margin: '20px 0' }}>
          <Button
            sx={{ margin: '0 10px' }}
            onClick={() => handleOpen('themDacDiem')}
            variant="outlined"
          >
            Thêm đặc điểm <ion-icon name="add-outline"></ion-icon>
          </Button>
          <Button onClick={() => handleOpen('themThanhPhan')} variant="contained">
            Thêm thành phần <ion-icon name="add-outline"></ion-icon>
          </Button>
        </div> */}
        <DetailTable
          onPopupListChoose={handlePopupListChoose}
          onDeleteChoose={handleDeleteListChoose}
          listChoose={listChoose}
        />
        <Button
          onClick={handleOpenTopping}
          sx={{ margin: '10px' }}
          color="secondary"
          variant="outlined"
        >
          Thêm list đặc điểm <ion-icon name="add-outline"></ion-icon>
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DetailForm
          addBtn={addBtn}
          chooseIdUpdate={chooseIdUpdate}
          onAdd={handleAddDetail}
          onUpdate={handleUpdateDetal}
        />
      </Dialog>
      <Dialog open={openTopping} onClose={handleCloseTopping}>
        <DetailToppingForm
          listChooseUpdate={listChooseUpdate}
          onAdd={handleAddTopping}
          onUpdate={handleUpdateListChoose}
        />
      </Dialog>
    </Box>
  );
}
