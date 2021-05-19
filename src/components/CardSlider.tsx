import {
  Flex,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Stack,
  StackProps,
} from '@chakra-ui/react';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

interface Props extends StackProps {
  title: string;
}

function CardSlider({ title, children, ...rest }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const [isScrollable, setIsScrollable] = useState(true);

  const handleSliderChange = useCallback((val: number) => {
    if (!sliderRef.current) return;

    const { scrollWidth } = sliderRef.current;

    const { width } = sliderRef.current.getBoundingClientRect();

    const widthToScroll = scrollWidth - width;

    if (widthToScroll <= 1) {
      setIsScrollable(false);
    }

    const left = (widthToScroll / 100) * val;

    sliderRef.current.scrollTo({ left });
  }, []);

  useEffect(() => {
    handleSliderChange(0);
  }, []);

  return (
    <Flex flexDir="column" width="100%" height="fit-content">
      <Heading
        color="grayDark"
        fontSize={['2rem', 'md']}
        paddingLeft={['1.5rem', '2.5rem', '5rem', '7.5rem', '15rem']}
        paddingRight={['.5rem', '2.5rem', '5rem', '7.5rem', '15rem']}
      >
        {title}
      </Heading>
      <Flex
        flex={1}
        ref={sliderRef}
        overflowX="auto"
        __css={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollBehavior: 'smooth',
        }}
      >
        <Stack
          direction="row"
          paddingX={['1.5rem', '2.5rem', '5rem', '7.5rem', '15rem']}
          paddingY={['1.5rem', '1.5rem', '2.25rem']}
          spacing="1rem"
          width="fit-content"
          {...rest}
        >
          {children}
        </Stack>
      </Flex>
      <Slider
        defaultValue={0}
        width="30vw"
        step={10}
        display={isScrollable ? ['none', 'none', 'inherit'] : 'none'}
        alignSelf="center"
        onChange={handleSliderChange}
      >
        <SliderTrack bg="offWhite">
          <SliderFilledTrack bg="grayDark" />
        </SliderTrack>
        <SliderThumb
          boxSize={5}
          _focus={{}}
          _active={{ boxSize: 6 }}
          _hover={{ boxSize: 6 }}
          transition=".2s ease"
          bg="grayDark"
        />
      </Slider>
    </Flex>
  );
}

export default memo(CardSlider);
