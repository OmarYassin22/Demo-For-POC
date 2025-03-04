import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from './context/AppContext';
import App from './App';
import './index.css';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"


createRoot(document.getElementById('root')!).render(
    <AppProvider>
      <App />
      <Analytics />
    <SpeedInsights/>
    </AppProvider>
);