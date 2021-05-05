import { extendTheme } from '@chakra-ui/react';
import { createBreakpoints } from '@chakra-ui/theme-tools';

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
});

const theme = extendTheme({
  colors: {
    white: '#FFF',
    black: '#18181C',
    red: '#CD0618',
    offWhite: '#F5F5F5',
    grayText: '#565857',
    grayDark: '#333',
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
  fontSizes: {
    sm: '1rem',
    md: '2.5rem',
  },
  radii: {
    sm: '5px',
  },
  sizes: {
    xs: '15.5rem',
    def: '7.5rem',
  },
  breakpoints,
  styles: {
    global: {
      '*': {
        scrollBehavior: 'smooth',

        '&::-webkit-scrollbar': {
          width: ['0', '0', '10px'],
        },

        '&::-webkit-scrollbar-track': {
          bg: 'offWhite',
        },

        '&::-webkit-scrollbar-thumb': {
          bg: 'black',
          boxShadow: 'inset 0 0 0 1px offWhite',
          borderRadius: '10px',
        },
      },
    },
  },
});

export default theme;
