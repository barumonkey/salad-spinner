import { useState, useEffect, useMemo } from 'react';
import { Box, Button, Grid, Image, VStack, HStack, Skeleton, Heading, Input, InputGroup, InputLeftElement, Popover, PopoverTrigger, PopoverContent, PopoverBody, List, ListItem, useDisclosure, Icon } from '@chakra-ui/react';
import { SearchIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { AnimatePresence } from 'framer-motion';
import { SaladCategory, saladData } from '../types/salad';
import { badCombos } from '../types/salad'; // TODO: Use this to check for bad combos

// const MotionBox = motion(Box);

interface SpinnerSlotProps {
  category: SaladCategory;
  value: string;
  isLocked: boolean;
  onSpin: () => void;
  onLock: () => void;
  onChange: (value: string) => void;
  isSpinning: boolean;
}

const SpinnerSlot: React.FC<SpinnerSlotProps> = ({
  category, value, isLocked, onSpin, onLock, onChange, isSpinning,
}) => {
  // const controls = useAnimation();
  const [isLoading, setIsLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [displayedItem, setDisplayedItem] = useState(value || category);
  const [searchQuery, setSearchQuery] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const items = saladData[category];

  // Format category name to be more readable
  const formatCategoryName = (cat: string) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  // Filter items based on search query
  const filteredItems = useMemo(() => {
    return items.filter(item => 
      item.toLowerCase().replace(/_/g, ' ').includes(searchQuery.toLowerCase())
    );
  }, [items, searchQuery]);

  const handleSelect = (item: string) => {
    onChange(item);
    onClose();
    setSearchQuery("");
  };
  

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      if (!isLocked && !isSpinning) {
        onSpin();
      }
    }
  };

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setImageError(true);
  };

  useEffect(() => {
    if (!isSpinning) {
      setDisplayedItem(value || category);
      return;
    }

    let frameCount = 0;
    const maxFrames = 1000;
    let timeoutId: number;

    const showNextImage = () => {
      if (frameCount >= maxFrames) {
        setDisplayedItem(value || category);
        return;
      }

      // Calculate increasing delay based on progress
      const progress = frameCount / maxFrames;
      const delay = 50 + Math.floor(450 * progress); // Starts at 50ms, ends at 500ms

      setDisplayedItem(items[Math.floor(Math.random() * items.length)]);
      frameCount++;

      timeoutId = window.setTimeout(showNextImage, delay);
    };

    // Start the animation
    timeoutId = window.setTimeout(showNextImage, 50);

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [isSpinning, value, category, items]);

  return (
    <VStack
      gap={{ base: 1, md: 2 }} p={{ base: 2, md: 3 }}
      borderWidth={1} borderRadius="lg" bg="white" boxShadow="lg" borderColor="green.200"
      height="100%" justify="space-between" role="region" aria-label={`${formatCategoryName(category)} selector`}
    >
      <Heading 
        as="h2" size={{ base: "xs", md: "sm" }} color="gray.700" textTransform="capitalize"
        borderBottom="2px" borderColor="green.400" pb={{ base: 1, md: 2 }} width="100%" textAlign="center"
      >
        {formatCategoryName(category)}
      </Heading>
      
      <Popover isOpen={isOpen} onClose={onClose} placement="bottom" matchWidth>
        <PopoverTrigger>
          <Button
            onClick={onOpen} width="100%" display="flex" justifyContent="space-between" alignItems="center"
            bg="white" borderWidth={1} borderColor="gray.200" _hover={{ borderColor: "gray.300" }}
            isDisabled={isSpinning} rightIcon={<ChevronDownIcon />} size={{ base: "xs", md: "sm" }}
          >
            <HStack spacing={2} width="100%" justify="flex-start">
              {value && (
                <Image
                  src={`./images/${value}.png`}
                  alt={value.replace(/_/g, ' ')}
                  width="20px" height="20px" objectFit="contain"
                />
              )}
              <Box isTruncated>
                {value ? value.replace(/_/g, ' ') : category}
              </Box>
            </HStack>
          </Button>
        </PopoverTrigger>
        <PopoverContent maxH="300px" overflowY="auto">
          <PopoverBody p={2}>
            <InputGroup size="sm" mb={2}>
              <InputLeftElement>
                <Icon as={SearchIcon} color="gray.400" />
              </InputLeftElement>
              <Input
                placeholder="Search ingredients..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} borderRadius="md"
              />
            </InputGroup>
            <List spacing={1}>
              <ListItem
                px={2} py={1} cursor="pointer" _hover={{ bg: "gray.100" }}
                onClick={() => handleSelect("")} display="flex" alignItems="center"
              >
                {category}
              </ListItem>
              {filteredItems.map((item) => (
                <ListItem
                  key={item} px={2} py={1} cursor="pointer" _hover={{ bg: "gray.100" }}
                  onClick={() => handleSelect(item)} display="flex" alignItems="center"
                >
                  <HStack spacing={2} width="100%">
                    <Image
                      src={`./images/${item}.png`}
                      alt={item.replace(/_/g, ' ')}
                      width="24px" height="24px" objectFit="contain"
                    />
                    <Box>{item.replace(/_/g, ' ')}</Box>
                  </HStack>
                </ListItem>
              ))}
              {filteredItems.length === 0 && (
                <ListItem px={2} py={1} color="gray.500">
                  No ingredients found
                </ListItem>
              )}
            </List>
          </PopoverBody>
        </PopoverContent>
      </Popover>
      
      <Box
        width="100%" height={{ base: "120px", md: "180px" }} borderRadius="lg" overflow="hidden" position="relative"
        role="img" aria-label={`${displayedItem.replace(/_/g, ' ')} image`}
      >
        <AnimatePresence mode="popLayout">
          {isLoading && (
            <Skeleton position="absolute" top={0} left={0} width="100%" height="100%" startColor="gray.100" endColor="gray.300"/>
          )}
          <Image
            key={displayedItem}
            src={`./images/${displayedItem}.png`}
            alt={displayedItem.replace(/_/g, ' ')}
            width="100%"
            height="100%"
            objectFit="contain"
            style={{ opacity: isLoading ? 0 : 1 }}
            onLoad={handleImageLoad}
            onError={handleImageError}
            fallback={
              <Box
                width="100%"
                height="100%"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="gray.100"
                color="gray.500"
                fontSize="sm"
                textAlign="center"
                borderRadius="md"
              >
                Image not found
              </Box>
            }
          />
        </AnimatePresence>
      </Box>

      <HStack spacing={{ base: 1, md: 2 }}>
        <Button 
          onClick={onSpin} onKeyDown={handleKeyPress} disabled={isLocked || isSpinning} _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
          bg="gray.700" color="white"
          _hover={{ bg: 'gray.800' }} _active={{ bg: 'gray.900' }} size={{ base: "xs", md: "sm" }} width={{ base: "60px", md: "80px" }}
          aria-label={`Spin ${category} ${isSpinning ? 'in progress' : ''}`}
        >
          {isSpinning ? 'Spinning...' : 'Spin'}
        </Button>
        <Button
          onClick={onLock} bg={isLocked ? "red.700" : "gray.700"} color="white"
          _hover={{ bg: isLocked ? "red.800" : "gray.800" }} _active={{ bg: isLocked ? "red.900" : "gray.900" }} disabled={isSpinning}
          size={{ base: "xs", md: "sm" }} width={{ base: "60px", md: "80px" }}
          aria-label={`${isLocked ? 'Unlock' : 'Lock'} ${category}`} aria-pressed={isLocked}
        >
          {isLocked ? "Unlock" : "Lock"}
        </Button>
      </HStack>
    </VStack>
  );
};

