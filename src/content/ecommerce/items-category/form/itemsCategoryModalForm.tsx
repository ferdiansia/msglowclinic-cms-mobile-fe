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
import ItemsGroupForm from './itemsCategoryForm';

export interface IItemsCategoryModalFormProps {
  open: boolean;
  handleClose: () => void;
  onSubmit: (formData: any) => void;
  defaultValue: any;
  loading: boolean;
}
function ItemsCategoryModalForm(props: IItemsCategoryModalFormProps) {
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
          Items Category Cover
        </Typography>
      </DialogTitle>
      <DialogContent style={{ height: '80vh' }}>
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
          form="item-category-form"
          variant="contained"
          sx={{ width: 100 }}
        >
          Simpan
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(ItemsCategoryModalForm);
