import { useState, useEffect, useCallback } from 'react';
import { tonApiService } from '../services/tonApi';

export const useDashboardData = (address) => {
  const [data, setData] = useState({
    balance: null,
    transactions: [],
    jettons: [],
    nfts: []
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDashboardData = useCallback(async (walletAddress) => {
    if (!walletAddress || !tonApiService.isValidTonAddress(walletAddress)) {
      setError('Invalid wallet address');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const [accountInfo, transactions, jettons, nfts] = await Promise.allSettled([
        tonApiService.getAccountInfo(walletAddress),
        tonApiService.getAccountTransactions(walletAddress),
        tonApiService.getAccountJettons(walletAddress),
        tonApiService.getAccountNFTs(walletAddress)
      ]);

      setData({
        balance: accountInfo.status === 'fulfilled' ? accountInfo.value : null,
        transactions: transactions.status === 'fulfilled' ? transactions.value : [],
        jettons: jettons.status === 'fulfilled' ? jettons.value : [],
        nfts: nfts.status === 'fulfilled' ? nfts.value : []
      });

      // Set error if any critical data failed to load
      if (accountInfo.status === 'rejected') {
        setError(accountInfo.reason.message);
      }
    } catch (err) {
      setError('Failed to fetch wallet data');
      console.error('Dashboard data fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshData = useCallback(() => {
    if (address) {
      fetchDashboardData(address);
    }
  }, [address, fetchDashboardData]);

  useEffect(() => {
    if (address) {
      fetchDashboardData(address);
    } else {
      setData({
        balance: null,
        transactions: [],
        jettons: [],
        nfts: []
      });
      setError(null);
    }
  }, [address, fetchDashboardData]);

  return {
    data,
    loading,
    error,
    refreshData
  };
};