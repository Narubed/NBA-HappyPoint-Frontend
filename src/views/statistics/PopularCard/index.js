/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Button,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import axios from 'axios';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import SkeletonPopularCard from '../../../ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from '../../../store/constant';
import AreaChartCard from './component/AreaChartCard';
import AreaCardDetail from './component/AreaCardDetail';

// ==============================|| DASHBOARD DEFAULT - POPULAR CARD ||============================== //

const PopularCard = () => {
  const theme = useTheme();

  const [isLoading, setLoading] = useState(true);
  const [pointHistory, setPointHistory] = useState([]);
  const [member, setMember] = useState([]);

  useEffect(async () => {
    const memberLocal = JSON.parse(localStorage.getItem('members'));
    let getPointHistory = [];
    await axios
      .get(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/point_history/member/${memberLocal._id}`)
      .then((res) => (getPointHistory = res.data.data));
    let getMembers = [];
    await axios
      .get(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/${memberLocal._id}`)
      .then((res) => (getMembers = res.data.data));
    setMember(getMembers);
    setPointHistory(getPointHistory.reverse());
    setLoading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <SkeletonPopularCard />
      ) : (
        <MainCard content={false}>
          <CardContent>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12}>
                <Grid container alignContent="center" justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h4">ประวัติพอยท์</Typography>
                  </Grid>
                  <Grid item>
                    <MoreHorizOutlinedIcon
                      fontSize="small"
                      sx={{
                        color: theme.palette.primary[200],
                        cursor: 'pointer'
                      }}
                      aria-controls="menu-popular-card"
                      aria-haspopup="true"
                    />
                    {/* <Menu
                      id="menu-popular-card"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      variant="selectedMenu"
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right'
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right'
                      }}
                    >
                      <MenuItem onClick={handleClose}> Today</MenuItem>
                      <MenuItem onClick={handleClose}> This Month</MenuItem>
                      <MenuItem onClick={handleClose}> This Year </MenuItem>
                    </Menu> */}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sx={{ pt: '16px !important' }}>
                <AreaChartCard
                  isLoading={isLoading}
                  pointHistory={pointHistory}
                  point={member.member_current_point}
                />
              </Grid>
              <Grid item xs={12}>
                {pointHistory.map((item) => (
                  <AreaCardDetail key={item._id} isLoading={isLoading} pointHistory={item} />
                ))}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions sx={{ p: 1.25, pt: 0, justifyContent: 'center' }}>
            <Button size="small" disableElevation>
              View All
              <ChevronRightOutlinedIcon />
            </Button>
          </CardActions>
        </MainCard>
      )}
    </>
  );
};

PopularCard.propTypes = {
  isLoading: PropTypes.bool
};

export default PopularCard;
