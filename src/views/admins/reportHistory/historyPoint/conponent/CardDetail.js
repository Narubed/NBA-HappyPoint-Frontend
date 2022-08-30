import * as React from 'react';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import QRCode from 'qrcode.react';
import {
  Grid,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Button,
  Typography,
  Paper
} from '@mui/material';
import numeral from 'numeral';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const bull = (
  <Box component="div" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function ComplexGrid({ value }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Paper
        sx={{
          p: 2,
          margin: 'auto',
          flexGrow: 1,
          backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff')
        }}
      >
        <Grid container>
          <Grid value xs={12} sm container>
            <Grid value xs container direction="column" spacing={2}>
              <Grid value xs sx={{ textAlign: 'left' }}>
                <Typography gutterBottom variant="subtitle1" component="div">
                  ชื่อรายการ : {value.ph_title}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  เจ้าของรายการ : {value.member_firstname} {value.member_lastname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dayjs(value.ph_timestamp)
                    .add(543, 'year')
                    .locale('th')
                    .format('D MMM  YYYY h:mm A')}
                </Typography>
              </Grid>
              <Grid value>
                <Button
                  // sx={{ cursor: 'pointer', bgcolor: 'purple' }}
                  variant="body2"
                  onClick={() => setOpen(true)}
                >
                  ดูรายละเอียด
                </Button>
              </Grid>
            </Grid>
            <Grid value>
              <Typography variant="subtitle1" component="div">
                {value.ph_type === 'รับเข้า' ? (
                  <Button variant="contained" color="secondary" onClick={() => setOpen(true)}>
                    {' '}
                    {value.ph_type}
                  </Button>
                ) : (
                  <Button variant="contained" color="warning" onClick={() => setOpen(true)}>
                    {' '}
                    {value.ph_type}
                  </Button>
                )}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Dialog
        fullWidth
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          <Typography variant="h3" component="div">
            รายการยืนยัน
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            เลขอ้างอิง
            <Typography variant="h5" component="div">
              {bull}
              {value._id}
            </Typography>
            <br />
            ชื่อรายการ
            <Typography variant="h5" component="div">
              {bull}
              {value.ph_title}
            </Typography>
            <br />
            จำนวนพอยท์ที่ทำรายงาน
            <Typography variant="h5" component="div">
              {bull}
              {numeral(value.ph_point).format('0,0')}
            </Typography>
            <br />
            รายละเอียด
            <Typography variant="h5" component="div">
              {bull}
              {value.ph_detail ? value.ph_detail : 'ไม่มี'}
            </Typography>
            <br />
            <Typography variant="h5" component="div">
              วันที่ทำรายการ :{' '}
              {dayjs(value.ph_timestamp).add(543, 'year').locale('th').format('D MMM  YYYY h:mm A')}
            </Typography>
            <br />
            <div
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto',
                textAlign: 'center'
              }}
            >
              <QRCode id="qr-gen" value={value._id} size={120} level="H" includeMargin />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ m: 'auto' }}>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClose} color="secondary" variant="contained" disabled>
            {value.ph_type}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
