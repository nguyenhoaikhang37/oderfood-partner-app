import Box from '@mui/material/Box';
import { useState } from 'react';
import Toppings from './Toppings';

const DetailForm = ({ toppings, setToppings, setOpen }) => {
  return (
    <Box sx={{ mt: 1 }}>
      <Toppings toppings={toppings} setToppings={setToppings} />
      {toppings.length > 0 && (
        <button
          onClick={() => setOpen(false)}
          type="submit"
          className="py-2 px-4 my-10 bg-indigo-600 w-full hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Xác nhận
        </button>
      )}
    </Box>
  );
};

export default DetailForm;
