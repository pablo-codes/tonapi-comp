import { useState, useEffect } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';

export const useTonConnect = () => {
  const [tonConnectUI] = useTonConnectUI();
  const [wallet, setWallet] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (tonConnectUI.account?.address) {
        setWallet({
          address: tonConnectUI.account.address,
          chain: tonConnectUI.account.chain,
          publicKey: tonConnectUI.account.publicKey
        });
        setConnected(true);
      } else {
        setWallet(null);
        setConnected(false);
      }
    };

    checkWalletConnection();

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        setWallet({
          address: wallet.account.address,
          chain: wallet.account.chain,
          publicKey: wallet.account.publicKey
        });
        setConnected(true);
      } else {
        setWallet(null);
        setConnected(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [tonConnectUI]);

  const connectWallet = async () => {
    try {
      await tonConnectUI.openModal();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const disconnectWallet = async () => {
    try {
      await tonConnectUI.disconnect();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return {
    wallet,
    connected,
    connectWallet,
    disconnectWallet,
    tonConnectUI
  };
};