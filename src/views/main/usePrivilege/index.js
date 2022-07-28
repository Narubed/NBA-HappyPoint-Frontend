/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import { Card, CardContent, Typography, CardActions, Grid, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import CardPrivilege from './component/CardPrivilege';

export default function MediaCard() {
  const [privileges, setPrivileges] = React.useState([]);
  React.useEffect(async () => {
    let getAllPrivilege = [];
    await axios
      .get(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/privilege`, {
        headers: {
          secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
          token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
        }
      })
      .then((res) => (getAllPrivilege = res.data.data.reverse()));

    const memberLocal = JSON.parse(localStorage.getItem('members'));
    const getMember = await axios.get(
      `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/${memberLocal._id}`,
      {
        headers: {
          secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
          token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
        }
      }
    );
    const filterGropLevel = [];
    getAllPrivilege.forEach((element) => {
      const idx = element.pvl_grop_level.find((item) => item === getMember.data.data.member_level);
      if (idx) {
        filterGropLevel.push(element);
      }
    });
    const filterDateNow = filterGropLevel.filter(
      (item) =>
        dayjs(item.pvl_date_start).format() < dayjs(Date.now()).format() &&
        dayjs(item.pvl_date_end).format() > dayjs(Date.now()).format()
    );
    const filterStatus = filterDateNow.filter((item) => item.pvl_status === true);
    setPrivileges(filterStatus);
  }, []);
  return (
    <>
      {privileges.length === 0 ? (
        'ไม่มีข้อมูล'
      ) : (
        <Grid container spacing={1} position="flex">
          {privileges.map((item) => (
            <Grid item xs={12} sm={6} md={6} lg={6} sx={{ mt: 1 }} key={item._id}>
              <CardPrivilege item={item} key={item._id} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}
