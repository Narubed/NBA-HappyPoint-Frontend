/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import numeral from 'numeral';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  linearProgressClasses
} from '@mui/material';

import EdgesensorHighIcon from '@mui/icons-material/EdgesensorHigh';
import SkeletonEarningCard from '../../../ui-component/cards/Skeleton/EarningCard';
// styles
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 30,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#fff'
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.secondary.main
  }
}));

const CardStyle = styled(Card)(({ theme }) => ({
  background: theme.palette.primary.light,
  marginBottom: '22px',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: '157px',
    height: '157px',
    background: theme.palette.primary[200],
    borderRadius: '50%',
    top: '-105px',
    right: '-96px'
  }
}));

// ==============================|| PROGRESS BAR WITH LABEL ||============================== //

function LinearProgressWithLabel({ value, nextLevel, valueRemaining, ...others }) {
  const theme = useTheme();

  return (
    <Grid container direction="column" spacing={1} sx={{ mt: 1.5 }}>
      <Grid item>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography variant="h6" sx={{ color: theme.palette.primary[800] }}>
              exp.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h6" color="inherit">{`${Math.round(value)}%`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <BorderLinearProgress variant="determinate" value={value} {...others} />
      </Grid>
      <Grid item>
        <Typography variant="h6" sx={{ color: theme.palette.secondary[800] }}>
          ต้องการอีก {numeral(valueRemaining).format('0,0')} exp. เพื่อเลื่อนเป็นระดับ{' '}
          {nextLevel.lmb_name}
        </Typography>
      </Grid>
    </Grid>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number,
  nextLevel: PropTypes.object,
  valueRemaining: PropTypes.number
};

// ==============================|| SIDEBAR MENU Card ||============================== //

function MenuCard({ owner, levels, isLoading }) {
  const theme = useTheme();

  let nextLevel = '';
  let valueLevels = 0;
  let valueRemaining = 0;
  let findIndexLevel = [];
  if (levels.length !== 0) {
    findIndexLevel = levels.findIndex((item) => item._id === owner.member_level);
    if (findIndexLevel >= levels.length - 1) {
      nextLevel = 'เลเวลสูงสุดแล้ว';
    } else {
      nextLevel = levels[findIndexLevel + 1];
      valueRemaining = levels[findIndexLevel + 1].lmb_point - owner.member_total_point;
      valueLevels = (owner.member_total_point / levels[findIndexLevel + 1].lmb_point) * 100;
    }
  }
  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <CardStyle>
          <CardContent sx={{ p: 2 }}>
            <List sx={{ p: 0, m: 0 }}>
              <ListItem alignItems="flex-start" disableGutters sx={{ p: 0 }}>
                <ListItemAvatar sx={{ mt: 0 }}>
                  <Avatar
                    variant="rounded"
                    sx={{
                      ...theme.typography.commonAvatar,
                      ...theme.typography.largeAvatar,
                      color: theme.palette.error.main,
                      border: 'none',
                      borderColor: theme.palette.error.main,
                      background: '#fff',
                      marginRight: '12px'
                    }}
                  >
                    <EdgesensorHighIcon fontSize="inherit" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{ mt: 0 }}
                  primary={
                    <Typography variant="subtitle1" sx={{ color: theme.palette.primary[800] }}>
                      ค่าประสบการณ์ทั้งหมด
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption">
                      {' '}
                      {numeral(owner.member_total_point).format('0,0')} exp.
                    </Typography>
                  }
                />
              </ListItem>
            </List>
            <LinearProgressWithLabel
              value={valueLevels}
              nextLevel={nextLevel}
              valueRemaining={valueRemaining}
            />
          </CardContent>
        </CardStyle>
      )}
    </>
  );
}

export default MenuCard;

MenuCard.propTypes = {
  isLoading: PropTypes.bool,
  levels: PropTypes.array
};
