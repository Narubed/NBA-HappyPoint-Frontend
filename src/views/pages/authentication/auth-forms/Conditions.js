import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import './Conditions.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import CardActions from '@mui/material/CardActions';

const drawerBleeding = 56;

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800]
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)'
}));

function SwipeableEdgeDrawer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(100% - ${drawerBleeding}px)`,
            overflow: 'visible'
          }
        }}
      />
      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0
          }}
        >
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>เงื่อนไขและข้อตกลง</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            pt: 2,
            height: '100%',
            overflow: 'auto',
            bgcolor: '#F0F8FF'
          }}
        >
          <Card>
            <CardActionArea>
              <CardContent sx={{ p: 2 }}>
                <div className="FontSizeConditions">
                  1.ผู้สมัครต้องปฏิบัติตามหลักเกณฑ์ เงื่อนไข
                  กฎระเบียบและข้อปฏิบัติการเป็นสมาชิกอย่างเคร่งครัด
                </div>
                <br />
                <div className="FontSizeConditions">
                  2.สมาชิก หมายถึงผู้ที่ทางบริษัท เอ็นบีเอดิจิตอลเซอร์วิสเซ็นเตอร์ จำกัด
                  อนุญาตให้มีสิทธิ์ ตามข้อกำหนดและข้อตกลง เงื่อนไขการใช้งานระบบ NBA Happy Point
                </div>
                <br />
                <div className="FontSizeConditions">
                  3.ผู้สมัคร เป็นผู้สมัครใจผูกนิติสัมพันธ์กับ บริษัทฯ
                  โดยมีฐานะเป็นตัวแทนและสมาชิกเท่านั้น ผู้สมัครมิได้เป็นลูกจ้างของบริษัทฯ แต่อย่างใด
                </div>
                <br />
                <div className="FontSizeConditions">
                  4.ผู้สมัครรับรองว่าจะไม่นำเครื่องหมาย โลโก้ เอกสาร วัสดุ
                  หรือสิ่งอื่นๆในใต้ชื่อบริษัทฯ ไปใช้ โดยไม่ได้รับอนุญาตเป็นลายลักษณ์
                  อักษรจากบริษัทฯ
                </div>
                <br />
                <div className="FontSizeConditions">
                  5.ห้ามผู้สมัครกระทำหลอกลวง จงใจ โฆษณาอันเป็นเท็จ หรือกล่าวอ้างเกินความจริง
                  เพื่อชักจูงให้บุคคลอื่นสมัครสมาชิก หรือซื้อ สินค้าของบริษัทฯ
                </div>
                <br />
                <div className="FontSizeConditions">
                  6.ผู้สมัครรับทราบและตกลงเงื่อนไขว่า บริษัทฯ
                  มีสิทธิ์ในการยกเลิกการเป็นสมาชิกได้ตลอดเวลา โดยไม่จำเป็นต้องบอกกล่าวล่วง
                  หน้าเป็นลายลักษณ์อักษร หรือแสดงเหตุแห่งการยกเลิกแต่อย่างใด
                  ทั้งนี้หากสมาชิกได้กระทำการเสื่อมเสียแก่บริษัทฯ สมาชิกตกลง
                  ว่าสมาชิกจะต้องรับผิดชอบเป็นการเฉพาะตัวและจะไม่เรียกร้อง ฟ้องร้อง
                  หรือดำเนินคดีกับบริษัทฯทั้งสิ้น และการยกเลิกการเป็น
                  สมาชิกไม่ว่าด้วยเหตุผลประการใดก็ตาม จะไม่เป็นเหตุให้บริษัทฯ
                  เสียสิทธิ์ในการเรียกร้องเงินหรือประโยชน์อื่นใดที่บริษัทฯ มีสิทธิ์
                  ในการเรียกร้องจากสมาชิก
                </div>
                <br />
                <div className="FontSizeConditions">
                  7.ผู้สมัครตกลงว่ากรณีการยกเลิกสัญญาตาม ข้อ 6. นั้น
                  หากผู้สมัครมีเงินที่ยังคงค้างในระบบ หรือเงินค้ำประกันไว้อยู่กับ บริษัทฯ
                  ผู้สมัครยินยอมให้ บริษัทฯ หักหนี้อื่นใดที่ยังคงค้างอยู่กับบริษัทฯ ก่อน
                  ทั้งนี้หากมียอดหนี้เกินจากเงินที่มีอยู่กับบริษัทฯ ผู้สมัครยิน
                  ยอมที่จะจ่ายเงินส่วนต่างดังกล่าวให้กับบริษัทฯ
                </div>
                <br />
                <div className="FontSizeConditions">
                  8.ผู้สมัครยอมรับผลที่เกิดจากการกระทำใดๆของผู้สมัครในความเสียหาย ถูกกล่าวหา
                  ถูกเรียกร้อง หรือดำเนินคดีทางศาลอันเนื่อง
                  มาจากการดำเนินธุรกิจของผู้สมัครต่อผู้บริโภคหรือบุคคลอื่นใดโดยไม่เรียกร้อง ฟ้องร้อง
                  หรือไล่เบี้ยเอาจากบริษัทฯ ทั้งสิ้น
                </div>
                <br />
                <div className="FontSizeConditions">
                  9.ผู้สมัครตกลงว่าการเป็นสมาชิกของบริษัทฯ
                  เป็นสิทธิ์เฉพาะตัวไม่สามารถโอนสิทธิ์ให้ผู้อื่นได้
                  อย่างไรก็ตามผลประโยชน์ที่ผู้สมัคร ได้รับ
                  ผู้สมัครสามารถโอนสิทธิ์ให้แก่ผู้รับผลประโยชน์ที่ผู้สมัครได้ระบุในใบสมัครนี้ได้
                </div>
                <br />
                <div className="FontSizeConditions">
                  10.สมาชิกตกลงว่าการที่ บริษัทฯ
                  ยอมผ่อนผันให้แก่สมาชิกในการปฏิบัติตามเงื่อนไขหรือข้อกำหนดนี้
                  จะไม่เป็นการทำให้เสื่อมเสีย สิทธิ์หรืออำนาจอย่่างใดๆของบริษัทฯ
                  รวมถึงจะไม่นำมาใช้เป็นข้อต่อรองกับบริษัทฯ ในคราวต่อไปด้วย
                </div>
                <br />
                <div className="FontSizeConditions">
                  11.บริษัทฯ ขอสงวนสิทธิ์ที่จะกำหนด เปลี่ยนแปลง ปรับปรุง เงื่อนไขผลตอบแทน
                  หรือหลักเกณฑ์การปฏิบัติงาน ทั้งนี้เพื่อประโยชน์ ของสมาชิกและองค์กร
                  โดยไม่ต้องแจ้งให้ทราบล่วงหน้า ไม่ว่าจะประกาศทุกช่องทางของบริษัทฯ
                </div>
                <FormGroup color="secondary" sx={{ color: 'purple', pt: 1, display: 'flex' }}>
                  <FormControlLabel
                    onChange={(e) => props.setDisabledButton(!e.target.checked)}
                    control={<Checkbox {...label} color="secondary" />}
                    label={
                      <Typography variant="caption" color="textSecondary">
                        ยอมรับเงื่อนไขและข้อตกลงที่อยู่ในข้างต้น
                      </Typography>
                    }
                  />
                </FormGroup>
              </CardContent>
            </CardActionArea>
            <CardActions sx={{ m: 'auto', p: 2 }}>
              <Button
                variant="contained"
                sx={{ width: '100%' }}
                size="small"
                color="secondary"
                disabled={props.disabledButton}
                onClick={() => setOpen(false)}
              >
                ยอมรับเงื่อนไข
              </Button>
            </CardActions>
          </Card>
          {/* <Skeleton variant="rectangular" height="100%" /> */}
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

SwipeableEdgeDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
  props: PropTypes.object,
  disabledButton: PropTypes.bool,
  setDisabledButton: PropTypes.func
};

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default SwipeableEdgeDrawer;