export const SaladSpinner: React.FC = () => {
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [selections, setSelections] = useState<Record<SaladCategory, string>>({
    base: '', crunch: '', soft: '', unexpected: '', protein: '', dressing: ''
  });

  const [lockedSlots, setLockedSlots] = useState<Record<SaladCategory, boolean>>({
    base: false, crunch: false, soft: false, unexpected: false, protein: false, dressing: false
  });

  const [spinningSlots, setSpinningSlots] = useState<Record<SaladCategory, boolean>>({
    base: false, crunch: false, soft: false, unexpected: false, protein: false, dressing: false
  });

  // Add initial spin effect
  useEffect(() => {
    if (!isInitialLoad) return;
    
    // Small delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      spinAll();
      setIsInitialLoad(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [isInitialLoad]); // Only run when isInitialLoad changes

  const spinSlot = async (category: SaladCategory) => {
    if (lockedSlots[category] || spinningSlots[category]) return;

    setSpinningSlots(prev => ({ ...prev, [category]: true }));

    // Simulate spinning delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 500));

    const randomIngredient = saladData[category][Math.floor(Math.random() * saladData[category].length)];
    setSelections(prev => ({
      ...prev,
      [category]: randomIngredient
    }));

    // Add a small delay before stopping the spinning state
    await new Promise(resolve => setTimeout(resolve, 100));
    setSpinningSlots(prev => ({ ...prev, [category]: false }));
  };

  const spinAll = async () => {
    const categories = Object.keys(selections) as SaladCategory[];
    const unlockedCategories = categories.filter(cat => !lockedSlots[cat]);
    
    // Start all spins simultaneously
    await Promise.all(unlockedCategories.map(category => spinSlot(category)));
  };

  const toggleLock = (category: SaladCategory) => {
    if (spinningSlots[category]) return;
    setLockedSlots(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleChange = (category: SaladCategory, value: string) => {
    if (spinningSlots[category]) return;
    setSelections(prev => ({
      ...prev,
      [category]: value
    }));
  };

  return (
    <Box width="100%" maxW="100vw" role="main" aria-label="Salad Spinner Game">
      <Grid
        templateColumns={{base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(6, 1fr)"}}
        gap={{ base: 3, md: 4 }} width="100%" alignItems="stretch" justifyContent="center"
        px={{ base: 2, md: 4 }} role="group" aria-label="Salad ingredient categories"
      >
        {(Object.keys(selections) as SaladCategory[]).map((category) => (
          <SpinnerSlot
            key={category} category={category} value={selections[category]}
            isLocked={lockedSlots[category]} isSpinning={spinningSlots[category]}
            onSpin={() => spinSlot(category)} onLock={() => toggleLock(category)}
            onChange={(value) => handleChange(category, value)}
          />
        ))}
      </Grid>

      <Button
        size={{ base: "lg", md: "lg" }} colorScheme="green" mt={{ base: 6, md: 8 }} onClick={spinAll}
        width={{ base: "150px", md: "200px" }} height={{ base: "150px", md: "200px" }}
        borderRadius="full" mx="auto" display="block"
        disabled={Object.values(spinningSlots).some(Boolean)} _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
        boxShadow="lg" _hover={{ transform: 'scale(1.05)' }} transition="all 0.2s" aria-label="Spin all unlocked ingredients"
      >
        {Object.values(spinningSlots).some(Boolean) ? 'Spinning...' : 'SPIN ALL!'}
      </Button>
    </Box>
  );
}; 

// TODO:
// Add a toggle to switch to "Wonder Jar" mode.
// "Wonder Jar" mode has the following categories and ingredients:
// Protein: Beans, Lentils, Peas, Tofu, Chicken, Turkey
// Veggies: California, Broccoli, Mixed, stirfry, Zucchini and tomatoes, eggplant
// Starch: Rice, Potatoes, Pasta, Quinoa, Bread
// Sauce: Vinaigrette, hot sauce, soy sauce, sour cream, mayonnaise, cheese

// TODO:
// Users should be able to adjust the categories and their contents.
