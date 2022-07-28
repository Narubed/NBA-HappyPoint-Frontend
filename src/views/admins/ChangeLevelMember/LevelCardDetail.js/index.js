import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import {
  Avatar,
  Box,
  Grid,
  Menu,
  MenuItem,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  IconButton
} from '@mui/material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import GetAppTwoToneIcon from '@mui/icons-material/GetAppOutlined';
import FileCopyTwoToneIcon from '@mui/icons-material/FileCopyOutlined';
import PictureAsPdfTwoToneIcon from '@mui/icons-material/PictureAsPdfOutlined';
import ArchiveTwoToneIcon from '@mui/icons-material/ArchiveOutlined';
// project imports
import MainCard from '../../../../ui-component/cards/MainCard';
import SkeletonEarningCard from '../../../../ui-component/cards/Skeleton/EarningCard';

// assets
import EarningIcon from '../../../../assets/images/icons/earning.svg';
import { SET_LOADING } from '../../../../store/actions';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const PartnerCard = ({ level }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [createValue, setCreateValue] = useState({
    levelName: level.lmb_name,
    levelPoint: level.lmb_point,
    levelMultiply: level.lmb_multiply
  });
  const theme = useTheme();
  const maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  const randColor = randomNumber.toString(16);
  const handleChange = (prop) => (event) => {
    setCreateValue({ ...createValue, [prop]: event.target.value });
  };
  const handleSubmit = async () => {
    setOpen(false);
    const data = {
      lmb_name: createValue.levelName,
      lmb_point: parseFloat(createValue.levelPoint).toFixed(3),
      lmb_multiply: parseFloat(createValue.levelMultiply).toFixed(3)
    };
    dispatch({ type: SET_LOADING, loading: true });
    await axios
      .put(
        `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/level_members/${level._id}`,
        data,
        {
          headers: {
            secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
            token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
          }
        }
      )
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'แก้ไขเลเวลของผู้ใช้เเล้ว',
          showConfirmButton: false,
          timer: 1500
        });
        setTimeout(() => {
          window.location.reload(false);
        }, 1500);
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'ไม่สามารถแก้ไขเลเวลใหม่ได้',
          showConfirmButton: false,
          timer: 1500
        });
      });
    dispatch({ type: SET_LOADING, loading: false });
  };
  const deleteCardLevel = async () => {
    setOpen(false);
    Swal.fire({
      title: 'Are you sure?',
      text: 'คุณต้องการลบเลเวลนี้ออกหรือไม่!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน!',
      cancelButtonText: 'ยกเลิก!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        dispatch({ type: SET_LOADING, loading: true });
        await axios
          .delete(
            `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/level_members/${level._id}`,
            {
              headers: {
                secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
                token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
              }
            }
          )
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'ลบเลเวลของผู้ใช้เเล้ว',
              showConfirmButton: false,
              timer: 1500
            });
            setTimeout(() => {
              window.location.reload(false);
            }, 1500);
          })
          .catch(() => {
            Swal.fire({
              icon: 'error',
              title: 'ไม่สามารถลบเลเวลใหม่ได้',
              showConfirmButton: false,
              timer: 1500
            });
          });
        dispatch({ type: SET_LOADING, loading: false });
      }
    });
  };
  return (
    <>
      <CardWrapper
        onClick={() => setOpen(true)}
        border={false}
        content={false}
        sx={{
          bgcolor: `#${randColor}`,
          p: 2.25,
          boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.25)',
          transition: 'all 0.5s',
          '&:hover': {
            boxShadow: '0px 6px 10px rgba(0, 0, 0, 0.4)',
            transform: 'scale(1.05)'
          }
        }}
      >
        <Box>
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      backgroundColor: theme.palette.secondary[800],
                      mt: 1
                    }}
                  >
                    <img src={EarningIcon} alt="Notification" />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.mediumAvatar,
                      backgroundColor: theme.palette.secondary.dark,
                      color: theme.palette.secondary[200],
                      zIndex: 1
                    }}
                    aria-controls="menu-earning-card"
                    aria-haspopup="true"
                    // onClick={handleClick}
                  >
                    <div style={{ fontSize: '12px' }}>x{level.lmb_multiply / 100}</div>
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography
                    sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}
                  >
                    ระดับ : {level.lmb_name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Icon icon="fa:user-circle-o" width="25" height="25" />
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <Typography
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: theme.palette.secondary[200]
                }}
              >
                <div style={{ textShadow: '0 0 3px #FF0000, 0 0 5px #0000FF' }}>
                  Point ที่ต้องใช้ : {level.lmb_point.toLocaleString()} Point
                </div>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        //
      >
        <DialogTitle>
          <div style={{ fontSize: '22px' }}>
            แก้ไขระดับของผู้ใช้
            <div
              style={{
                position: 'absolute',
                marginRight: '15px',
                right: '0'
              }}
            >
              <IconButton aria-label="delete" onClick={() => deleteCardLevel()}>
                <Icon icon="fluent:delete-32-regular" color="red" />
              </IconButton>
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <TextField
              value={createValue.levelName}
              onChange={handleChange('levelName')}
              color="secondary"
              autoFocus
              margin="dense"
              id="name"
              label="ชื่อระดับ"
              type="email"
              fullWidth
              variant="standard"
            />
          </DialogContentText>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={0}>
            <TextField
              value={createValue.levelPoint}
              onChange={handleChange('levelPoint')}
              sx={{ m: 2 }}
              color="secondary"
              margin="dense"
              id="name"
              label="Point ที่ต้องใช้"
              type="number"
              fullWidth
              variant="standard"
            />
            <TextField
              value={createValue.levelMultiply}
              onChange={handleChange('levelMultiply')}
              sx={{ m: 2 }}
              color="secondary"
              margin="dense"
              id="name"
              label="จำนวน point x จำนวนที่กรอก หาร 100"
              type="number"
              fullWidth
              variant="standard"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="outlined" onClick={() => setOpen(false)}>
            ออก
          </Button>
          <Button color="secondary" variant="outlined" onClick={() => handleSubmit()}>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

PartnerCard.propTypes = {
  level: PropTypes.object
  //   isLoading: PropTypes.bool
};

export default PartnerCard;
