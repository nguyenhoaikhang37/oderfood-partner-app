import { InputField } from '../../../components/FormFields';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import { Fragment, memo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Tên đặc điểm không được bỏ trống!'),
});

const DetailForm = ({ addBtn, chooseIdUpdate, onAdd, onUpdate }) => {
  const { control, handleSubmit } = useForm({
    defaultValues: chooseIdUpdate,
    resolver: yupResolver(schema),
  });

  const handleDetailSubmit = (formValues) => {
    if (chooseIdUpdate) {
      onUpdate?.(formValues);
      return;
    }
    onAdd?.(formValues);
  };

  return (
    <Fragment>
      <div className="mb-6 text-3xl font-light text-center text-indigo-800 dark:text-white">
        {chooseIdUpdate
          ? 'Sửa đặc điểm'
          : addBtn === 'themDacDiem'
          ? 'Thêm đặc điểm'
          : 'Thêm thành phần'}
        <ion-icon name="funnel-outline"></ion-icon>
      </div>
      <Box component="form" onSubmit={handleSubmit(handleDetailSubmit)} noValidate sx={{ mt: 1 }}>
        <InputField name="name" control={control} label="Tên đặc điểm" />

        <button
          type="submit"
          className="py-2 px-4 mt-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          {chooseIdUpdate ? 'Sửa' : 'Thêm'}
        </button>
      </Box>
    </Fragment>
  );
};

export default DetailForm;
