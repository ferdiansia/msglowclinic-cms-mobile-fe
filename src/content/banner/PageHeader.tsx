import { Typography, Button, Grid, Tooltip } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { toCapitalize } from 'src/utils/string-function';

function PageHeader(props) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {toCapitalize(props.title)} Banner
        </Typography>
      </Grid>
      <Grid item>
        <Tooltip title="Create" arrow>
          <Button
            sx={{ mt: { xs: 2, md: 0 } }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            Create {toCapitalize(props.title)} Banner
          </Button>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
