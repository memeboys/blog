import { Button } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { profileSelector, signOut } from '../../store/userSlice';
import style from './TitlePanel.module.scss';

export const TitlePanel = () => {
  const profile = useSelector(profileSelector);
  return (
    <header className={style.container}>
      <Link to="/">
        <h2>Realworld Blog</h2>
      </Link>
      {profile ? <SignedInUserControls /> : <SignedOutUserControls />}
    </header>
  );
};

const SignedOutUserControls = () => (
  <div className={style.userControls}>
    <SignInButton />
    <SignUpButton />
  </div>
);

const SignedInUserControls = () => {
  const profile = useSelector(profileSelector);
  return (
    <div className={style.userControls}>
      <NewArticleButton />
      <Link to="/profile" className={style.avatar}>
        <span>{profile.username}</span>
        <img src={profile.image} alt="Author" />
      </Link>
      <SignOutButton />
    </div>
  );
};

const SignInButton = () => (
  <Link to="/sign-in">
    <Button>Sign In</Button>
  </Link>
);

const SignUpButton = () => (
  <Link to="/sign-up">
    <Button>Sign Up</Button>
  </Link>
);

const SignOutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate('/sign-in');
  };
  return <Button onClick={handleSignOut}>Log Out</Button>;
};

const NewArticleButton = () => (
  <Link to="/new-article">
    <Button>Create article</Button>
  </Link>
);
