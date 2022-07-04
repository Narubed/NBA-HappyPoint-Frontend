/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import { Icon } from '@iconify/react';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';
import SkeletonEarningCard from '../../../ui-component/cards/Skeleton/EarningCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

const Purchase = ({ isLoading, owner, levels }) => {
  let nextLevel = '';
  let findLevelOwner = {};
  let findIndexLevel = [];
  if (levels.length !== 0) {
    findLevelOwner = levels.find((item) => item._id === owner.member_level);
    findIndexLevel = levels.findIndex((item) => item._id === owner.member_level);
    if (findIndexLevel >= levels.length - 1) {
      nextLevel = 'เลเวลสูงสุดแล้ว';
    } else {
      nextLevel = levels[findIndexLevel + 1].lmb_name;
    }
  }
  const theme = useTheme();
  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    สวัสดีคุณ : {owner.member_firstname} {owner.member_lastname}
                  </Grid>
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.mediumAvatar,
                        backgroundColor: theme.palette.secondary.dark,
                        color: theme.palette.secondary[200],
                        zIndex: 1
                      }}
                      aria-controls="menu-earning-card"
                      aria-haspopup="true"
                      // onClick={handleClick}
                    >
                      <a style={{ fontSize: '14px' }}>
                        x{levels[findIndexLevel].lmb_multiply / 100}
                      </a>
                      {/* <MoreHorizIcon fontSize="inherit" /> */}
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography
                      sx={{ fontSize: '1.6rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}
                    >
                      เลเวล : {findLevelOwner.lmb_name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Icon icon="simple-icons:opslevel" width="25" height="25" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: theme.palette.secondary[200]
                  }}
                >
                  เลเวลถัดไป : {nextLevel}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

Purchase.propTypes = {
  isLoading: PropTypes.bool,
  levels: PropTypes.array
};

export default Purchase;
