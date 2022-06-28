/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, CardActions, Grid, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CardPrivilege from './component/CardPrivilege';

export default function MediaCard() {
  const [privileges, setPrivileges] = React.useState([]);
  React.useEffect(async () => {
    let getAllPrivilege = [];
    await axios
      .get(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/privilege`)
      .then((res) => (getAllPrivilege = res.data.data))
      .catch((err) => console.log(err));
    setPrivileges(getAllPrivilege);
  }, []);
  return (
    <>
      <Grid container spacing={1} position="flex">
        {privileges.map((item) => (
          <Grid item xs={12} sm={6} md={6} lg={6} sx={{ mt: 1 }} key={item._id}>
            <CardPrivilege item={item} key={item._id} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}
