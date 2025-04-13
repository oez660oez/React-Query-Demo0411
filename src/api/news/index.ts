import instance from '../instance';
import { News } from '../../models/news';

export const getNews = async (): Promise<News[]> => {
  const response = await instance.get('/news');
  return response.data;
};

export const getNewsById = async (id: string): Promise<News> => {
  const response = await instance.get(`/news/${id}`);
  return response.data;
};

export const createNews = async (data: News): Promise<News> => {
  const response = await instance.post('/news', data);
  return response.data;
};

export const updateNews = async (id: string, data: News): Promise<News> => {
  const response = await instance.put(`/news/${id}`, data);
  return response.data;
};

export const deleteNews = async (id: string): Promise<void> => {
  await instance.delete(`/news/${id}`);
};
