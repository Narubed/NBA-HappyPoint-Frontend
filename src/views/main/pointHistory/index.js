/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { Card, CardContent, Typography, CardActions, Grid, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CardPointHistory from './component/CardPointHistory';

export default function MediaCard() {
  const [histoey, setHistory] = React.useState([]);
  React.useEffect(async () => {
    const memberLocal = JSON.parse(localStorage.getItem('members'));
    const getMember = await axios.get(
      `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/report_history/member/${memberLocal._id}`
    );

    setHistory(getMember.data.data.reverse());
  }, []);
  return (
    <>
      {histoey.length === 0 ? (
        'ไม่มีข้อมูล'
      ) : (
        <Grid container spacing={1} position="flex">
          {histoey.map((item) => (
            <Grid item xs={12} sm={6} md={6} lg={6} sx={{ mt: 1 }} key={item._id}>
              <CardPointHistory item={item} key={item._id} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
