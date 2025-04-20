// src/main.jsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { WalletProvider, useWallet } from './context/WalletContext';
import './index.css';

const RedirectHandler = () => {
  const { account } = useWallet();
  const navigate = useNavigate();

  useEffect(() => {
    if (!account) {
      navigate('/welcome');
    }
  }, [account, navigate]);

  return <App />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <RedirectHandler />
      </WalletProvider>
    </BrowserRouter>
  </React.StrictMode>
);
