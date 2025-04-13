import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Flex, 
  Heading,
  Spinner,
  Stack, 
  Text,
  VStack,
  useToast
} from '@chakra-ui/react';
import { useNewsList, useNewsCreate, useNewsUpdate, useNewsDestroy, useNewsRetrieve } from './queries/news';
import { News } from './models/news';

// NewsItem 組件
const NewsItem = ({
  article,
  onUpdate,
  onDelete,
  onView,
}: {
  article: News;
  onUpdate: (id: string) => void;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
}) => {
  return (
    <Box position='relative'>
      <Box
        position='absolute'
        left='0'
        top='0'
        bottom='0'
        w='8px'
        bg='#ffbb00'
      />
      <Flex
        align='center'
        p={{ base: 3, md: 4 }}
        pl={{ base: '20px', md: '60px' }}
        fontWeight='bold'
        borderBottom='1px solid'
        borderColor='gray.200'
        cursor='pointer'
        _hover={{ bg: 'gray.50' }}
        direction='row'
        gap={{ base: 2, md: 0 }}
      >
        <Box flex='1'>
          <Text
            color='gray.600'
            fontSize={{ base: 'xs', sm: 'sm', md: 'md' }}
            display='flex'
            alignItems='center'
            flexWrap={{ base: 'wrap', md: 'nowrap' }}
            gap={{ base: 1, md: 2 }}
          >
            <Box as='span' minW={{ base: '100%', md: 'auto' }}>
              {article.date}
            </Box>
            <Box as='span' minW={{ base: '100%', md: 'auto' }}>
              〔{article.category}〕
            </Box>
            <Box as='span'>{article.title}</Box>
          </Text>
        </Box>
        <Flex gap={2}>
          <Button
            size='sm'
            colorScheme='green'
            onClick={() => onView(article.id)}
          >
            查看
          </Button>
          <Button
            size='sm'
            colorScheme='blue'
            onClick={() => onUpdate(article.id)}
          >
            更新
          </Button>
          <Button
            size='sm'
            colorScheme='red'
            onClick={() => onDelete(article.id)}
          >
            刪除
          </Button>
          <Box color="gray.400" fontSize="24px">
            &gt;
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

const App: React.FC = () => {
  const [currentId, setCurrentId] = useState<string>('');
  const toast = useToast();
  
  // 使用 React Query hooks
  const { data: newsList, isLoading: isLoadingList, refetch: refetchList } = useNewsList();
  const { data: currentNews } = useNewsRetrieve(currentId);
  
  const newsCreate = useNewsCreate();
  const newsUpdate = useNewsUpdate(currentId);
  const newsDestroy = useNewsDestroy();

  // 處理新增新聞
  const handleAddNews = () => {
    const newNews: News = {
      id: crypto.randomUUID(),
      date: '2024/4/15',
      category: '政策訊息',
      title: '新的文章標題',
    };
    
    newsCreate.mutate(newNews, {
      onSuccess: () => {
        toast({
          title: '新增成功',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        refetchList();
      },
      onError: (error) => {
        toast({
          title: '新增失敗',
          description: String(error),
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  // 處理更新新聞
  const handleUpdateNews = (id: string) => {
    setCurrentId(id);
    const updatedNews: News = {
      id: id,
      date: '2024/4/16',
      category: '標案訊息',
      title: '更新的文章標題',
    };
    
    newsUpdate.mutate(updatedNews, {
      onSuccess: () => {
        toast({
          title: '更新成功',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        refetchList();
      },
      onError: (error) => {
        toast({
          title: '更新失敗',
          description: String(error),
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  // 處理刪除新聞
  const handleDeleteNews = (id: string) => {
    newsDestroy.mutate(id, {
      onSuccess: () => {
        toast({
          title: '刪除成功',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        if (id === currentId) {
          setCurrentId('');
        }
        refetchList();
      },
      onError: (error) => {
        toast({
          title: '刪除失敗',
          description: String(error),
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    });
  };

  // 處理查看新聞詳情
  const handleViewNews = (id: string) => {
    setCurrentId(id === currentId ? '' : id);
  };

  return (
    <Container maxW="container.lg" p={5}>
      <VStack spacing={6} align="stretch">
        <Flex justify="space-between" align="center">
          <Heading size="lg">最新消息</Heading>
          <Button 
            colorScheme="blue" 
            onClick={handleAddNews} 
            isLoading={newsCreate.isPending}
          >
            新增消息
          </Button>
        </Flex>
        
        {isLoadingList ? (
          <Flex justify="center" p={10}>
            <Spinner 
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='xl'
            />
          </Flex>
        ) : (
          <>
            <Stack spacing={4}>
              {newsList?.map((item) => (
                <NewsItem
                  key={item.id}
                  article={item}
                  onUpdate={handleUpdateNews}
                  onDelete={handleDeleteNews}
                  onView={handleViewNews}
                />
              ))}
            </Stack>

            {currentNews && (
              <Box mt={4} p={4} borderWidth="1px" borderRadius="lg">
                <Text fontSize="xl" fontWeight="bold" mb={2}>
                  詳細內容
                </Text>
                <Text>日期：{currentNews.date}</Text>
                <Text>類別：{currentNews.category}</Text>
                <Text>標題：{currentNews.title}</Text>
                <Button mt={2} onClick={() => setCurrentId('')}>
                  關閉
                </Button>
              </Box>
            )}
          </>
        )}
      </VStack>
    </Container>
  );
};

export default App;
