import { useState, useEffect, useCallback } from 'react';
import { tonApiService } from '../services/tonApi';
import { Address } from 'ton';
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

    console.log('Fetching dashboard data for:', walletAddress);
    if (!walletAddress || !tonApiService.isValidTonAddress(walletAddress)) {
      setError('Invalid wallet address');
      return;
    }

    console.log('Fetching dashboard data for:', String(walletAddress));

    setLoading(true);
    setError(null);
    walletAddress = Address.parse(walletAddress);
    try {
      // Validate address format

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