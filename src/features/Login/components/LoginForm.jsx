import { yupResolver } from '@hookform/resolvers/yup';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Alert } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { InputField } from '../../../components/FormFields/index';

const schema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('Số điện thoại không được bỏ trống!')
    .matches(/^[0-9\-\+]{9,15}$/, 'Số điện thoại không đúng định dạng!'),
  password: yup
    .string()
    .required('Mật khẩu không được bỏ trống!')
    .max(20, 'Mật khẩu chứa nhiều nhất 20 kí tự!'),
});

const LoginForm = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const [error, setError] = useState('');

  const handleFormSubmit = async (formValues) => {
    try {
      setError('');
      await onSubmit?.(formValues);
      toast.success('Đăng nhập thành công!');
      history.push('/');
    } catch (error) {
      setError('Số điện thoại hoặc mật khẩu không chính xác!');
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Đăng nhập
      </Typography>
      <Box component="form" onSubmit={handleSubmit(handleFormSubmit)} noValidate sx={{ mt: 1 }}>
        <InputField name="phoneNumber" control={control} label="Số điện thoại" />
        <InputField name="password" type="password" control={control} label="Mật khẩu" />

        {error && (
          <Alert variant="standard" severity="error">
            {error}
          </Alert>
        )}
        <Button type="submit" fullWidth color="secondary" variant="contained" sx={{ mt: 3, mb: 2 }}>
          <span style={{ color: '#fff' }}>Đăng nhập</span>
        </Button>
      </Box>
    </Box>
  );
};

export default memo(LoginForm);
