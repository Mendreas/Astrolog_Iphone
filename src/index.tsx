import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(`${process.env.PUBLIC_URL}/sw.js`)
      .then(reg => {
        reg.onupdatefound = () => {
          const worker = reg.installing;
          if (worker) {
            worker.onstatechange = () => {
              if (worker.state === 'installed' && navigator.serviceWorker.controller) {
                console.log('New version available — reload to update.');
              }
            };
          }
        };
      })
      .catch(err => console.error('Service worker registration failed:', err));
  });
}

reportWebVitals();
