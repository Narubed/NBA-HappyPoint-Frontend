/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';

import { styled } from '@mui/material/styles';

import { Grid, Paper, Box, Container, TextField, Stack, Tooltip } from '@mui/material';
import axios from 'axios';
import isWeekend from 'date-fns/isWeekend';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/th';

import { motion } from 'framer-motion';
import CardDetail from './conponent/CardDetail';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  transition: '.9s',
  position: 'flex',
  width: '100%',
  ':hover': {
    width: '100%',
    opacity: '.9',
    transform: 'translateX(0%)',
    borderStyle: 'outset'
  }
}));

function index() {
  const [isReport, setReport] = useState([]);
  const [isNewReport, setNewReport] = useState([]);
  const [valueDate, setValueDate] = useState(new Date());
  useEffect(async () => {
    const report = await axios.get(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/report_history`);
    const members = await axios.get(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members`);

    const newReport = [];
    if (report && members) {
      report.data.data.forEach((element) => {
        const findMemberId = members.data.data.find((item) => item._id === element.rph_member_id);
        if (findMemberId) {
          newReport.push({
            ...element,
            member_firstname: findMemberId.member_firstname,
            member_lastname: findMemberId.member_lastname,
            member_address: findMemberId.member_address,
            member_phone_number: findMemberId.member_phone_number
          });
        }
      });
    }
    setReport(newReport);
    setNewReport(newReport);
  }, []);
  const filterDate = (newValue) => {
    const filterReport = isReport.filter(
      (item) =>
        dayjs(item.rph_timestamp).format('DD MMMM YYYY') === dayjs(newValue).format('DD MMMM YYYY')
    );
    setNewReport(filterReport);
    setValueDate(newValue);
  };
  const onChangeFilter = (e) => {
    const text = e.target.value;
    const filterText = isReport.filter(
      (item) =>
        item.member_phone_number === text ||
        item.member_firstname === text ||
        item.member_lastname === text ||
        item.rph_name === text ||
        item._id === text
    );
    setNewReport(filterText.length === 0 ? isReport : filterText);
  };
  return (
    <div>
      <Container>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} item>
            <Grid lg={5} md={5} xs={12} mt={3} mr={4} ml={3}>
              <Tooltip title="ไอดีที่ทำรายการ เบอร์โทรศัพท์ ชื่อ นามสกุล ชื่อรายการ" arrow>
                <TextField
                  label="ค้นหาตามตัวอักษร"
                  color="secondary"
                  focused
                  fullWidth
                  onChange={(e) => onChangeFilter(e)}
                />
              </Tooltip>
            </Grid>
            <Grid lg={5} md={5} xs={12} mt={3} mr={4} ml={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                  <MobileDatePicker
                    color="secondary"
                    label="ค้นหาตามวันที่"
                    value={valueDate}
                    onChange={(newValue) => {
                      filterDate(newValue);
                    }}
                    renderInput={(params) => <TextField color="secondary" {...params} />}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            {isNewReport.reverse().map((value) => (
              <Grid item xs={12} lg={6} md={6} key={value._id}>
                <Item>
                  <CardDetail value={value} />
                </Item>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default index;
