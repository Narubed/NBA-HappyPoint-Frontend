/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import 'dayjs/locale/th';
import numeral from 'numeral';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import SkeletonTotalGrowthBarChart from '../../../../ui-component/cards/Skeleton/TotalGrowthBarChart';
import MainCard from '../../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../../store/constant';

// chart data
import chartData from '../../chart-data/total-growth-bar-chart';

// ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //

const TotalGrowthBarChart = ({
  isLoading,
  isPointHistory,
  isFilterDate,
  isNumberMonth,
  isOwner
}) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { navType } = customization;
  const { primary } = theme.palette.text;
  const darkLight = theme.palette.dark.light;
  const grey200 = theme.palette.grey[200];
  const grey500 = theme.palette.grey[500];

  const primary200 = theme.palette.primary[200];
  const primaryDark = theme.palette.primary.dark;
  const secondaryMain = theme.palette.secondary.main;
  const secondaryLight = theme.palette.secondary.light;
  const newColors = [];

  // This could be length of your array.
  const totalDIVs = isPointHistory.length === 0 ? 30 : isPointHistory.length;
  const totalColors = totalDIVs;
  function makeColor(colorNum, colors) {
    if (colors < 1) colors = 1;
    // defaults to one color - avoid divide by zero
    return (colorNum * (360 / colors)) % 360;
  }
  for (let i = 0; i < totalDIVs; i += 1) {
    const element = document.createElement('div');
    document.body.appendChild(element);
    const color = `hsl( ${makeColor(i, totalColors)}, 100%, 50% )`;
    newColors.push(color);
  }

  useEffect(() => {
    const isNewValueByTitle = [];
    isFilterDate.forEach((element) => {
      if (element.length !== 0) {
        element.forEach((element2) => {
          const idx = isNewValueByTitle.findIndex((item) => item.name === element2.ph_title);
          if (idx !== -1) {
            let indexMonth = 0;
            isNumberMonth.forEach((element3, index) => {
              if (element3 === element2.numMonth) {
                indexMonth = index;
              }
            });
            isNewValueByTitle[idx].data[indexMonth] = element2.ph_point;
          } else {
            const dataValue = {
              name: element2.ph_title,
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            };
            let indexMonth = 0;
            isNumberMonth.forEach((element3, index) => {
              if (element3 === element2.numMonth) {
                indexMonth = index;
              }
            });
            dataValue.data[indexMonth] = element2.ph_point;
            isNewValueByTitle.push(dataValue);
          }
        });
      }
    });
    const newChartData = {
      ...chartData.options,
      //   colors: [redColor, primaryDark, secondaryMain, secondaryLight],
      colors: newColors.reverse(),

      xaxis: {
        labels: {
          style: {
            colors: [
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary,
              primary
            ]
          }
        },
        type: 'category',
        categories: [
          isNumberMonth.length !== 0
            ? `${dayjs()
                .month(isNumberMonth[0] - 1)
                .locale('th')
                .format('MMM')}`
            : 'ไม่มีข้อมูล',
          isNumberMonth.length !== 0
            ? `${dayjs()
                .month(isNumberMonth[1] - 1)
                .locale('th')
                .format('MMM')} `
            : 'ไม่มีข้อมูล',
          isNumberMonth.length !== 0
            ? `${dayjs()
                .month(isNumberMonth[2] - 1)
                .locale('th')
                .format('MMM')}`
            : 'ไม่มีข้อมูล',
          isNumberMonth.length !== 0
            ? `${dayjs()
                .month(isNumberMonth[3] - 1)
                .locale('th')
                .format('MMM')}`
            : 'ไม่มีข้อมูล',
          isNumberMonth.length !== 0
            ? `${dayjs()
                .month(isNumberMonth[4] - 1)
                .locale('th')
                .format('MMM')}`
            : 'ไม่มีข้อมูล',
          isNumberMonth.length !== 0
            ? `${dayjs()
                .month(isNumberMonth[5] - 1)
                .locale('th')
                .format('MMM')}`
            : 'ไม่มีข้อมูล',
          isNumberMonth.length !== 0
            ? `${dayjs()
                .month(isNumberMonth[6] - 1)
                .locale('th')
                .format('MMM')}`
            : 'ไม่มีข้อมูล',
          isNumberMonth.length !== 0
            ? `${dayjs()
                .month(isNumberMonth[7] - 1)
                .locale('th')
                .format('MMM')}`
            : 'ไม่มีข้อมูล',
          isNumberMonth.length !== 0
            ? `${dayjs()
                .month(isNumberMonth[8] - 1)
                .locale('th')
                .format('MMM')}`
            : 'ไม่มีข้อมูล',
          isNumberMonth.length !== 0
            ? `${dayjs()
                .month(isNumberMonth[9] - 1)
                .locale('th')
                .format('MMM')}`
            : 'ไม่มีข้อมูล',
          isNumberMonth.length !== 0
            ? `${dayjs()
                .month(isNumberMonth[10] - 1)
                .locale('th')
                .format('MMM')}`
            : 'ไม่มีข้อมูล',
          isNumberMonth.length !== 0
            ? `${dayjs()
                .month(isNumberMonth[11] - 1)
                .locale('th')
                .format('MMM')} ปัจจุบัน`
            : 'ไม่มีข้อมูล'
        ]
      },
      yaxis: {
        labels: {
          style: {
            colors: [primary]
          }
        }
      },
      grid: {
        borderColor: grey200
      },
      tooltip: {
        theme: 'light'
      },
      legend: {
        labels: {
          colors: grey500
        }
      },
      series: isNewValueByTitle
    };

    // do not load chart when loading
    if (!isLoading) {
      ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
    }
  }, [
    navType,
    primary200,
    primaryDark,
    secondaryMain,
    secondaryLight,
    primary,
    darkLight,
    grey200,
    isLoading,
    grey500
  ]);

  return (
    <>
      {isLoading ? (
        <SkeletonTotalGrowthBarChart />
      ) : (
        <MainCard>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle2">
                        เป็นขอมูลสำหรับการทดสอบเพื่อเเสดงผลเท่านั้น
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="h3">
                        {isOwner && numeral(isOwner.member_current_point).format('0,0.0')} Point
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Chart {...chartData} />
            </Grid>
          </Grid>
        </MainCard>
      )}
    </>
  );
};

TotalGrowthBarChart.propTypes = {
  isLoading: PropTypes.bool,
  isPointHistory: PropTypes.array,
  isFilterDate: PropTypes.array,
  isNumberMonth: PropTypes.array,
  isOwner: PropTypes.object
};

export default TotalGrowthBarChart;
