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
    black: '#16161B',
    red: '#BC0412',
    green: '#12BC04',
    offWhite: '#F6F6F6',
    grayText: '#565857',
    grayDark: '#282828',
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Open Sans', sans-serif`,
  },
  fontSizes: {
    sm: '1rem',
    md: '2.25rem',
  },
  radii: {
    sm: '5px',
  },
  sizes: {
    xs: '15rem',
    def: '6.75rem',
  },
  shadows: {
    line: '0 0 3px rgba(0,0,0,0.2)',
    sm: '0 4px 14px rgba(0,0,0,0.1)',
  },
  breakpoints,
  styles: {
    global: {
      '#scrollNone': {
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      },
      '*': {
        scrollBehavior: 'smooth',

        '&::-webkit-scrollbar': {
          width: ['0', '0', '10px'],
        },

        '&::-webkit-scrollbar-track': {
          bg: 'offWhite',
        },

        '&::-webkit-scrollbar-thumb': {
          bg: 'grayDark',
          boxShadow: 'inset 0 0 0 1px offWhite',
          borderRadius: '10px',
        },
      },
    },
  },
});

export default theme;
