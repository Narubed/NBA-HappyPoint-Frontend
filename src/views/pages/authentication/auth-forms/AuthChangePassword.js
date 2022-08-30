import * as React from 'react';
import Swal from 'sweetalert2';
// material
import OTPInput from 'otp-input-react';
import axios from 'axios';
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  Button,
  Slide,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  Dialog,
  Grid,
  Avatar,
  Typography,
  Paper,
  Alert
} from '@mui/material';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

function AuthChangePassword() {
  const [open, setOpen] = React.useState(false);
  const [openOTP, setOpenOTP] = React.useState(false);
  const [newOTP, setNewOTP] = React.useState(false);
  const [OTP, setOTP] = React.useState('');
  const [errorOTP, setERROROTP] = React.useState(false);
  const [isErrorPhone, setErrorPhone] = React.useState(false);
  const [isShowPassword, setShowPassword] = React.useState(false);
  const [mathRandom, setMathRandom] = React.useState();
  const [isPhone, setPhone] = React.useState('');
  const [isNewPassword, setNewPassword] = React.useState(' ');
  const [isMember, setMember] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClickClose = () => {
    setOpen(false);
    setShowPassword(false);
    setPhone('');
  };
  const handleSubmit = async () => {
    setOpen(false);
    requireNewOTP();
    setOpenOTP(true);
  };
  const showNewPassword = async () => {
    if (isPhone.length < 8) {
      setErrorPhone(true);
      setTimeout(() => {
        setErrorPhone(false);
      }, 3000);
    } else {
      const members = await axios(
        `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/phone/${isPhone}`
      );
      if (members && members.data.data.length === 0) {
        setErrorPhone(true);
        setTimeout(() => {
          setErrorPhone(false);
        }, 3000);
      } else {
        setMember(members.data.data);
        setShowPassword(true);
      }
    }
  };
  const requireNewOTP = () => {
    setOTP('');
    setNewOTP(false);
    const randomMath = Math.floor(Math.random() * (999999 - 100000) + 100000);
    setMathRandom(randomMath);
    const config = {
      method: 'post',
      url: 'https://portal-otp.smsmkt.com/api/send-message',
      headers: {
        'Content-Type': 'application/json',
        api_key: `${process.env.REACT_APP_OTP_API_KEY}`,
        secret_key: `${process.env.REACT_APP_OTP_SECRET_KEY}`
      },
      data: JSON.stringify({
        message: `รหัส OTP คือ ${randomMath} ใช้เพื่อลงทะเบียนแก้ไขรหัสผ่าน`,
        phone: isPhone,
        sender: `${process.env.REACT_APP_OTP_SENDER}`,
        expire: '10:00'
      })
    };

    axios(config);
  };

  const confirmOTP = async () => {
    if (OTP !== mathRandom.toString()) {
      setERROROTP(true);
      setOTP('');
      setTimeout(() => {
        setERROROTP(false);
      }, 3000);
    } else {
      setOpenOTP(false);
      const data = {
        member_password: isNewPassword
      };
      const headerConfig = {
        headers: {
          secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
          token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
        }
      };
      await axios.put(
        `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/${isMember[0]._id}`,
        data,
        headerConfig
      );
      Swal.fire({
        icon: 'success',
        html: '<p style="font-size: 20px">แก้ไขรหัสผ่านสำเร็จ</p>',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  return (
    <div>
      <Typography
        onClick={handleClickOpen}
        variant="subtitle1"
        color="secondary"
        sx={{ textDecoration: 'none', cursor: 'pointer' }}
      >
        ลืมรหัสผ่าน ?
      </Typography>
      <Dialog TransitionComponent={Transition} open={open} onClose={() => handleClickClose()}>
        <DialogTitle>ลืมรหัสผ่าน</DialogTitle>
        <DialogContent>
          <DialogContentText>
            กรุณากรอกเบอร์โทรศัพท์ที่ลงทะเบียนกับ Happy Point ด้วยเพื่อส่งเลขยืนยันตัวตน
            {isErrorPhone && <Alert severity="error">error - ไม่มีข้อมูลของหมายเลขนี้ !</Alert>}
            {isShowPassword && isNewPassword.length < 6 && (
              <Alert severity="info">รหัสผ่านใหม่ต้องมีมากกว่า 6 ตัว!</Alert>
            )}
          </DialogContentText>
          <TextField
            color="secondary"
            disabled={isShowPassword}
            autoFocus
            margin="dense"
            id="name"
            label="เบอร์โทรศัพท์"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setPhone(e.target.value)}
          />
          {isShowPassword && (
            <TextField
              color="secondary"
              autoFocus
              margin="dense"
              id="name"
              label="รหัสผ่านใหม่"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button color="error" variant="outlined" onClick={() => handleClickClose()}>
            ยกเลิก
          </Button>
          {isShowPassword ? (
            <Button
              color="secondary"
              variant="outlined"
              onClick={() => handleSubmit()}
              disabled={isNewPassword.length < 6}
            >
              ยืนยัน
            </Button>
          ) : (
            <Button color="secondary" variant="outlined" onClick={() => showNewPassword()}>
              เช็คหมายเลขโทรศัพท์
            </Button>
          )}
          {/* <Button color="secondary" variant="outlined" onClick={() => handleSubmit()}>
            ยืนยัน
          </Button> */}
        </DialogActions>
      </Dialog>
      <Dialog
        open={openOTP}
        TransitionComponent={Transition}
        keepMounted
        // onClose={() => setOpen(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <a style={{ fontSize: '150%' }}>ยืนยันตัวตัวผ่านรหัส OTP</a>
          {errorOTP && <Alert severity="error">error - กรุณากรอกใหม่อีกครั้ง!</Alert>}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <OTPInput
              value={OTP}
              onChange={setOTP}
              autoFocus
              OTPLength={6}
              otpType="number"
              disabled={false}
              secure={false}
              inputStyles={{
                color: 'purple',
                border: '15px',
                margin: '0px 5px 0px 0px',
                borderBottom: '0.5px solid #cbcbcb'
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <div style={{ width: '100%' }}>
            <Button
              sx={{ m: 'auto', width: '100%' }}
              onClick={() => setOTP('')}
              startIcon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-refresh"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                  <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
                </svg>
              }
            >
              รีเซตรหัส OTP
            </Button>
            <br />
            <Button
              color="secondary"
              variant="contained"
              sx={{ m: 'auto', width: '100%', color: '#ffffff' }}
              onClick={() => confirmOTP()}
            >
              ยืนยัน
            </Button>
            {newOTP && (
              <Button
                color="secondary"
                sx={{ m: 'auto', width: '100%' }}
                onClick={() => requireNewOTP()}
              >
                ขอรหัส OTP ใหม่
              </Button>
            )}
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AuthChangePassword;
