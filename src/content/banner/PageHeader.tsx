import { Typography, Button, Grid, Tooltip } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { toCapitalize } from 'src/utils/string-function';
import React from 'react';
import { IBannerType } from 'src/models/banner.model';
import { IBannerForm } from './BannerForm';

export interface IBannePageHeaderProps {
  title: IBannerType;
  hasCreate?: boolean;
  handleOpenModalForm?: ({ slug: IBannerType }) => void;
}

function PageHeader(props: IBannePageHeaderProps) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {toCapitalize(props.title)} Banner
        </Typography>
      </Grid>
      {!!props.hasCreate && (
        <Grid item>
          <Tooltip title="Create" arrow>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              onClick={() =>
                props.handleOpenModalForm({ slug: `${props.title}-banner` })
              }
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Create {toCapitalize(props.title)} Banner
            </Button>
          </Tooltip>
        </Grid>
      )}
    </Grid>
  );
}

export default React.memo(PageHeader);
