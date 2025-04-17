import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

// 創建 axios 實例
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000, // 設置超時時間
});

// 請求攔截器
instance.interceptors.request.use(
  (config) => {
    // 這裡可以添加通用的請求邏輯，例如添加 token
    return config;
  },
  (error) => {
    console.error('請求發生錯誤:', error);
    return Promise.reject(error);
  },
);

// 響應攔截器
instance.interceptors.response.use(
  (response) => {
    // 處理成功響應
    return response;
  },
  (error) => {
    // 處理錯誤響應
    if (error.code === 'ECONNABORTED') {
      console.error('請求超時，可能是後端 API 不可用');
    } else if (!error.response) {
      console.error('無法連接到後端 API 伺服器');
    } else {
      console.error('API 請求錯誤:', error.response?.status, error.response?.data);
    }
    return Promise.reject(error);
  },
);

export const isApiAvailable = async (): Promise<boolean> => {
  try {
    await axios.get(`${BASE_URL}/api/news`, { timeout: 2000 });
    return true;
  } catch (error) {
    return false;
  }
};

export default instance;
