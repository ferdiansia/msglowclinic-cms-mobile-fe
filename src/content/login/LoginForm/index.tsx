import { Container, Grid, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ILoginFormData } from 'src/models/login-form-data.model';

function LoginForm() {
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
            <Grid container>
              <Controller
                name="email"
                control={control}
                render={({ field }) => {
                  console.log(field);
                  return <TextField {...field} placeholder="Email" />;
                }}
              />
            </Grid>
            <Grid container mt={1}>
              <Controller
                name="password"
                control={control}
                render={({ field }) => {
                  console.log(field);
                  return <TextField {...field} placeholder="Password" />;
                }}
              />
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}

export default LoginForm;
