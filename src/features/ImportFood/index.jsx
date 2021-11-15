import React, { useState } from 'react';
import Dialog from '../../components/Common/Dialog';
import ImportFoodForm from './components/ImportFoodForm';
import ImportFoodTable from './components/ImportFoodTable';

const ImportFood = () => {
  // dialog
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleOpen}
        type="button"
        className="py-2 px-4 flex justify-center items-center  bg-indigo-500 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full mb-4"
      >
        <ion-icon name="bag-add-outline"></ion-icon>
        &nbsp; Nhập thêm món
      </button>
      <ImportFoodTable />
      {/* Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <ImportFoodForm />
      </Dialog>
    </div>
  );
};

export default ImportFood;
