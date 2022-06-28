import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import { gridSpacing } from '../../../store/constant';
import EarningCard from './EarningCard';
import PartnerCard from './PartnerCard';
import MemberCard from './MemberCard';
import Purchase from './Purchase';
import PointsGivenCard from './PointsGivenCard';
import PointsExchangeCard from './PointsExchangeCard';
import LevelCard from './LevelCard';
// ==============================|| DEFAULT DASHBOARD ||============================== //
const dataLoop = [
  {
    title: 'Diamond',
    preple: 2
  },
  {
    title: 'Platinum',
    preple: 40
  },
  {
    title: 'Golden',
    preple: 86
  },
  {
    title: 'Silver',
    preple: 203
  },
  {
    title: 'Bronze',
    preple: 568
  }
];
const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <h1>เป็นค่าที่เอามาเเสดงเพื่อวางโครงสร้างเท่านั้น</h1>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <MemberCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <PartnerCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Purchase isLoading={isLoading} />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <PointsGivenCard isLoading={isLoading} />
          </Grid>
          <Grid item lg={6} md={6} sm={6} xs={12}>
            <PointsExchangeCard isLoading={isLoading} />
          </Grid>
          {dataLoop.map((value) => (
            <Grid item lg={2.4} md={2.4} sm={2.4} xs={6} key={value.title}>
              <LevelCard isLoading={isLoading} value={value} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
