/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { useTheme, styled } from '@mui/material/styles';
import './usePoint.scss';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import CardActions from '@mui/material/CardActions';

import Grid from '@mui/material/Grid';

export default function MediaControlCard() {
  const theme = useTheme();

  const arrayTest = [1, 2, 3, 4, 5];
  return (
    <Grid>
      <Grid container spacing={2}>
        {arrayTest.map((value) => (
          <Grid item xs={6} sm={6} md={6} lg={4} key={value}>
            <div className="blog-card alt" key={value}>
              <div className="meta">
                <div
                  className="photo"
                  style={{
                    backgroundImage: `url(${process.env.REACT_APP_DRIVE_SELECT_IMAGE}19HxDLYncC_7OclroZ1aUGDt-MrJAX439)`
                  }}
                />
              </div>
              <div className="description">
                <h2>แลกหมวก NBAExpress</h2>
                {/* <h2>Java is not the same as JavaScript</h2> */}
                <p>
                  เงื่อนไขการรับสินค้านี้ต้องมีแต้มรวม5,000,000 Point
                  หลังจากกดแลกเเล้วกรุณาตรวจสอบที่อยู่ที่ต้องการจัดส่งให้เรียบร้อย.
                </p>
                <p className="read-more">
                  <Button color="secondary" variant="outlined" href="#">
                    คลิ๊กเลย
                  </Button>
                </p>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
