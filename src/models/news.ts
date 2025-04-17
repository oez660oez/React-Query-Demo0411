/**
 * 新聞資料模型
 */
export interface News {
  /**
   * 新聞的唯一識別碼
   */
  id: string;
  
  /**
   * 新聞日期，格式：YYYY/MM/DD
   */
  date: string;
  
  /**
   * 新聞類別，例如：政策訊息、標案訊息等
   */
  category: string;
  
  /**
   * 新聞標題
   */
  title: string;
} 