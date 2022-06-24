import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BlogApiExceptionCode } from '../../api/api-exception';
import { signIn } from '../../store/userSlice';
import { FormContainer } from '../forms/FormContainer';
import { SignInForm } from '../forms/SignInForm';
import { useNoAuthFilter } from '../hooks';

export const SignInPage = () => {
  useNoAuthFilter();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authFailed, setAuthFailed] = useState(false);

  const handleSignIn = async (data) => {
    try {
      await dispatch(signIn(data)).unwrap();
      navigate('/');
    } catch (e) {
      if (e.code === BlogApiExceptionCode.INVALID_EMAIL_OR_PASSWORD) {
        setAuthFailed(true);
        return;
      }
      throw e;
    }
  };

  return (
    <FormContainer>
      <SignInForm signInFailed={authFailed} onCommit={handleSignIn} />
    </FormContainer>
  );
};
