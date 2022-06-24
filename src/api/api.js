import axios from 'axios';
import { BlogApiException, BlogApiExceptionCode } from './api-exception';

export class BlogApi {
  constructor(baseUrl = BlogApi._baseUrl) {
    this._api = axios.create({
      baseURL: baseUrl,
    });
    this._bindErrMiddleware();
  }

  _errMiddleware(e) {
    if (e.response.status === 0) {
      throw new BlogApiException(BlogApiExceptionCode.NETWORK_ERROR);
    }
    if (e.response.status === 401) {
      throw new BlogApiException(BlogApiExceptionCode.UNAUTHORIZED);
    }
    if (e.response.data.errors) {
      const { errors } = e.response.data;
      if ('email or password' in errors) {
        throw new BlogApiException(BlogApiExceptionCode.INVALID_EMAIL_OR_PASSWORD);
      }
    }
    throw new BlogApiException(BlogApiExceptionCode.UNKNOWN);
  }

  _bindErrMiddleware() {
    this._unbindErrMiddleware();
    this._errMiddlewareId = this._api.interceptors.response.use(null, this._errMiddleware);
  }

  _unbindErrMiddleware() {
    if (typeof this._errMiddlewareId !== 'number') return;
    this._api.interceptors.response.eject(this._errMiddlewareId);
    this._errMiddlewareId = null;
  }

  async signIn(user) {
    const response = await this._api.post('/users/login', { user });
    this.setToken(response.data.user.token);
    return response.data;
  }

  async signUp(user) {
    const response = await this._api.post('/users', { user });
    this.setToken(response.data.user.token);
    return response.data;
  }

  async fetchProfile() {
    this._unbindErrMiddleware();
    try {
      const user = await this._api.get('/user');
      const profile = await this._api.get(`/profiles/${user.data.user.username}`);
      return { user: { ...user.data.user, ...profile.data.profile } };
    } catch (e) {
      return { user: null };
    } finally {
      this._bindErrMiddleware();
    }
  }

  async editProfile(newUser) {
    const user = await this._api.put(`/user`, { user: newUser });
    const profile = await this._api.get(`/profiles/${user.data.user.username}`);
    return { user: { ...user.data.user, ...profile.data.profile } };
  }

  async fetchArticles(offset, limit) {
    const response = await this._api.get('/articles', { params: { offset, limit } });
    return response.data;
  }

  async fetchArticle(slug) {
    const response = await this._api.get(`/articles/${slug}`);
    return response.data;
  }

  async createArticle(article) {
    const response = await this._api.post('/articles', { article });
    return response.data;
  }

  async updateArticle(article) {
    const response = await this._api.put(`/articles/${article.slug}`, { article });
    return response.data;
  }

  async favorite(article) {
    const response = await this._api.post(`/articles/${article.slug}/favorite`);
    return response.data;
  }

  async unvaforite(article) {
    const response = await this._api.delete(`/articles/${article.slug}/favorite`);
    return response.data;
  }

  async deleteArticle(article) {
    const response = await this._api.delete(`/articles/${article.slug}`);
    return response.data;
  }

  setToken(token) {
    this._api.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : null;
  }
}
BlogApi._baseUrl = 'https://kata.academy:8021/api';
BlogApi.default = new BlogApi();
