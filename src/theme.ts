import { Montserrat } from 'next/font/google';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const montserrat = Montserrat({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Create a theme instance.
const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: 'rgba(27, 33, 80, 1)',
      },
      background: {
        default: '04041#3',
      },
      secondary: {
        main: '#4f5b9a',
      },
    },
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: ({ theme }) => ({
            ...theme.typography.caption,
            fontWeight: 500,
            maxWidth: 360, // to accomodate for long address in FancyAddress
            borderRadius: 4,
            border:
              theme.palette.mode === 'dark'
                ? `1px solid ${theme.palette.grey[300]}`
                : `1px solid ${theme.palette.grey[700]}`,
            color: theme.palette.mode === 'dark' ? theme.palette.common.black : theme.palette.common.white,
            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.common.black,
          }),
          arrow: ({ theme }) => ({
            color: theme.palette.mode === 'dark' ? theme.palette.grey[100] : theme.palette.common.black,
            '&:before': {
              border:
                theme.palette.mode === 'dark'
                  ? `1px solid ${theme.palette.grey[300]}`
                  : `1px solid ${theme.palette.grey[700]}`,
            },
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 999,
            paddingLeft: 16,
            paddingRight: 16,

            '&.Mui-focused fieldset.MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
              transition: 'border ease-in-out 200ms',
              borderWidth: 1,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            boxShadow: 'none!important',
            textTransform: 'none',
            borderRadius: 999,
            minWidth: 110,
            fontWeight: 600,
            minHeight: 42,
            whiteSpace: 'nowrap',
          },
          outlined: {
            borderWidth: '2px !important',
          },
          sizeLarge: {
            minHeight: 54,
            minWidth: 180,
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration: 'none',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          outlined: {
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 24,
            background:
              'linear-gradient(109.31deg, #1b1b4e 0.09%, rgba(24, 30, 74, 0.45) 73.5%), linear-gradient(0deg, #131737, #101330)',
          },
        },
      },
    },
    typography: {
      fontFamily: montserrat.style.fontFamily,
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 800,
        md: 1200,
        lg: 1468,
        xl: 1536,
      },
    },
  }),
);

export default theme;
