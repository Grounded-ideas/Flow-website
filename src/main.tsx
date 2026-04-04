import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import ReactGA from 'react-ga4';
import App from './App.tsx';
import './index.css';

// Initialize Google Analytics
ReactGA.initialize('G-G421XCL4ZX');
ReactGA.send("pageview");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
