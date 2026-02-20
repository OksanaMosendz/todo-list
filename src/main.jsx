import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter }  from 'react-router-dom';
import { StateProvider } from './stateContext.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StateProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </StateProvider>
  </StrictMode>
);
