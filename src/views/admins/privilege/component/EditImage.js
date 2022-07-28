import React from 'react';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Slide from '@mui/material/Slide';
import axios from 'axios';
import { SET_LOADING } from '../../../../store/actions';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function EditImage({ item, setValues, values }) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const onClickDeleteImage = async () => {
    const newImage = [];
    values.pvl_image.forEach((element) => {
      if (element !== item) {
        newImage.push(element);
      }
    });
    dispatch({ type: SET_LOADING, loading: true });
    await axios.delete(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/deleteImage/${item}`, {
      headers: {
        secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
        token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
      }
    });
    dispatch({ type: SET_LOADING, loading: false });
    setValues({ ...values, pvl_image: newImage });
  };
  return (
    <>
      <div>
        <Box
          bgColor="white"
          borderRadius="xl"
          shadow="lg"
          minHeight="10rem"
          sx={{
            overflow: 'hidden',
            transform: 'perspective(999px) rotateX(0deg) translate3d(0, 0, 0)',
            transformOrigin: '50% 0',
            backfaceVisibility: 'hidden',
            willChange: 'transform, box-shadow',
            transition: 'transform 200ms ease-out',

            '&:hover': {
              transform: 'perspective(999px) rotateX(7deg) translate3d(0px, -4px, 5px)'
            }
          }}
        >
          <Box position="absolute" top={0} right={0} zIndex={2} p={0}>
            <IconButton
              onClick={() => onClickDeleteImage()}
              color="primary"
              aria-label="upload picture"
              component="span"
              sx={{ m: 0, p: 0 }}
            >
              <Icon icon="typcn:delete" color="red" width="24" height="24" />
            </IconButton>
          </Box>
          <Box position="absolute" top={0} left={0} zIndex={2} p={0}>
            <IconButton
              onClick={() => setOpen(true)}
              color="primary"
              aria-label="upload picture"
              component="span"
              sx={{ m: 0, p: 0 }}
            >
              <Icon icon="fluent:search-visual-24-filled" color="#FFFFFF" width="24" height="24" />
            </IconButton>
          </Box>
          <Box
            component="img"
            src={`${process.env.REACT_APP_DRIVE_SELECT_IMAGE}${item}`}
            width="100%"
            my="auto"
          />
        </Box>
      </div>
      <Dialog
        maxWidth="sm"
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Box
              component="img"
              src={`${process.env.REACT_APP_DRIVE_SELECT_IMAGE}${item}`}
              width="100%"
              my="auto"
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            ออก
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

EditImage.propTypes = {
  item: PropTypes.string,
  values: PropTypes.object,
  setValues: PropTypes.func
};
