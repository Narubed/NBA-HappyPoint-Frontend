/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, Grid, Typography } from '@mui/material';

// third-party
import ApexCharts from 'apexcharts';
import Chart from 'react-apexcharts';

// project imports
import chartData from '../../chart-data/bajaj-area-chart';
import SkeletonEarningCard from '../../../../ui-component/cards/Skeleton/EarningCard';
// ===========================|| DASHBOARD DEFAULT - BAJAJ AREA CHART CARD ||=========================== //

const BajajAreaChartCard = ({ isLoading, pointHistory, point }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);
  const { navType } = customization;

  const orangeDark = theme.palette.secondary[800];
  useEffect(async () => {
    const newSupportChart = {
      ...chartData.options,
      colors: [orangeDark],
      tooltip: {
        theme: 'light'
      }
    };
    ApexCharts.exec(`support-chart`, 'updateOptions', newSupportChart);
  }, [navType, orangeDark]);

  const sortDate = pointHistory.sort(
    (a, b) =>
      dayjs(a.ph_timestamp).format('ddd, MMM D, YYYY h:mm A') -
      dayjs(b.ph_timestamp).format('ddd, MMM D, YYYY h:mm A')
  );
  sortDate.reverse();
  const newPointHistory = [];
  sortDate.forEach((element) => {
    if (element.ph_type === 'รับเข้า') {
      if (newPointHistory.length <= 10) {
        newPointHistory.push(element.ph_point);
      }
    }
  });
  chartData.series[0].data = newPointHistory;
  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <Card sx={{ bgcolor: 'secondary.light' }}>
          <Grid container sx={{ p: 2, pb: 0, color: '#fff' }}>
            <Grid item xs={12}>
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <Typography variant="subtitle1" sx={{ color: theme.palette.secondary.dark }}>
                    รายการรับเข้า
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h4" sx={{ color: theme.palette.grey[800] }}>
                    {point.toLocaleString()} Point
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" sx={{ color: theme.palette.grey[800] }}>
                10 รายการล่าสุด
              </Typography>
            </Grid>
          </Grid>
          <Chart {...chartData} />
        </Card>
      )}
    </>
  );
};

export default BajajAreaChartCard;

BajajAreaChartCard.propTypes = {
  isLoading: PropTypes.bool,
  pointHistory: PropTypes.array,
  point: PropTypes.number
};
