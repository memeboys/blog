import { Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogApi } from '../../api/api';
import { ArticleForm } from '../forms/ArticleForm';
import { FormContainer } from '../forms/FormContainer';

export const EditArticlePage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    BlogApi.default
      .fetchArticle(slug)
      .then((article) => article.article)
      .then(setArticle);
  }, [slug]);

  const handleEditArticle = async (data) => {
    const newArticle = { ...article, ...data };
    const result = await BlogApi.default.updateArticle(newArticle);
    navigate(`/articles/${result.article.slug}`);
  };

  if (!article) {
    return <Spin />;
  }

  return (
    <FormContainer>
      <ArticleForm initialValue={article} onCommit={handleEditArticle} h2={'Edit article'} />
    </FormContainer>
  );
};
