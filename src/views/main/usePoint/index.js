/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { Card, CardContent, Typography, CardActions, Grid, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import CardUsePoint from './component/CardUsePoint';

export default function MediaCard() {
  const [usePoint, setUsePoint] = React.useState([]);
  React.useEffect(async () => {
    let getAllUsePoint = [];
    await axios
      .get(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/use_point`)
      .then((res) => (getAllUsePoint = res.data.data.reverse()));

    const memberLocal = JSON.parse(localStorage.getItem('members'));
    const getMember = await axios.get(
      `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/${memberLocal._id}`
    );
    const filterGropLevel = [];
    getAllUsePoint.forEach((element) => {
      const idx = element.usep_grop_level.find((item) => item === getMember.data.data.member_level);
      if (idx) {
        filterGropLevel.push(element);
      }
    });
    const filterDateNow = filterGropLevel.filter(
      (item) =>
        dayjs(item.usep_date_start).format() < dayjs(Date.now()).format() &&
        dayjs(item.usep_date_end).format() > dayjs(Date.now()).format()
    );
    const filterStatus = filterDateNow.filter((item) => item.usep_status === true);
    setUsePoint(filterStatus);
  }, []);
  return (
    <>
      {usePoint.length === 0 ? (
        'ไม่มีข้อมูล'
      ) : (
        <Grid container spacing={1} position="flex">
          {usePoint.map((item) => (
            <Grid item xs={12} sm={6} md={6} lg={6} sx={{ mt: 1 }} key={item._id}>
              <CardUsePoint item={item} key={item._id} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
