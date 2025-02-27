import { ChakraProvider, Heading, Text, VStack, Box, Flex } from '@chakra-ui/react'
import { SaladSpinner } from './components/SaladSpinner'

function App() {
  return (
    <ChakraProvider>
      <Box bg="#1a332c" minH="100vh" width="100vw" overflowX="hidden">
        <Flex 
          minH="100vh" 
          align="center" 
          justify="center" 
          width="100%" 
          px={{ base: 4, md: 8 }}
          py={{ base: 6, md: 8 }}
        >
          <VStack gap={{ base: 4, md: 8 }} alignItems="center" width="100%" maxW="1400px" mx="auto">
            <Heading size={{ base: "xl", md: "2xl" }} color="white" textAlign="center">Salad Spinner</Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="gray.300" textAlign="center" px={4}>
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
