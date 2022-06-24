import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BlogApi } from '../../api/api';
import { profileSelector } from '../../store/userSlice';
import { FormContainer } from '../forms/FormContainer';
import { ProfileForm } from '../forms/ProfileForm';
import { useAuthFilter } from '../hooks';

export const ProfilePage = () => {
  useAuthFilter();
  const profile = useSelector(profileSelector);
  const navigate = useNavigate();

  const handleSave = async (user) => {
    await BlogApi.default.editProfile(user);
    navigate('/');
  };

  return (
    <FormContainer>
      <ProfileForm defaultValue={profile} onCommit={handleSave} />
    </FormContainer>
  );
};
