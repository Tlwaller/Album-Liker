import React from 'react';
import './Styles/main.scss';
import Routes from './Routes';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#333333"
    },
    secondary: {
      light: "#22ff6f",
      main: "#1dd15c"
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme} className="App">
      {Routes}
    </ThemeProvider>
  );
}

export default App;
