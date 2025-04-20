// src/context/WalletContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null);

  // Function to connect the wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask not detected. Please install the MetaMask extension.');
      return;
    }

    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      if (accounts.length === 0) {
        alert('No accounts found. Please try again.');
      } else {
        setAccount(accounts[0]);
      }
    } catch (err) {
      console.error('MetaMask connection error:', err);
      alert('Failed to connect to MetaMask. Please try again.');
    }
  };

  // Function to check if wallet is already connected
  const checkWalletConnected = async () => {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length) {
        setAccount(accounts[0]);
      }
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      // Event listener for account changes
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0] || null);
      });

      // Event listener for network changes
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    checkWalletConnected();

    // Cleanup listeners when component unmounts
    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  return (
    <WalletContext.Provider value={{ account, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);
