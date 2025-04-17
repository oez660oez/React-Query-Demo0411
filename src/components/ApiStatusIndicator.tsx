import { Box, Text, Flex, Badge, Tooltip } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ApiStatusIndicator = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        setIsLoading(true);
        await axios.get('http://localhost:3001/api/news', { timeout: 3000 });
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkApiStatus();
    const interval = setInterval(checkApiStatus, 30000); // 每 30 秒檢查一次

    return () => clearInterval(interval);
  }, []);

  return (
    <Tooltip
      label={isConnected ? "後端 API 連接正常" : "無法連接到後端 API，將使用本地資料"}
      placement="bottom"
      hasArrow
    >
      <Flex align="center" gap={2} p={2}>
        <Badge 
          colorScheme={isConnected ? "green" : "red"} 
          variant="subtle"
          px={2}
          py={1}
          borderRadius="full"
        >
          <Flex align="center" gap={1}>
            <Box 
              w={3} 
              h={3} 
              borderRadius="full" 
              bg={isLoading ? "yellow.400" : isConnected ? "green.400" : "red.400"} 
              animation={isLoading ? "pulse 1.5s infinite" : "none"}
            />
            <Text fontSize="xs" fontWeight="bold">
              {isLoading ? "檢查中..." : isConnected ? "API 已連接" : "API 未連接"}
            </Text>
          </Flex>
        </Badge>
      </Flex>
    </Tooltip>
  );
};

export default ApiStatusIndicator; 