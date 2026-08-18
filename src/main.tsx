import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import logoUrl from './assets/images/rishu_sir_logo_1786638561837.jpg';

// Ensure browser tab favicon dynamically points to Rishu Sir logo
function initFavicon() {
  const head = document.head || document.getElementsByTagName('head')[0];
  const existingIcons = head.querySelectorAll("link[rel*='icon']");
  existingIcons.forEach((el) => el.remove());

  const linkPng = document.createElement('link');
  linkPng.rel = 'icon';
  linkPng.type = 'image/jpeg';
  linkPng.href = logoUrl;
  head.appendChild(linkPng);

  const linkShortcut = document.createElement('link');
  linkShortcut.rel = 'shortcut icon';
  linkShortcut.href = logoUrl;
  head.appendChild(linkShortcut);

  const linkApple = document.createElement('link');
  linkApple.rel = 'apple-touch-icon';
  linkApple.href = logoUrl;
  head.appendChild(linkApple);
}

initFavicon();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
