/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useNavigate, BrowserRouter as Router, useLocation } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Grid
} from '@mui/material';

import ImageSlide from './ImageSlide';
import CardDetail from './CardDetail';

import { gridSpacing } from '../../../../store/constant';

export default function Slider() {
  const [isLoading, setLoading] = React.useState(true);

  const location = useLocation();
  const { state } = location;
  console.log(state);
  React.useEffect(async () => {
    setLoading(false);
  }, []);
  return (
    // <div className={styles.container}>
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <ImageSlide
              images={state && state.usep_image}
              state={state}
              limited={state.usep_limited_member}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item lg={8} md={6} sm={6} xs={12}>
            <CardDetail state={state && state} isLoading={isLoading} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    // </div>
  );
}
