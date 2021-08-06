import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

import Samim from './fonts/iran_sans.woff';
// import SamimBold from './fonts/iranian-sans.woff2';


// import Samim from './fonts/Samim.woff2';
// import SamimBold from './fonts/Samim-Bold.woff2';


const saminFont = {
  fontFamily: 'Samim',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 100,
  src: `local('Samim'),url(${Samim})`,
}


// A custom theme for this app
const theme = createMuiTheme({
  typography: {
    fontFamily: ['Samim', "'Helvetica Neue'", 'Helvetica', 'Arial', 'sans-serif'].join(","),
    fontSize: 14,
    fontWeightLight: "100",
    fontWeightRegular: "300",
    fontWeightMedium: "900",
  },
  palette: {
    primary: {
      light:'#4782da',
      main: '#376fd0',
      dark: '#264d91', 
    },
    secondary: {
      main: '#19857b',
      dark: '#1e293a',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#F7F9FC',
    },
  },
  direction: 'rtl',
  
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [saminFont],
        html: {
          height : '100%',
          boxSizing: 'border-box',
          direction: 'ltr'
        },
        body:{
          height : '100%',
          boxSizing: 'border-box',
        },
        "*, *::before, *::after": {
          boxSizing: "content-box",
        },
        "#root":{
          height : '100%',
          display : 'flex',
         
        }
      },
    },
  },
});

export default theme;
