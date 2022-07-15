import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteSettings, TypographySettings } from "./setting";


const theme: ThemeOptions = createTheme({

    components:{
      MuiTabs:{
        styleOverrides:{
          root:{
            // background: 'red',
            // '&.hover': { color: 'green' }
            // '&:hover': { color: 'secondary.main', opacity: 1 }, 
            // '& .Mui-selected': { color: 'secondary.main' }
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