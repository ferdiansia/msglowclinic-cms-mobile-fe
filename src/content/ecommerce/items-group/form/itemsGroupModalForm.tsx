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
import ItemsGroupForm from './itemsGroupForm';

export interface IItemsGroupModalFormProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (formData: any) => void;
  defaultValue: any;
  loading: boolean;
}
function ItemsGroupModalForm(props: IItemsGroupModalFormProps) {
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
          Form Items Group
        </Typography>
      </DialogTitle>
      <DialogContent>
        <ItemsGroupForm
          onSubmit={props.onSubmit}
          defaultValue={props.defaultValue}
        ></ItemsGroupForm>
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

export default React.memo(ItemsGroupModalForm);
