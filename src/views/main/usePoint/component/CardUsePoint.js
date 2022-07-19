import * as React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Grid, Button, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import numeral from 'numeral';
import { replace } from 'lodash';

import Image from '../../../../assets/images/background/bubbly.jpg';

export default function CardUsePoint({ item }) {
  const navigate = useNavigate();
  const [disabledButton, setDisabledButton] = React.useState(false);
  React.useEffect(() => {
    // Check limited Amount
    let valuereduce = 0;
    if (item) {
      valuereduce = item.usep_useing.reduce((value, item) => value + item.member_amount, 0);
    }
    const valueReducer = item.usep_limited_total - valuereduce;
    if (valueReducer <= 0) {
      setDisabledButton(true);
    }
    // --------------end----------------
  }, []);

  const onClickToDetail = () => {
    navigate('/UsePointDetail', { replace: true, state: item });
  };
  return (
    <>
      <Card
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundAttachment: 'fixed',
          // backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          // backgroundPosition: 'top',
          width: '100%',
          mt: 1
        }}
      >
        <CardContent sx={{ p: '4px' }}>
          <Grid container spacing={1} sx={{ position: 'relative', mb: -2 }}>
            <Grid item xs={4} sm={2} md={2} lg={2} sx={{ mt: 1 }}>
              <Box
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
                <Box position="absolute" display="flex" top={0} left={0} zIndex={2} p={0}>
                  <div
                    style={{
                      fontSize: '10px',
                      // backgroundColor: '#FFFFFF',
                      padding: '0px 10px',
                      alignItems: 'center',
                      borderRadius: '16px',
                      color: 'white',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 6px #000000'
                    }}
                  >
                    <Icon
                      icon="emojione:star"
                      width="8"
                      height="8"
                      style={{
                        alignItems: 'center'
                      }}
                    />{' '}
                    {/* 200,000 */}
                    {replace(numeral(item.usep_point).format('0.00a'), '.00', '')}
                  </div>
                </Box>
                <Box
                  component="img"
                  src={`${process.env.REACT_APP_DRIVE_SELECT_IMAGE}${item.usep_image[0]}`}
                  width="100%"
                  my="auto"
                />
              </Box>
            </Grid>
            <Grid item xs={8} sm={4} md={4} lg={4}>
              <div
                style={{ fontSize: '12px', color: 'purple', fontWeight: 'bold', marginTop: '14px' }}
              >
                {item.usep_name}
              </div>
              <div
                style={{ fontSize: '10px', color: 'purple', fontWeight: 'bold', marginTop: '14px' }}
              >
                Point: {numeral(item.usep_point).format('0,0')}
              </div>
            </Grid>
            <Button
              disabled={disabledButton}
              sx={{ position: 'absolute', bottom: '0px', right: '0px', color: 'purple' }}
              onClick={() => onClickToDetail()}
            >
              {disabledButton ? (
                <div style={{ fontSize: '10px', fontWeight: 'bold' }}>ของรางวัลหมดแล้ว</div>
              ) : (
                <div style={{ fontSize: '10px', fontWeight: 'bold' }}>แลกรางวัล</div>
              )}
            </Button>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
CardUsePoint.propTypes = {
  item: PropTypes.object
};
