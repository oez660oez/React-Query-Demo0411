import axios from 'axios';
const API_URL = 'http://localhost:3001';

export type News = {
  id: string;
  date: string;
  category: string;
  title: string;
};

export const getNews = async () => {
  try {
    const response = await axios.get(`${API_URL}/news`);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const createNews = async (news: News) => {
  try {
    const response = await axios.post(`${API_URL}/news`, news);
    return response.data;
  } catch (error) {
    console.error('Error Creating posts:', error);
    throw error;
  }
};

export const updateNews = async (id: string, updatedNews: News) => {
  try {
    const response = await axios.put(`${API_URL}/news/${id}`, updatedNews);
    return response.data;
  } catch (error) {
    console.error('Error updating posts:', error);
    throw error;
  }
};

export const deleteNews = async (id: string) => {
  try {
    await axios.delete(`${API_URL}/news/${id}`);
  } catch (error) {
    console.error('Error deleting posts:', error);
    throw error;
  }
};
