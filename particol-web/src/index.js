import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { ColorModeContextProvider } from './ThemeContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <ColorModeContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ColorModeContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);