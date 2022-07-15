import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import theme from "../config/mui";
import { Paper } from '@mui/material';
import { useState } from 'react';
import DarkModeContext from '../context/DarkModeContext';
import { PaletteSettings } from '../config/setting';

function MyApp({ Component, pageProps }: AppProps) {

  const [newTheme, setNewTheme] = useState(theme)

  const handleDarkModeChange = () => {
    setNewTheme(createTheme({
      ...newTheme,
      palette: {
        mode: newTheme.palette?.mode === 'light' ? 'dark' : 'light',
        ...PaletteSettings        
      },
    }))
  }
 
  return (
          <DarkModeContext.Provider value={{ handleDarkModeChange }}>
            <ThemeProvider theme={newTheme}>
                  <Paper elevation={0} square={true} style={{ minHeight: '100vh'}}>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                  </Paper>
            </ThemeProvider>
          </DarkModeContext.Provider>
        )
}

export default MyApp
