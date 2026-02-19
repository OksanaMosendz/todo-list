import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { StateProvider } from './stateContext.jsx';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </StrictMode>
);
