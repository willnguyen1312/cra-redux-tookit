import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Index from './pages';

function App() {
  return (
    <ChakraProvider>
      <Index />
    </ChakraProvider>
  );
}

export default App;
