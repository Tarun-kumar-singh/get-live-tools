import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteSettings, TypographySettings } from "./setting";


const theme: ThemeOptions = createTheme({

    components:{
      MuiTab:{
        styleOverrides:{
          root:{
            '&:hover': { color: '#0ddca6', opacity: 1 }, 
              
          }
        } 
      },
          MuiTabs:{
            styleOverrides:{
              root:{
                boxShadow: 'none',
                '& .Mui-selected': { color: '#0ddca6' },
                '& .MuiTabs-indicator': { display: 'none' }
              }
            } 
          }
        },

    palette: {
      ...PaletteSettings
      },
      typography: {
        ...TypographySettings
      },
});

export default theme;