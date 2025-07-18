import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

// Force full reload when HMR detects changes
if (import.meta.hot) {
  import.meta.hot.accept(() => {
    window.location.reload();
  });
}
