import { ChakraProvider, Heading, Text, VStack, Box, Flex } from '@chakra-ui/react'
import { SaladSpinner } from './components/SaladSpinner'

function App() {
  return (
    <ChakraProvider>
      <Box bg="#1a332c" minH="100vh" width="100vw" overflowX="hidden">
        <Flex minH="100vh" align="center" justify="center" width="100%">
          <VStack gap={8} alignItems="center" width="100%">
            <Heading size="2xl" color="white">Salad Spinner</Heading>
            <Text fontSize="lg" color="gray.300">
              Spin to create your perfect salad combination!
            </Text>
            <Box width="100%">
              <SaladSpinner />
            </Box>
          </VStack>
        </Flex>
      </Box>
    </ChakraProvider>
  )
}

export default App
