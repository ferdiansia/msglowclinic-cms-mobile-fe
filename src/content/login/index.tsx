import { styled } from '@mui/material/styles';
import { Box, Container, Card, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import Logo from 'src/components/Logo';
import LoginForm from './LoginForm';

const LoginWrapper = styled(Box)(
  () => `
      overflow: auto;
      flex: 1;
      overflow-x: hidden;
      align-items: center;
  `
);

const LogoDescWrapper = styled(Typography)(
  ({ theme }) => `
  color: ${theme.colors.primary.main}
    `
);

function Login() {
  return (
    <LoginWrapper>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <Container
        maxWidth="md"
        sx={{ textAlign: 'center' }}
        style={{ height: '100vh', display: 'flex' }}
      >
        <Grid
          spacing={{ xs: 6, md: 10 }}
          justifyContent="center"
          alignItems="center"
          container
        >
          <Grid item mx="auto">
            <Card sx={{ p: 10, mb: 10 }}>
              <Box
                display="flex"
                justifyContent="center"
                pb={6}
                flexDirection="column"
                alignItems="center"
              >
                <Logo />
                <LogoDescWrapper variant="h5">CMS FOR MOBILE</LogoDescWrapper>
              </Box>
              <LoginForm />
            </Card>
          </Grid>
        </Grid>
      </Container>
    </LoginWrapper>
  );
}

export default Login;
