import { Typography, Grid } from '@mui/material';
import React from 'react';

function PageHeader(props) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          About Us Form
        </Typography>
      </Grid>
    </Grid>
  );
}

export default React.memo(PageHeader);
