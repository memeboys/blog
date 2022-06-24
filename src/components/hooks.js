import { notification } from 'antd';
import React, { useEffect, useRef } from 'react';
import { useSelector, useStore } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { errorSelector } from '../store/errorSlice';
import { authTokenSelector } from '../store/userSlice';

export const useAuthFilter = () => {
  const authToken = useSelector(authTokenSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) return;
    navigate('/sign-in');
  }, []);
};

export const useNoAuthFilter = () => {
  const authToken = useSelector(authTokenSelector);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authToken) return;
    navigate('/');
  }, []);
};

export const useSignOut = () => {
  const navigate = useNavigate();
  const store = useStore();
  const prevProfileRef = useRef(store.getState().user.profile);
  useEffect(() => {
    return store.subscribe(() => {
      const currProfile = store.getState().user.profile;
      if (prevProfileRef.current === currProfile) return;
      if (currProfile == null) navigate('/sign-in');
    });
  });
};

export const useErrorNotification = () => {
  const error = useSelector(errorSelector);
  useEffect(() => {
    if (!error) return;
    notification.error({
      message: 'An error occurred',
      description: <p>{String(error)}</p>,
    });
  }, [error]);
};
