import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import { Fragment, memo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InputField } from '../../../components/FormFields/index';

const schema = yup.object().shape({
  name: yup.string().required('Tên menu không được bỏ trống!'),
});

const MenuForm = ({ menuById, onAddMenuSubmit, onUpdateMenu }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: menuById,
    resolver: yupResolver(schema),
  });

  const handleMenuSubmit = (formValues) => {
    if (menuById) {
      onUpdateMenu?.(formValues);
      return;
    }
    onAddMenuSubmit?.(formValues);
  };

  return (
    <Fragment>
      <div className="mb-6 text-3xl font-light text-center text-indigo-800 dark:text-white">
        {menuById ? 'Sửa menu' : 'Thêm menu'} <ion-icon name="book-outline"></ion-icon>
      </div>
      <Box component="form" onSubmit={handleSubmit(handleMenuSubmit)} noValidate sx={{ mt: 1 }}>
        <InputField name="name" control={control} label="Tên menu" />

        <button
          type="submit"
          className="py-2 px-4 mt-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          {menuById ? 'Sửa' : 'Thêm'}
        </button>
      </Box>
    </Fragment>
  );
};

export default memo(MenuForm);
