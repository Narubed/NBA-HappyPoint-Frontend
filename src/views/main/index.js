/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/button-has-type */
import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

import './tabs-main.css';

import UsePoint from './usePoint';
import UsePrivilege from './usePrivilege';
import { gridSpacing } from '../../store/constant';
import TotalPointCard from './component/TotalPointCard';
import TotalIncomeLightCard from './component/TotalIncomeLightCard';
import Exp from './component/Exp';
import MemberDetail from './component/MemberDetail';
import NoData from './NoData';
import PointHistory from './pointHistory';
import { SET_LOADING } from '../../store/actions';

const Tabs = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState('1');
  const [isLoading, setLoading] = useState(true);
  const [owner, setOwner] = useState([]);
  const [levels, setLevels] = useState([]);

  useEffect(async () => {
    dispatch({ type: SET_LOADING, loading: true });
    const memberLocal = JSON.parse(localStorage.getItem('members'));
    const getMember = await axios.get(
      `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/${memberLocal._id}`,
      {
        headers: {
          secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
          token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
        }
      }
    );
    const getLevels = await axios.get(
      `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/level_members/`,
      {
        headers: {
          secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
          token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
        }
      }
    );
    if (getMember.data.data) {
      setOwner(getMember.data.data);
    }
    if (getLevels.data.data) {
      const sortDataLevels = getLevels.data.data.sort((a, b) => a.lmb_point - b.lmb_point);
      setLevels(sortDataLevels);
    }
    await checkLevel();
    setLoading(false);
    dispatch({ type: SET_LOADING, loading: false });
  }, []);

  const checkLevel = async () => {
    const memberLocal = JSON.parse(localStorage.getItem('members'));

    const getMember = await axios.get(
      `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/${memberLocal._id}`,
      {
        headers: {
          secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
          token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
        }
      }
    );
    const getLevels = await axios.get(
      `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/level_members/`,
      {
        headers: {
          secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
          token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
        }
      }
    );
    let sortDataLevels = [];
    if (getLevels.data.data) {
      sortDataLevels = getLevels.data.data.sort((a, b) => a.lmb_point - b.lmb_point);
    }

    const findIndexLevel = sortDataLevels.findIndex(
      (item) => item._id === getMember.data.data.member_level
    );
    const indexLevel = findIndexLevel + 1;
    if (sortDataLevels[indexLevel]) {
      if (getMember.data.data.member_total_point >= sortDataLevels[indexLevel].lmb_point) {
        await axios
          .put(
            `${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/${memberLocal._id}`,
            {
              member_level: sortDataLevels[indexLevel]._id
            },
            {
              headers: {
                secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
                token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
              }
            }
          )
          .then(() => {
            Swal.fire({
              icon: 'success',
              html: `<p style="font-size: 20px">เลื่อนขั้นเป็น ${sortDataLevels[indexLevel].lmb_name} แล้ว</p>`,
              showConfirmButton: false,
              timer: 1500
            });
            setTimeout(() => {
              window.location.reload(false);
            }, 1500);
          });
      }
    }
  };
  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <MemberDetail isLoading={isLoading} owner={owner} levels={levels} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Exp isLoading={isLoading} owner={owner} levels={levels} />
          </Grid>
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item sm={7} xs={7} md={7} lg={12}>
                <TotalPointCard isLoading={isLoading} owner={owner} />
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
    pages: <UsePoint />
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
    pages: <NoData />
  },
  {
    id: 4,
    tabTitle: 'ประวัติ',
    title: 'Title 4',
    pages: <PointHistory />
  }
];
