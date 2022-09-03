import { Typography, Grid } from '@mui/material';
import { useAppSelector } from 'src/redux/store';

function PageHeader() {
  const { user } = useAppSelector((state) => state.users);
  return (
    <Grid container alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Selamat datang, {user?.name || ''}!
        </Typography>
        <Typography variant="subtitle2">
          Mulai hari dengan pikiran positif
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
