import { createTheme } from '@mui/material/styles';
import { light } from '@mui/material/styles/createPalette';
import { height } from '@mui/system';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#F6FCFC',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      /* light: '#0066ff', */
      main: '#1976d2',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#fff',
      light: '#42a5f5',
      dark: '#1565c0'
    },
    // Provide every color token (light, main, dark, and contrastText) when using
    // custom colors for props in Material UI's components.
    // Then you will be able to use it like this: `<Button color="custom">`
    // (For TypeScript, you need to add module augmentation for the `custom` value)
    custom: {
      light: '#ffa726',
      main: '#f57c00',
      dark: '#ef6c00',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    common: {
        black: '#000',
        white: '#fff'
    },

    error:{
        main: '#d32f2f',
        light: '#ef5350',
        dark: '#c62828',
        contrastText: '#fff'
    },
    warning: {
        main: '#ed6c02',
        light: '#ff9800',
        dark: '#e65100',
        contrastText: '#fff'
    },
    
    info: {
        main: '#0288d1',
        light: '#03a9f4',
        dark:  '#01579b',
        contrastText: '#fff'
    },
    success: {
        main: '#2e7d32',
        light: '#4caf50',
        dark: '#1b5e20',
        contrastText: '#fff'
},
    text: {
        primary: 'rgba(0, 0, 0, 0.87)',
        secondary: 'rgba(0, 0, 0, 0.6)',
        disabled: 'rgba(0, 0, 0, 0.38)'
},
    background: {
        paper: '#F6FCFC',
        default: '#FFF'
    },
    unstable_sxConfig: {
        bgcolor: {
            themeKey: 'palette',
            transform: 'f if()',
            cssProperty: 'backgroundColor'
        },
        backgroundColor: {
            themeKey: 'palette',
            transform: 'f i()'
        }
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  components: {
    MuiAutocomplete: {
      defaultProps: {
        sx: {
          width: '300px',
          backgroundColor: '#FFF',
          padding: '0px',
          lineHeight: '10px',
          popper: {
            backgroundColor: 'black'
          },
          listbox:{
            backgroundColor: 'pink'
          },
          input: {
            borderRadius: '10px',
            border: '4px'
          },
          paper:{
            backgroundColor: 'black'
          },
          option: {
            backgroundColor: 'black'
          },
          MuiTextField: {
            backgroundColor: 'black'
          }
          
          /* borderRadius: '30%', */
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        sx: {
          padding: '0px'
          /* borderRadius: '30%' */
        }
      }
    },
    MuiBox: {
      defaultProps: {
        root: {
          background: '#F6FCFC',
          backgroundColor: '#F6FCFC',
          bgcolor: '#F6FCFC',
          border: 'border: 1px solid #575756'
          
        },
        sx: {
          backgroundColor: '#F6FCFC',
          border: '1px solid #575756'
        }
      }
    }
  }
});

export default theme;