import React, { ReactElement } from 'react';
import { Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useAppSelector, useAppDispatch } from 'redux/hooks';
import { clearSnackbar, selectToastState } from './toastSlice';

export default function Toast(): ReactElement {
  const { isOpen, status, message } = useAppSelector(selectToastState);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(clearSnackbar());
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={status}>
        {message}
      </Alert>
    </Snackbar>
  );
}
