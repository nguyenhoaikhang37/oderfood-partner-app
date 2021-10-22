import { InputField } from '../../../components/FormFields';
import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import { Fragment, memo } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Tên đặc điểm không được bỏ trống!'),
  price: yup
    .number()
    .required('Giá chi tiết không được để trống')
    .integer('Trường này phải là một số nguyên')
    .typeError('Trường này phải là một số'),
});

const DetailToppingForm = ({ onAdd }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const handleDetailSubmit = (formValues) => {
    onAdd?.(formValues);
  };
  return (
    <Fragment>
      <div className="mb-6 text-3xl font-light text-center text-indigo-800 dark:text-white">
        Thêm chi tiết đặc điểm
        <ion-icon name="list-circle-outline"></ion-icon>
      </div>
      <Box component="form" onSubmit={handleSubmit(handleDetailSubmit)} noValidate sx={{ mt: 1 }}>
        <div className="grid max-w-xl grid-cols-2 gap-2 m-auto">
          <div className="col-span-2 lg:col-span-1">
            <InputField name="name" control={control} label="Tên chi tiết đặc điểm" />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <InputField name="price" control={control} label="Giá chi tiết đặc điểm" />
          </div>
        </div>

        <button
          type="submit"
          className="py-2 px-4 mt-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Thêm
        </button>
      </Box>
    </Fragment>
  );
};

export default memo(DetailToppingForm);
