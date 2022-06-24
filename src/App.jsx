import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import style from './App.module.scss';
import { TitlePanel } from './components/common/TitlePanel';
import { useErrorNotification, useSignOut } from './components/hooks';
import { fetchProfile } from './store/userSlice';

export default function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useErrorNotification();
  useSignOut();

  useEffect(() => {
    dispatch(fetchProfile()).then(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <div className={style.loadingContainer}>
          <Spin size="large" />
        </div>
      ) : (
        <div className={style.contentContainer}>
          <TitlePanel />
          <Outlet />
        </div>
      )}
    </>
  );
}
