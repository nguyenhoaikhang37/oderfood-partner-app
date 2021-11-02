import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
  p: 4,
};

export default function Dialog({ open, onClose, children }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          className={
            (children.props.onAddFoodSubmit ||
              children.props.onAddCombo ||
              children.props.onAddDiscount) &&
            'dialog-food'
          }
          sx={style}
        >
          {children}
        </Box>
      </Modal>
    </div>
  );
}
