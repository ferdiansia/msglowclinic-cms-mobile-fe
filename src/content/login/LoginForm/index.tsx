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
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ILoginFormData } from 'src/models/login-form-data.model';
import { SchemaOf, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import env from 'react-dotenv';
import { AUTH } from 'src/const/api';
import { useNavigate } from 'react-router';
import { LoadingButton } from '@mui/lab';
import { useAlert } from 'react-alert';

const loginValidationSchema: SchemaOf<ILoginFormData> = object({
  email: string()
    .email('Format email tidak sesuai')
    .required('Email wajib diisi'),
  password: string().required('Password wajib diisi')
}).required();

function LoginForm() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const alert = useAlert();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ILoginFormData>({
    resolver: yupResolver(loginValidationSchema)
  });

  const onSubmit: SubmitHandler<ILoginFormData> = (data) => {
    setIsLoading(true);
    axios
      .post<{ token: string }>(`${env.API_URL}/${AUTH}/login`, null, {
        params: { ...data }
      })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          navigate('/dashboards/home');
        } else {
          throw new Error('Masalah tidak terduga');
        }
      })
      .catch((err) => {
        alert.show(err.response.data.message || 'Masalah tidak terduga');
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      });
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
                defaultValue=""
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
                defaultValue=""
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
                loading={isLoading}
                fullWidth
                variant="contained"
                disabled={isLoading}
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
