/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
// import dayjs from 'dayjs';
import GrowBarChart from './component/GrowBarChart';
import { SET_LOADING } from '../../../store/actions';
// import ChangeDateChart from './component/ChangeDateChart';
import NewChangeDateChart from './component/NewChangeDateChart';

export default function index() {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const [isPointHistory, setPointHistory] = useState([]);
  const [isFilterDate, setFilterDate] = useState([]);
  const [isNumberMonth, setNumberMonth] = useState([]);
  const [isOwner, setOwner] = useState([]);

  useEffect(async () => {
    dispatch({ type: SET_LOADING, loading: true });
    const memberLocal = JSON.parse(localStorage.getItem('members'));
    let getPointHistory = [];
    await axios
      .get(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/members/${memberLocal._id}`, {
        headers: {
          secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
          token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
        }
      })
      .then((res) => setOwner(res.data.data));

    await axios
      .get(`${process.env.REACT_APP_HAPPY_POINT_BACKEND}/point_history/member/${memberLocal._id}`, {
        headers: {
          secret_key: `${process.env.REACT_APP_NBA_SECRET_KEY}`,
          token_key: `${process.env.REACT_APP_NBA_TOKEN_KEY}`
        }
      })
      .then((res) => (getPointHistory = res.data.data));

    const filterStatus = getPointHistory.filter((item) => item.ph_type === 'รับเข้า');
    // ChangeDateChart({ filterStatus, setFilterDate });

    await NewChangeDateChart({ filterStatus, setFilterDate, setNumberMonth });

    const newValuePointHistory = [];
    filterStatus.forEach((element) => {
      const idx = newValuePointHistory.findIndex((item) => item.ph_title === element.ph_title);
      if (idx === -1) {
        newValuePointHistory.push(element);
      } else {
        newValuePointHistory[idx].ph_point += element.ph_point;
      }
    });
    setPointHistory(filterStatus);
    setLoading(false);
    dispatch({ type: SET_LOADING, loading: false });
  }, []);

  return (
    <div>
      <GrowBarChart
        isLoading={isLoading}
        isPointHistory={isPointHistory}
        isFilterDate={isFilterDate}
        isNumberMonth={isNumberMonth}
        isOwner={isOwner}
      />
    </div>
  );
}
