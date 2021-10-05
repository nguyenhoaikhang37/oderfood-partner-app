import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import userApi from '../../apis/userApi';
import { ACCESS_TOKEN } from '../../constants/global';
import * as React from 'react';
import LoginForm from './components/LoginForm';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

export default function Login() {
  const handleSubmit = async (formValues) => {
    const { data } = await userApi.dangNhap(formValues);
    localStorage.setItem(ACCESS_TOKEN, data.accessToken);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <LoginForm onSubmit={handleSubmit} />
      </Container>
    </ThemeProvider>
  );
}
