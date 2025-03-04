import { ChakraProvider, Heading, VStack, Box, Flex, Image } from '@chakra-ui/react'
import { SaladSpinner } from './components/SaladSpinner'

function App() {
  return (
    <ChakraProvider>
      <Box 
        bg="#1a332c" 
        minH="100vh" 
        width="100vw" 
        overflowX="hidden"
        role="application"
        aria-label="Salad Spinner Application"
      >
        <Flex 
          minH="100vh" 
          align="center" 
          justify="center" 
          width="100%" 
          px={{ base: 4, md: 8 }}
          py={{ base: 6, md: 8 }}
        >
          <VStack 
            gap={{ base: 4, md: 8 }} 
            alignItems="center" 
            width="100%" 
            maxW="1400px" 
            mx="auto"
            as="main"
          >
            <Box 
              width={{ base: "80px", md: "120px" }}
              height={{ base: "80px", md: "120px" }}
              mb={{ base: 1, md: 2 }}
              transition="all 0.5s ease-in-out"
              _hover={{ 
                transform: "rotate(360deg)",
                filter: "drop-shadow(0 0 80px rgba(76, 175, 80, 0.6))",
                cursor: "pointer"
              }}
              role="img"
              aria-label="Salad Spinner Logo - Click to animate"
            >
              <Image
                src="/icons/icon.svg"
                alt="Salad Spinner Logo"
                width="100%"
                height="100%"
                objectFit="contain"
                loading="eager"
                style={{ willChange: "transform" }}
              />
            </Box>
            <Heading 
              size={{ base: "xl", md: "2xl" }} 
              color="white" 
              textAlign="center"
              as="h1"
            >
              Salad Spinner
            </Heading>
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
