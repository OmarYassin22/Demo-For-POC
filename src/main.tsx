import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import App from './App';
import './index.css';
import { Analytics } from "@vercel/analytics/react"
import { getConfigValue } from './config/clientConfigUtils';

// Set document title and favicon from client configuration
document.title = getConfigValue('meta.title', 'Benaa Pro');
const favicon = document.querySelector('link[rel="icon"]');
if (favicon) {
  favicon.setAttribute('href', getConfigValue('favicon', '/src/Assets/image/favicon.ico'));
}

createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
    <Analytics />
  </AppProvider>
);