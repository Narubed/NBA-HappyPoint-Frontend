import React, { useEffect } from 'react';
import dayjs from 'dayjs';

export default function ChangeDateChart({ filterStatus, setFilterDate }) {
  setFilterDate(1);
  //   console.log(filterStatus);
  //   console.log(dayjs(Date.now()).format('M'));
  const state = [];
  const dateNowNumber = parseInt(dayjs(Date.now()).format('M'), 10);
  const dateYearNowNumber = parseInt(dayjs('2021-11-20T10:18:03.206Z').format('YYYYY'), 10);
  console.log(dateYearNowNumber);

  const addMonth = [];
  filterStatus.forEach((element) => {
    addMonth.push({ ...element, numMonth: dayjs(element.ph_timestamp).format('M') });
    const numberMonth = parseInt(dayjs(element.ph_timestamp).format('M'), 10);
    // console.log(numberMonth);
    if (numberMonth === 1) {
      //   console.log(numberMonth);
    }
  });

  const monthName = [];
  const reduceValueAmount = [];
  for (let index = dateNowNumber + 1; index <= 12; index += 1) {
    monthName.push(index);
    let newData = [];
    let valueAmount = 0;
    if (index < dateNowNumber) {
      newData = addMonth.filter(
        (item) =>
          parseInt(item.numMonth, 10) === index &&
          dayjs(item.ph_timestamp).format('YYYY') ===
            parseInt(dayjs(Date.now()).format('YYYY'), 10) - 1
      );
    } else {
      newData = addMonth.filter((item) => parseInt(item.numMonth, 10) === index);
    }
    if (newData.length !== 0) {
      valueAmount = newData.reduce((sum, item) => sum + item.ph_point, 0);
    }
    reduceValueAmount.push(valueAmount);
    console.log(newData);
    console.log(index);
    console.log('ผลรวมของเดือนนี้', valueAmount);
  }
  for (let index = 1; index <= dateNowNumber; index += 1) {
    monthName.push(index);
    const newData = addMonth.filter((item) => parseInt(item.numMonth, 10) === index);
    let valueAmount = 0;
    if (newData.length !== 0) {
      valueAmount = newData.reduce((sum, item) => sum + item.ph_point, 0);
    }
    reduceValueAmount.push(valueAmount);
    console.log(newData);
    console.log(index);
    console.log('ผลรวมของเดือนนี้', valueAmount);
  }
  monthName.shift();
  console.log(monthName);
  console.log(reduceValueAmount);
  // console.log(addMonth);
  // console.log(state);
}
