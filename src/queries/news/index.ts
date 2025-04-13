import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createNews,
  deleteNews,
  getNews,
  getNewsById,
  updateNews,
} from '../../api/news';
import { queryClient } from '../../helpers/query-client';
import { ApiModule } from '../../enums/api-module';
import { News } from '../../models/news';

// 使用 ApiModule 作為模塊名稱
const moduleName = ApiModule.NEWS;

// 定義查詢鍵
const queryKeys = {
  list: () => [moduleName, 'list'] as const,
  retrieve: (id: string) => [moduleName, 'retrieve', id] as const,
};

export const useNewsList = () => {
  return useQuery<News[]>({
    queryKey: queryKeys.list(),
    queryFn: () => getNews(),
  });
};

export const useNewsRetrieve = (id: string) => {
  return useQuery<News>({
    queryKey: queryKeys.retrieve(id),
    queryFn: () => getNewsById(id),
    enabled: !!id,
  });
};

export const useNewsCreate = () => {
  return useMutation({
    mutationFn: (data: News) => createNews(data),
    onSuccess: () => {
      // 成功後重新獲取列表數據
      queryClient.invalidateQueries({ queryKey: queryKeys.list() });
    },
  });
};

export const useNewsUpdate = (id: string) => {
  return useMutation({
    mutationFn: (data: News) => updateNews(id, data),
    onSuccess: (newData) => {
      // 成功後更新查詢緩存
      queryClient.invalidateQueries({ queryKey: queryKeys.list() });
      queryClient.setQueryData(queryKeys.retrieve(id), newData);
    },
  });
};

export const useNewsDestroy = () => {
  return useMutation({
    mutationFn: (id: string) => deleteNews(id),
    onSuccess: (_, id) => {
      // 成功後重新獲取列表數據
      queryClient.invalidateQueries({ queryKey: queryKeys.list() });
      // 移除詳情查詢緩存
      queryClient.removeQueries({ queryKey: queryKeys.retrieve(id) });
    },
  });
};
