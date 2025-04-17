import instance from '../instance';
import { News } from '../../models/news';

export const getNews = async (): Promise<News[]> => {
  const response = await instance.get('/api/news');
  return response.data;
};

export const getNewsById = async (id: string): Promise<News> => {
  const response = await instance.get(`/api/news/${id}`);
  return response.data;
};

export const createNews = async (news: Omit<News, 'id'>): Promise<News> => {
  const response = await instance.post('/api/news', news);
  return response.data;
};

export const updateNews = async (news: News): Promise<News> => {
  const response = await instance.put(`/api/news/${news.id}`, news);
  return response.data;
};

export const deleteNews = async (id: string): Promise<void> => {
  await instance.delete(`/api/news/${id}`);
};
