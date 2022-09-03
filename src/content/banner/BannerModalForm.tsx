import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography
} from '@mui/material';
import React from 'react';
import { IBannerType } from 'src/models/banner.model';
import BannerForm, { IBannerForm } from './BannerForm';

export interface IBannerModalFormProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (formData: IBannerForm) => void;
  defaultValue: IBannerForm | { slug: IBannerType };
  loading: boolean;
}
function BannerModalForm(props: IBannerModalFormProps) {
  return (
    <Dialog
      disableEscapeKeyDown={true}
      open={props.open}
      fullWidth
      maxWidth="sm"
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>
        <Typography variant="h3" gutterBottom>
          Form Banner
        </Typography>
      </DialogTitle>
      <DialogContent>
        <BannerForm
          onSubmit={props.onSubmit}
          defaultValue={props.defaultValue}
        ></BannerForm>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={props.handleClose}
          variant="contained"
          color="error"
          disabled={!!props.loading}
          sx={{ width: 100 }}
        >
          Batal
        </Button>
        <LoadingButton
          type="submit"
          loading={!!props.loading}
          disabled={!!props.loading}
          form="banner-form"
          variant="contained"
          sx={{ width: 100 }}
        >
          Simpan
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(BannerModalForm);
