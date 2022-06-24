import { Pagination, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BlogApi } from '../../api/api';
import { profileSelector } from '../../store/userSlice';
import { Article } from '../articles/Article';
import style from './ArticleCollectionPage.module.scss';

export const ArticleCollectionPage = () => {
  const profile = useSelector(profileSelector);
  const step = 5;
  const [articles, setArticles] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {
    loadArticlePage(currentPage);
  }, []);

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    await loadArticlePage(page);
  };

  const loadArticlePage = async (page) => {
    setArticles(null);
    const offset = page * step - step;
    const result = await BlogApi.default.fetchArticles(offset, step);
    const pageCount = Math.ceil(result.articlesCount / step);
    setPageCount(pageCount);
    setArticles(result.articles);
  };

  const handleFavoriteChange = async (article, isFavorite) => {
    const newArticles = articles.map((item) => {
      if (item.slug !== article.slug) return item;
      const delta = isFavorite ? 1 : -1;
      return { ...item, favorited: isFavorite, favoritesCount: item.favoritesCount + delta };
    });
    setArticles(newArticles);
    await (isFavorite ? BlogApi.default.favorite(article) : BlogApi.default.unvaforite(article));
  };

  const handleDelete = async (article) => {
    const newArticles = articles.filter((item) => item.slug !== article.slug);
    setArticles(newArticles);
    await BlogApi.default.deleteArticle(article);
  };

  if (!articles) {
    return <Spin size="large" />;
  }

  return (
    <div className={style.container}>
      {articles.map((article) => (
        <Article
          article={article}
          key={article.slug}
          onDelete={() => handleDelete(article)}
          showControls={article.author.username === profile?.username}
          onFavoriteChange={profile ? (isFavorite) => handleFavoriteChange(article, isFavorite) : null}
        />
      ))}
      <Pagination
        current={currentPage}
        total={pageCount}
        defaultPageSize={step}
        hideOnSinglePage={true}
        showSizeChanger={false}
        onChange={handlePageChange}
      />
    </div>
  );
};
