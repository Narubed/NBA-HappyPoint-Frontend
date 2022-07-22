/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Zoom } from 'react-slideshow-image';
import Box from '@mui/material/Box';
import { Icon } from '@iconify/react';
import IconButton from '@mui/material/IconButton';
import numeral from 'numeral';
// import io from 'socket.io-client';
import { useNavigate, BrowserRouter as Router, useLocation } from 'react-router-dom';
import SkeletonEarningCard from '../../../../ui-component/cards/Skeleton/EarningCard';

// style was imported in index.css
import 'react-slideshow-image/dist/styles.css';

const zoomOutProperties = {
  duration: 4000,
  transitionDuration: 500,
  infinite: true,
  //   indicators: true,
  arrows: true,
  pauseOnHover: true,
  scale: 0.4
};
// const socket = io.connect(`${process.env.REACT_APP_HAPPY_POINT_SOCKET}`);

function App({ images, isLoading, limited, state }) {
  const [valueUseing, setValueUseing] = useState(
    state.pvl_limited_total -
      state.pvl_useing.reduce((value, item) => value + item.member_amount, 0)
  );
  let showImage = [];
  if (images) {
    showImage = images;
  }
  // let valuereduce = 0;
  // if (state) {
  //   valuereduce = state.pvl_useing.reduce((value, item) => value + item.member_amount, 0);
  // }
  // const valueReducer = state.pvl_limited_total - valuereduce;

  // useEffect(() => {
  //   const room = state._id;
  //   if (room !== '') {
  //     socket.emit('join_room', room);
  //   }
  //   socket.on('value_useing_privilege', (data) => {
  //     setValueUseing(data.value);
  //   });
  // }, [socket]);

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <div className="App">
          <div className="slide-container">
            <Zoom {...zoomOutProperties}>
              {showImage.map((each, index) => (
                /* <img
                  key={index}
                  style={{ width: '100%', borderRadius: '14px' }}
                  src={`${process.env.REACT_APP_DRIVE_SELECT_IMAGE}${each}`}
                /> */
                <Box
                  key={index}
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
                    <h6
                      style={{
                        // backgroundColor: '#FF00FF',
                        color: 'white',
                        padding: '0px 4px 0px 4px',
                        margin: '6px 0px',
                        borderRadius: '16px'
                      }}
                    >
                      {index + 1} / {images.length}
                    </h6>
                  </Box>
                  <Box position="absolute" top={0} left={0} zIndex={2} p={0}>
                    <h4
                      style={{
                        backgroundColor: 'purple',
                        color: 'white',
                        padding: '0px 6px 6px 6px',
                        margin: '6px 0px',
                        borderRadius: '16px'
                      }}
                    >
                      <Icon
                        icon="bi:person-circle"
                        width="18"
                        height="18"
                        style={{ paddingTop: '6px' }}
                      />{' '}
                      {limited} สิทธิต่อคน
                    </h4>
                  </Box>
                  <Box position="absolute" bottom={0} right={0} zIndex={2} p={0}>
                    <h6
                      style={{
                        backgroundColor: 'purple',
                        color: 'white',
                        padding: '0px 6px 0px 6px',
                        margin: '6px 0px',
                        borderRadius: '16px'
                      }}
                    >
                      สิทธิคงเหลือทั้งหมด {numeral(valueUseing).format('0,0')}
                    </h6>
                  </Box>
                  <Box
                    component="img"
                    src={`${process.env.REACT_APP_DRIVE_SELECT_IMAGE}${each}`}
                    width="100%"
                    my="auto"
                    sx={{ borderRadius: '14px' }}
                  />
                </Box>
              ))}
            </Zoom>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
App.propTypes = {
  isLoading: PropTypes.bool,
  images: PropTypes.array
};
