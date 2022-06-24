import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import { ArticleCollectionPage } from './components/pages/ArticleCollectionPage';
import { ArticlePage } from './components/pages/ArticlePage';
import { EditArticlePage } from './components/pages/EditArticlePage';
import { NewArticlePage } from './components/pages/NewArticlePage';
import { ProfilePage } from './components/pages/ProfilePage';
import { SignInPage } from './components/pages/SignInPage';
import { SignUpPage } from './components/pages/SignUpPage';
import { store } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<ArticleCollectionPage />} />
            <Route path="articles" element={<ArticleCollectionPage />} />
            <Route path="articles/:slug" element={<ArticlePage />} />
            <Route path="articles/:slug/edit" element={<EditArticlePage />} />
            <Route path="new-article" element={<NewArticlePage />} />
            <Route path="sign-in" element={<SignInPage />} />
            <Route path="sign-up" element={<SignUpPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
