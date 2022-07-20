import React from 'react';
import PropTypes from 'prop-types';
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
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import numeral from 'numeral';
import SkeletonEarningCard from '../../../../ui-component/cards/Skeleton/EarningCard';

export default function AreaCardDetail({ isLoading, pointHistory }) {
  const theme = useTheme();
  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
        <>
          {pointHistory.ph_type === 'รับเข้า' ? (
            <>
              <Grid container direction="column">
                <Grid item>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="subtitle1" color="inherit">
                        {pointHistory.ph_title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            {numeral(pointHistory.ph_point).format('0,0[.]00')}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Avatar
                            variant="rounded"
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: '5px',
                              backgroundColor: theme.palette.success.light,
                              color: theme.palette.success.dark,
                              ml: 2
                            }}
                          >
                            <KeyboardArrowUpOutlinedIcon fontSize="small" color="inherit" />
                          </Avatar>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" sx={{ color: 'success.dark' }}>
                    {pointHistory.ph_detail}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 1.5 }} />
            </>
          ) : (
            <>
              <Grid container direction="column">
                <Grid item>
                  <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                      <Typography variant="subtitle1" color="inherit">
                        {pointHistory.ph_title}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                          <Typography variant="subtitle1" color="inherit">
                            {numeral(pointHistory.ph_point).format('0,0[.]00')}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Avatar
                            variant="rounded"
                            sx={{
                              width: 16,
                              height: 16,
                              borderRadius: '5px',
                              backgroundColor: theme.palette.orange.light,
                              color: theme.palette.orange.dark,
                              marginLeft: 1.875
                            }}
                          >
                            <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                          </Avatar>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle2" sx={{ color: theme.palette.orange.dark }}>
                    {pointHistory.ph_detail}
                  </Typography>
                </Grid>
              </Grid>
              <Divider sx={{ my: 1.5 }} />
            </>
          )}
        </>
      )}
    </>
  );
}

AreaCardDetail.propTypes = {
  isLoading: PropTypes.bool,
  pointHistory: PropTypes.object
};
