import { useState, useEffect } from 'react';
import { Box, Button, Grid, Select, Image, VStack, HStack, Skeleton, Heading } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { SaladCategory, saladData } from '../types/salad';
// import { badCombos } from '../types/salad';

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
  category,
  value,
  isLocked,
  onSpin,
  onLock,
  onChange,
  isSpinning,
}) => {
  // const controls = useAnimation();
  const [isLoading, setIsLoading] = useState(true);
  const [displayedItem, setDisplayedItem] = useState(value || category);
  const items = saladData[category];

  // Format category name to be more readable
  const formatCategoryName = (cat: string) => {
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  // Handle image load
  const handleImageLoad = () => {
    setIsLoading(false);
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
      const baseDelay = 100; // Start with 100ms delay
      const maxDelay = 1000; // End with 1000ms delay
      const currentDelay = baseDelay + (maxDelay - baseDelay) * Math.pow(progress, 2);

      setDisplayedItem(items[Math.floor(Math.random() * items.length)]);
      frameCount++;

      timeoutId = window.setTimeout(showNextImage, currentDelay);
    };

    // Start the animation
    timeoutId = window.setTimeout(showNextImage, 100);

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [isSpinning, value, category, items]);

  return (
    <VStack 
      gap={2} 
      p={3} 
      borderWidth={1} 
      borderRadius="lg" 
      bg="white" 
      boxShadow="lg"
      borderColor="green.200"
      height="100%"
      justify="space-between"
    >
      <Heading 
        size="sm" 
        color="gray.700"
        textTransform="capitalize"
        borderBottom="2px"
        borderColor="green.400"
        pb={2}
        width="100%"
        textAlign="center"
      >
        {formatCategoryName(category)}
      </Heading>
      <Select
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
        width="150px"
        size="sm"
      >
        <option value="">{category}</option>
        {items.map((item) => (
          <option key={item} value={item}>
            {item.replace(/_/g, ' ')}
          </option>
        ))}
      </Select>
      
      <Box
        width="150px"
        height="180px"
        borderRadius="lg"
        overflow="hidden"
        position="relative"
      >
        <AnimatePresence mode="popLayout">
          {isLoading && (
            <Skeleton
              position="absolute"
              top={0}
              left={0}
              width="100%"
              height="100%"
              startColor="gray.100"
              endColor="gray.300"
            />
          )}
          <Image
            key={displayedItem}
            src={`/images/${displayedItem}.png`}
            alt={displayedItem}
            width="100%"
            height="100%"
            objectFit="contain"
            style={{ opacity: isLoading ? 0 : 1 }}
            onLoad={handleImageLoad}
          />
        </AnimatePresence>
      </Box>

      <HStack spacing={2}>
        <Button 
          onClick={onSpin} 
          disabled={isLocked || isSpinning}
          _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
          bg="gray.700"
          color="white"
          _hover={{ bg: 'gray.800' }}
          _active={{ bg: 'gray.900' }}
          size="sm"
          width="80px"
        >
          {isSpinning ? 'Spinning...' : 'Spin'}
        </Button>
        <Button
          onClick={onLock}
          bg={isLocked ? "red.700" : "gray.700"}
          color="white"
          _hover={{ bg: isLocked ? "red.800" : "gray.800" }}
          _active={{ bg: isLocked ? "red.900" : "gray.900" }}
          disabled={isSpinning}
          size="sm"
          width="80px"
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
    base: '',
    crunch: '',
    soft: '',
    unexpected: '',
    protein: '',
    dressing: ''
  });

  const [lockedSlots, setLockedSlots] = useState<Record<SaladCategory, boolean>>({
    base: false,
    crunch: false,
    soft: false,
    unexpected: false,
    protein: false,
    dressing: false
  });

  const [spinningSlots, setSpinningSlots] = useState<Record<SaladCategory, boolean>>({
    base: false,
    crunch: false,
    soft: false,
    unexpected: false,
    protein: false,
    dressing: false
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
    <Box width="100%" maxW="100vw">
      <Grid
        templateColumns="repeat(6, minmax(0, 1fr))"
        gap={4}
        width="100%"
        alignItems="stretch"
        justifyContent="center"
        px={4}
      >
        {(Object.keys(selections) as SaladCategory[]).map((category) => (
          <SpinnerSlot
            key={category}
            category={category}
            value={selections[category]}
            isLocked={lockedSlots[category]}
            isSpinning={spinningSlots[category]}
            onSpin={() => spinSlot(category)}
            onLock={() => toggleLock(category)}
            onChange={(value) => handleChange(category, value)}
          />
        ))}
      </Grid>

      <Button
        size="lg"
        colorScheme="green"
        mt={8}
        onClick={spinAll}
        width="200px"
        height="200px"
        borderRadius="full"
        mx="auto"
        display="block"
        disabled={Object.values(spinningSlots).some(Boolean)}
        _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
        boxShadow="lg"
        _hover={{ transform: 'scale(1.05)' }}
        transition="all 0.2s"
      >
        {Object.values(spinningSlots).some(Boolean) ? 'Spinning...' : 'SPIN ALL!'}
      </Button>
    </Box>
  );
}; 