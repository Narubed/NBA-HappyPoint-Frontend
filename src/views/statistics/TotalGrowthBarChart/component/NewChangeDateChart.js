import React, { useEffect } from 'react';
import dayjs from 'dayjs';

export default function ChangeDateChart({ filterStatus, setFilterDate, setNumberMonth }) {
  //   console.log(dayjs(Date.now()).format('M YYYY'));
  const dateNowNumber = parseInt(dayjs(Date.now()).format('M'), 10);
  const dateYearNumber = parseInt(dayjs(Date.now()).format('YYYY'), 10);
  const newValue = [];
  filterStatus.forEach((element) => {
    const idx = newValue.findIndex((item) => item.ph_title === element.ph_title);
    // เช็คชื่อ
    if (idx === -1) {
      newValue.push({
        ...element,
        numMonth: parseInt(dayjs(element.ph_timestamp).format('M'), 10),
        numYear: parseInt(dayjs(element.ph_timestamp).format('YYYY'), 10)
      });
    } else {
      //   console.log(element);
      const findDate = newValue.findIndex(
        (item) =>
          dayjs(item.ph_timestamp).format('M YYYY') === dayjs(element.ph_timestamp).format('M YYYY')
      );
      //   console.log(findDate);
      // เช็ควันและปี
      if (findDate === -1) {
        newValue.push({
          ...element,
          numMonth: parseInt(dayjs(element.ph_timestamp).format('M'), 10),
          numYear: parseInt(dayjs(element.ph_timestamp).format('YYYY'), 10)
        });
      } else {
        const idx = newValue.findIndex((item) => item.ph_title === element.ph_title);
        newValue[idx].ph_point += element.ph_point;
      }
      //   console.log(findDate);
    }
  });

  //------------------------------------
  const lastValue = [];
  const monthName = [];
  for (let index = dateNowNumber + 1; index <= 12; index += 1) {
    monthName.push(index);

    const newDataMinusYear = newValue.filter(
      (item) => parseInt(item.numYear, 10) === dateYearNumber - 1
    );
    const newData = newDataMinusYear.filter((item) => parseInt(item.numMonth, 10) === index);

    lastValue.push(newData);
    // console.log('เดือนที่', index);
    // console.log(newData);
  }
  // -------------------------------
  for (let index = 1; index <= dateNowNumber; index += 1) {
    monthName.push(index);
    const newDataMinusYear = newValue.filter(
      (item) => parseInt(item.numYear, 10) === dateYearNumber
    );
    const newData = newDataMinusYear.filter((item) => parseInt(item.numMonth, 10) === index);
    lastValue.push(newData);
    // console.log('เดือนที่', index);
    // console.log(newData);
  }
  setNumberMonth(monthName);
  setFilterDate(lastValue);
}
