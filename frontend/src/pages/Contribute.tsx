import * as React from 'react';
import { PaletteMode } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from '../components/landingPage/Footer';
import ContributeInfo from '../components/landingPage/ContributeInfo';
// import getLPTheme from '../components/landingPage/getLPTheme';



export default function Contribute() {
  //@ts-expect-error unused
  const [mode, setMode] = React.useState<PaletteMode>('light');
  // const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  // const LPtheme = createTheme(getLPTheme(mode));
  // const defaultTheme = createTheme({ palette: { mode } });



  return (
    // <ThemeProvider theme={defaultTheme}>
    <>
      <CssBaseline />
      <Box width={"100%"}>
      <ContributeInfo />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Divider />
        <Footer />
      </Box>
      </Box>
      </>
    // </ThemeProvider>
  );
}