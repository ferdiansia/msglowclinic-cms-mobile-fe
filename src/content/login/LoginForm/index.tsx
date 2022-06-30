import {
  EmailTwoTone,
  VisibilityOffTwoTone,
  VisibilityTwoTone,
  VpnKeyTwoTone
} from '@mui/icons-material';
import {
  Box,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ILoginFormData } from 'src/models/login-form-data.model';
import { SchemaOf, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router';
import { LoadingButton } from '@mui/lab';
import { getAuthToken } from 'src/redux/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'src/redux/store';
import { useAlert } from 'react-alert';
import { HOME_ROUTE } from 'src/const/route-url';
import { unwrapResult } from '@reduxjs/toolkit';

const loginValidationSchema: SchemaOf<ILoginFormData> = object({
  email: string()
    .email('Format email tidak sesuai')
    .required('Email wajib diisi'),
  password: string().required('Password wajib diisi')
}).required();

function LoginForm() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const { loading } = useAppSelector((state) => state.auths);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginFormData>({
    resolver: yupResolver(loginValidationSchema)
  });

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate(`${HOME_ROUTE}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: ILoginFormData) => {
    try {
      const actionResult = await dispatch(getAuthToken(data));
      const result = unwrapResult(actionResult);
      if (result) {
        localStorage.setItem('token', result.token);
        navigate(`${HOME_ROUTE}`);
      }
    } catch (err) {
      alert.show(err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Grid
        spacing={{ xs: 6, md: 10 }}
        justifyContent="center"
        alignItems="center"
        container
      >
        <Grid item mx="auto">
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <Box>
              <Controller
                name="email"
                control={control}
                defaultValue="admin.mobile@msclinic.com"
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    placeholder="Email"
                    fullWidth
                    required
                    error={!!errors?.email}
                    helperText={errors.email?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <EmailTwoTone color="primary" />
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Box>
            <Box mt={1}>
              <Controller
                name="password"
                defaultValue="Pass1234"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type={isShowPassword ? 'text' : 'password'}
                    placeholder="Password"
                    fullWidth
                    required
                    error={!!errors?.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VpnKeyTwoTone color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            color="primary"
                            onClick={() => setIsShowPassword(!isShowPassword)}
                          >
                            {isShowPassword ? (
                              <VisibilityTwoTone />
                            ) : (
                              <VisibilityOffTwoTone />
                            )}
                          </IconButton>
                        </InputAdornment>
                      )
                    }}
                  />
                )}
              />
            </Box>
            <Box mt={1}>
              <LoadingButton
                type="submit"
                loading={loading}
                fullWidth
                variant="contained"
                disabled={loading}
              >
                Login
              </LoadingButton>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginForm;
