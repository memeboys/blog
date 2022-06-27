import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogApi } from '../../api/api';
import { ArticleForm } from '../forms/ArticleForm';
import { FormContainer } from '../forms/FormContainer';

export const NewArticlePage = () => {
  const navigate = useNavigate();

  const handleNewArticle = async (article) => {
    const result = await BlogApi.default.createArticle(article);
    navigate(`/articles/${result.article.slug}`);
  };

  return (
    <FormContainer>
      <ArticleForm onCommit={handleNewArticle} h2={'Create new article'} />
    </FormContainer>
  );
};
