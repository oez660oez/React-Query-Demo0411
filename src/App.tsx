import React from 'react';
import { useEffect, useState } from 'react';
import { createNews, deleteNews, getNews, News, updateNews } from './api/api.ts';

const App = () => {
  const [news, setNews] = useState<News[]>([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const data = await getNews();
      setNews(data);
    } catch (error) {
      console.error('Failed to fetch news', error);
    }
  };

  const handleAddNews = async () => {
    const uuid: string = require('uuid').v4();
    const newNews: News = {
      id: uuid,
      date: '2025/4/11',
      category: '政策訊息',
      title: '文章標題文章標題文章標題文章標題',
    };
    try {
      const addedNews = await createNews(newNews);
      setNews([...news, addedNews]);
    } catch (error) {
      console.error('Failed to add news', error);
    }
  };

  const handleUpdateNews = async (id: string) => {
    const updatedNews = {
      id: id,
      date: '2025/4/10',
      category: '標案訊息',
      title: '文章標題文章標題文章標題文章標題',
    };
    try {
      const UpdateNews = await updateNews(id, updatedNews);
      setNews(news.map((item) => (item.id === id ? UpdateNews : item)));
    } catch (error) {
      console.error('Failed to update news', error);
    }
  };

  const handleDeleteNews = async (id: string) => {
    try {
      await deleteNews(id);
      setNews(news.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Failed to delete news', error);
    }
  };

  return (
    <div>
      <h1>News</h1>
      <button onClick={handleAddNews}>Add News</button>
      <ul>
        {news.map((item) => (
          <li key={item.id}>
            <h2>{item.date}</h2>
            <p>{item.category}</p>
            <p>{item.title}</p>
            <button onClick={() => handleUpdateNews(item.id)}>Update</button>
            <button onClick={() => handleDeleteNews(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App; 