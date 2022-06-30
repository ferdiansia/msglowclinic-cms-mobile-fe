import { Typography, Button, Grid, Tooltip } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { toCapitalize } from 'src/utils/string-function';
import React from 'react';

export interface IItemsPageHeaderProps {
  title: string;
  hasCreate?: boolean;
  handleOpenModalForm?: () => void;
}

function PageHeader(props: IItemsPageHeaderProps) {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {toCapitalize(props.title)}
        </Typography>
      </Grid>
      {!!props.hasCreate && (
        <Grid item>
          <Tooltip title="Create" arrow>
            <Button
              sx={{ mt: { xs: 2, md: 0 } }}
              variant="contained"
              onClick={() => props.handleOpenModalForm()}
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Create {toCapitalize(props.title)}
            </Button>
          </Tooltip>
        </Grid>
      )}
    </Grid>
  );
}

export default React.memo(PageHeader);
