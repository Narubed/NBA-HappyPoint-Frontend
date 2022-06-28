/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import './tabs-main.css';

import UsePoint from './usePoint';
import UsePrivilege from './usePrivilege';
import { gridSpacing } from '../../store/constant';
import TotalPointCard from './component/TotalPointCard';
import TotalIncomeLightCard from './component/TotalIncomeLightCard';
import Exp from './component/Exp';
import MemberDetail from './component/MemberDetail';

const Tabs = () => {
  const [currentTab, setCurrentTab] = useState('1');
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <MemberDetail isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Exp isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={7} xs={7} md={7} lg={12}>
                <TotalPointCard isLoading={isLoading} />
              </Grid>
              <Grid item sm={5} xs={5} md={5} lg={12}>
                <TotalIncomeLightCard isLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div className="container">
              <div className="tabs">
                {tabs.map((tab, i) => (
                  <button
                    key={i}
                    id={tab.id}
                    disabled={currentTab === `${tab.id}`}
                    onClick={handleTabClick}
                  >
                    {tab.tabTitle}
                  </button>
                ))}
              </div>
              <div className="content">
                {tabs.map((tab, i) => (
                  <div key={i}>{currentTab === `${tab.id}` && <div>{tab.pages}</div>}</div>
                ))}
              </div>
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Tabs;

const tabs = [
  {
    id: 1,
    tabTitle: 'ใช้ Point',
    title: 'Title 1',
    pages: <UsePrivilege />
  },
  {
    id: 2,
    tabTitle: 'สิทธิพิเศษ',
    title: 'Title 2',
    pages: <UsePrivilege />
  },
  {
    id: 3,
    tabTitle: 'คูปอง',
    title: 'Title 3',
    pages: <UsePoint />
  },
  {
    id: 4,
    tabTitle: 'ประวัติ',
    title: 'Title 4',
    pages: <UsePoint />
  }
];
