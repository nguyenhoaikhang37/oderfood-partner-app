import { yupResolver } from '@hookform/resolvers/yup';
import Box from '@mui/material/Box';
import { InputField } from '../../../components/FormFields/InputField';
import React, { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().required('Tên menu không được bỏ trống!'),
});

const ProfileForm = ({ onUpdateProfile, user }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const handleUpdateProfile = (formValues) => {
    onUpdateProfile?.(formValues);
  };
  return (
    <Fragment>
      <Box component="form" onSubmit={handleSubmit(handleUpdateProfile)} noValidate>
        <InputField name="name" control={control} label="Tên menu" />
        <InputField name="name" control={control} label="Tên menu" />
        <InputField name="name" control={control} label="Tên menu" />
        <InputField name="name" control={control} label="Tên menu" />
        <InputField name="name" control={control} label="Tên menu" />
        <InputField name="name" control={control} label="Tên menu" />
        <InputField name="name" control={control} label="Tên menu" />

        <button
          type="submit"
          className="py-2 px-4 mt-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200  text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
        >
          Cập nhật
        </button>
      </Box>
    </Fragment>
  );
};

export default ProfileForm;
