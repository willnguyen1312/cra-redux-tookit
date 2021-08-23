import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, VStack, Text, Checkbox, Skeleton } from '@chakra-ui/react';
import { fetchTodos } from '../../redux/slices/todoSlice';
import ErrorMessage from '../errorMessage';

export default function TodoList() {
  const dispatch = useDispatch();
  const todoListdata = useSelector(state => state.todos.todoList);
  const apiStatus = useSelector(state => state.todos.status);
  const apiErrorMessage = useSelector(state => state.todos.error);

  useEffect(() => {
    const getTodos = async () => {
      if (apiStatus === 'idle') {
        const before = dispatch(fetchTodos());
        console.log(before);
        console.log(await before.unwrap());
      }
    };

    getTodos();
  }, [apiStatus, dispatch]);

  const handleCheck = event => {
    //TODO: When checkbox is checked remove the todo from the redux store
    console.count('Checkbox function');
  };

  return (
    <>
      {apiStatus === 'loading' ? (
        <Skeleton>
          <Box p={5} minW={750}></Box>
        </Skeleton>
      ) : apiStatus === 'failed' ? (
        <ErrorMessage error={apiErrorMessage} />
      ) : (
        <>
          {todoListdata.map(todo => (
            <VStack spacing={8} key={todo.key}>
              <Box
                p={5}
                minW={750}
                shadow="md"
                borderWidth="1px"
                d="flex"
                justifyContent="flex-start"
              >
                <Checkbox
                  colorScheme="purple"
                  size="lg"
                  spacing="2rem"
                  onChange={handleCheck}
                >
                  <Text>{todo.value}</Text>
                </Checkbox>
              </Box>
            </VStack>
          ))}
        </>
      )}
    </>
  );
}
