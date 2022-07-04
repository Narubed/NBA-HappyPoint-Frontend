import * as React from 'react';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';
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
  Button
} from '@mui/material';
import numeral from 'numeral';
import './pointHistory.css';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import 'dayjs/locale/th';

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const bull = (
  <Box component="span" sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}>
    •
  </Box>
);

export default function CardPointHistory({ item }) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Card className="card-hisroty" onClick={() => setOpen(true)}>
        <CardContent sx={{ p: '20px 0px 40px 10px' }}>
          <Grid container spacing={1} position="flex">
            <Grid item xs={9} sm={6} md={6} lg={6}>
              <Typography variant="h5" component="div" sx={{ color: 'purple', fontWeight: 'bold' }}>
                {bull}
                {item.rph_name}
              </Typography>

              <Typography sx={{ fontSize: 10, color: 'red' }} color="text.secondary" gutterBottom>
                ได้รับ:
                {dayjs(item.rph_timestamp)
                  .add(543, 'year')
                  .locale('th')
                  .format('D MMM  YYYY h:mm A')}
              </Typography>
            </Grid>
            <Grid item xs={3} sm={6} md={6} lg={6}>
              <Typography
                sx={{ mt: 2.5, fontSize: '10px', textAlign: 'right', p: '0px 6px 0px 00px' }}
                color="secondary"
              >
                จำนวน: {numeral(item.rph_amount).format('0,0')} สิทธิ
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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
            เลขทำรายการ
            <Typography variant="h5" component="div">
              {bull}
              {item._id}
            </Typography>
            <br />
            ชื่อรายการ
            <Typography variant="h5" component="div">
              {bull}
              {item.rph_name}
            </Typography>
            <br />
            จำนวนพอยท์ที่ใช้
            <Typography variant="h5" component="div">
              {bull}
              {numeral(item.rph_point).format('0,0')}
            </Typography>
            <br />
            หมายเหตุ
            <Typography variant="h5" component="div">
              {bull}
              {item.rph_note ? item.rph_note : 'ไม่มี'}
            </Typography>
            <br />
            <Typography variant="h5" component="div">
              วันที่แลก :{' '}
              {dayjs(item.rph_timestamp).add(543, 'year').locale('th').format('D MMM  YYYY h:mm A')}
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
              <QRCode id="qr-gen" value={item._id} size={120} level="H" includeMargin />
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ m: 'auto' }}>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClose} color="secondary" variant="contained" disabled>
            {item.rph_status}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

CardPointHistory.propTypes = {
  item: PropTypes.object
};
