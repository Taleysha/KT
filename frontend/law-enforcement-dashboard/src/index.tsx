import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('Application starting...');

const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement);

const root = ReactDOM.createRoot(rootElement as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);