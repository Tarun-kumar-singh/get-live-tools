import { createTheme, ThemeOptions } from '@mui/material/styles';
import { PaletteSettings, TypographySettings } from "./setting";


const theme: ThemeOptions = createTheme({
    palette: {
      ...PaletteSettings
      },
      typography: {
        ...TypographySettings
      },
});

export default theme;