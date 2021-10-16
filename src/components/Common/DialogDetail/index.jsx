import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import * as React from 'react';
import DetailForm from './UI/DetailForm';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 550,
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

export default function DialogDetail({ toppings, setToppings }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <ion-icon name="add-circle-outline"></ion-icon> Thêm đặc điểm món
      </Button>
      <Modal
        className="box-modal"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="mb-6 text-xl font-light text-center text-indigo-800 ">
            Thêm đặc điểm món ăn<ion-icon name="grid-outline"></ion-icon>
          </div>
          {/* <DetailForm /> */}
          <DetailForm setOpen={setOpen} toppings={toppings} setToppings={setToppings} />
        </Box>
      </Modal>
    </div>
  );
}
