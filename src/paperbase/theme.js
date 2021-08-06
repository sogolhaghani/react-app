import { createMuiTheme, ThemeProvider, withStyles, lighten } from '@material-ui/core/styles';

let theme = createMuiTheme({
    palette: {
      primary: {
        light:'#4782da',
        main: '#376fd0',
        dark: '#264d91',
      },
    },
    typography: {
      fontFamily: ['Samim', "'Helvetica Neue'", 'Helvetica', 'Arial', 'sans-serif'].join(","),
      fontSize: 16,
      fontWeightLight: "100",
      fontWeightRegular: "400",
      fontWeightMedium: "700",
      fontWeightBold: "900",
      h5: {
        fontWeight: 500,
        fontSize: 26,
        letterSpacing: 0.5,
      },    
    },
    shape: {
      borderRadius: 8,
    },
    props: {
      MuiTab: {
        disableRipple: true,
      },
    },
    mixins: {
      toolbar: {
        minHeight: 48,
      },
    },
    direction: 'rtl',
  });
  
  theme = {
    
    ...theme,
    overrides: {
      selected: {
        paper: {
          backgroundColor: '#18202c',
        },
      },
      MuiButton: {
        label: {
          textTransform: 'none',
        },
        contained: {
          boxShadow: 'none',
          '&:active': {
            boxShadow: 'none',
          },
        },
      },
      MuiTabs: {
        root: {
          marginLeft: theme.spacing(1),
        },
        indicator: {
          height: 3,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: theme.palette.common.white,
        },
      },
      MuiTab: {
        root: {
          textTransform: 'none',
          margin: '0 16px',
          minWidth: 0,
          padding: 0,
          [theme.breakpoints.up('md')]: {
            padding: 0,
            minWidth: 0,
          },
        },
      },
      MuiIconButton: {
        root: {
          padding: theme.spacing(1),
        },
      },
      MuiTooltip: {
        tooltip: {
          borderRadius: 4,
        },
      },
      MuiListItemText: {
        primary: {
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
      MuiListItemIcon: {
        root: {
          color: 'inherit',
          marginRight: 0,
          '& svg': {
            fontSize: 20,
          },
        },
      },
      MuiAvatar: {
        root: {
          width: 32,
          height: 32,
        },
      },
      MuiTableRow: {
        root: {  
          "&$selected": { backgroundColor: lighten(theme.palette.primary.light, 0.85), }  , 
          '&$selected:hover' : {backgroundColor: lighten(theme.palette.primary.light, 0.80)}
        }
      },
      MuiCheckbox :{
        root: {  
          // color : theme.palette.primary.light,
          "&$checked": { color: theme.palette.primary.light, }, 
        },
        checked: {},
      }
    }
  };

  export default theme;