import { LoadingButton } from '@mui/lab';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import React from 'react';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';

export interface IModalDeleteProps {
  open: boolean;
  handleClose: () => void;
  title: string;
  content: string;
  onClick: () => void;
  loading: boolean;
}

function ModalDelete(props: IModalDeleteProps) {
  console.log("ModalDelete")
  return (
    <Dialog
      open={props.open}
      onClose={() => props.handleClose()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {props.content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ width: 100 }}
          disabled={props.loading}
          onClick={() => props.handleClose()}
        >
          Tidak
        </Button>
        <LoadingButton
          variant="contained"
          sx={{ width: 100 }}
          loading={props.loading}
          disabled={props.loading}
          onClick={props.onClick}
          color="error"
          startIcon={<DeleteForeverTwoToneIcon fontSize="small" />}
          autoFocus
        >
          Hapus
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default React.memo(ModalDelete);
