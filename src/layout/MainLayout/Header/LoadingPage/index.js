/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import catImage from '../../../../assets/images/gif/cat.gif';
import loadingImage from '../../../../assets/images/gif/loading3.gif';

import { SET_LOADING } from '../../../../store/actions';

export default function LoadingPage() {
  const dispatch = useDispatch();
  const valueLoading = useSelector((state) => state.customization.loading);
  return (
    <div>
      {/* <Button onClick={() => dispatch({ type: SET_LOADING, loading: true })}>1231321</Button> */}
      <Dialog aria-labelledby="customized-dialog-title" open={valueLoading}>
        <DialogContent dividers>
          <img src={catImage} frameBorder="0" allowFullScreen width="100%" height="120px" />
          <br />
          loading...
          <br />
          <img src={loadingImage} frameBorder="0" allowFullScreen width="100%" height="20px" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
