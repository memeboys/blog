import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogApi } from '../../api/api';
import { profileSelector } from '../../store/userSlice';
import { Article } from '../articles/Article';
import style from './ArticlePage.module.scss';

export const ArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const profile = useSelector(profileSelector);
  const [article, setArticle] = useState(null);

  useEffect(() => {
    BlogApi.default.fetchArticle(slug).then((article) => setArticle(article.article));
  }, [slug]);

  if (!article) {
    return <Spin size="large" />;
  }

  const handleFavoriteChange = async (isFavorite) => {
    const delta = isFavorite ? 1 : -1;
    const newArticle = {
      ...article,
      favorited: isFavorite,
      favoritesCount: article.favoritesCount + delta,
    };
    setArticle(newArticle);
    await (isFavorite ? BlogApi.default.favorite(article) : BlogApi.default.unvaforite(article));
  };

  const handleDelete = async () => {
    await BlogApi.default.deleteArticle(article);
    navigate('/');
  };

  return (
    <div className={style.container}>
      <Article
        article={article}
        onFavoriteChange={profile ? handleFavoriteChange : null}
        onDelete={handleDelete}
        showBody={true}
        showControls={article.author.username === profile?.username}
      />
    </div>
  );
};
