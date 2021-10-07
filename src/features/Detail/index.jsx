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
import { fetchChooseList, selectDetailList, selectDetailLoading } from './detailSlice';

export default function Detail() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  //Dialog
  const [open, setOpen] = useState(false);
  const [openTopping, setOpenTopping] = useState(false);
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
      setListChoose(res.data.listChoose);
    })();
  }, [detailList]);

  const handleOpen = (btn) => {
    setOpen(true);
    setAddBtn(btn);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenTopping = () => {
    setOpenTopping(true);
  };
  const handleCloseTopping = () => {
    setOpenTopping(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeChoose = async (id) => {
    setIdChoose(id);
    const res = await listChooseApi.getListChooseById(id);
    setListChoose(res.data.listChoose);
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
      setListChoose(res.data.listChoose);
      setOpenTopping(false);
    } catch (error) {
      console.log('Failed to add detail', error);
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ width: '100%', typography: 'body1', maxWidth: '900px' }}>
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
        <div style={{ textAlign: 'right', margin: '20px 0' }}>
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
        </div>
        <DetailTable listChoose={listChoose} />
        <Button
          onClick={handleOpenTopping}
          sx={{ margin: '10px 0' }}
          color="secondary"
          variant="outlined"
        >
          Thêm list đặc điểm <ion-icon name="add-outline"></ion-icon>
        </Button>
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DetailForm addBtn={addBtn} onAdd={handleAddDetail} />
      </Dialog>
      <Dialog open={openTopping} onClose={handleCloseTopping}>
        <DetailToppingForm onAdd={handleAddTopping} />
      </Dialog>
    </Box>
  );
}
