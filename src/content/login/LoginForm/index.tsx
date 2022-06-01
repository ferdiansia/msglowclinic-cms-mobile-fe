import {
  EmailTwoTone,
  VisibilityOffTwoTone,
  VisibilityTwoTone,
  VpnKeyTwoTone
} from '@mui/icons-material';
import { NavLink as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField
} from '@mui/material';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ILoginFormData } from 'src/models/login-form-data.model';

function LoginForm() {
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<ILoginFormData>();

  const onSubmit: SubmitHandler<ILoginFormData> = (data) => {
    console.log(data);
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="email"
                    placeholder="Email"
                    fullWidth
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
              <Button
                type="button"
                component={RouterLink}
                to={'/dashboards'}
                fullWidth
                variant="contained"
              >
                Login
              </Button>
            </Box>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginForm;
