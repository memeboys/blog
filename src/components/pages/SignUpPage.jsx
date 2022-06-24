import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../../store/userSlice';
import { FormContainer } from '../forms/FormContainer';
import { SignUpForm } from '../forms/SignUpForm';
import { useNoAuthFilter } from '../hooks';

export const SignUpPage = () => {
  useNoAuthFilter();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async (data) => {
    await dispatch(signUp(data)).unwrap();
    navigate('/');
  };

  return (
    <FormContainer>
      <SignUpForm onCommit={handleSignUp} />
    </FormContainer>
  );
};
