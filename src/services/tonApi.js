import { Buffer } from 'buffer';
window.Buffer = Buffer;
import { TonApiClient } from '@ton-api/client';

const tonApi = new TonApiClient({
  baseUrl: 'https://tonapi.io',
  apiKey: undefined // Using public API
});

export const tonApiService = {
  // Get account information including balance
  async getAccountInfo(address) {
    try {
      const account = await tonApi.accounts.getAccount(address);
      return {
        balance: account.balance,
        status: account.status,
        address: account.address
      };
    } catch (error) {
      console.error('Error fetching account info:', error);
      throw new Error('Failed to fetch account information');
    }
  },

  // Get account transactions
  async getAccountTransactions(address, limit = 20) {
    try {
      const events = await tonApi.accounts.getAccountEvents(address, {
        limit,
        subject_only: false
      });

      return events.events.map(event => ({
        hash: event.event_id,
        timestamp: event.timestamp,
        type: this.getTransactionType(event),
        amount: this.getTransactionAmount(event),
        fee: event.fee?.total || 0,
        success: event.is_scam === false,
        description: this.getTransactionDescription(event)
      }));
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new Error('Failed to fetch transactions');
    }
  },

  // Get account jettons (fungible tokens)
  async getAccountJettons(address) {
    try {
      const jettons = await tonApi.accounts.getAccountJettonsBalances(address);

      return jettons.balances.map(jetton => ({
        address: jetton.jetton.address,
        name: jetton.jetton.name,
        symbol: jetton.jetton.symbol,
        decimals: jetton.jetton.decimals,
        balance: jetton.balance,
        image: jetton.jetton.image,
        price: jetton.price?.prices?.USD || 0
      }));
    } catch (error) {
      console.error('Error fetching jettons:', error);
      throw new Error('Failed to fetch jetton balances');
    }
  },

  // Get account NFTs
  async getAccountNFTs(address) {
    try {
      const nfts = await tonApi.accounts.getAccountNftItems(address, {
        limit: 50,
        offset: 0
      });

      return nfts.nft_items.map(nft => ({
        address: nft.address,
        name: nft.metadata?.name || 'Unnamed NFT',
        description: nft.metadata?.description || '',
        image: nft.metadata?.image || nft.previews?.[0]?.url,
        collection: {
          name: nft.collection?.name || 'Unknown Collection',
          address: nft.collection?.address
        },
        owner: nft.owner?.address
      }));
    } catch (error) {
      console.error('Error fetching NFTs:', error);
      throw new Error('Failed to fetch NFTs');
    }
  },

  // Helper methods
  getTransactionType(event) {
    if (event.actions?.[0]) {
      const action = event.actions[0];
      if (action.type === 'TonTransfer') return 'transfer';
      if (action.type === 'JettonTransfer') return 'jetton';
      if (action.type === 'NftItemTransfer') return 'nft';
      if (action.type === 'ContractDeploy') return 'deploy';
    }
    return 'unknown';
  },

  getTransactionAmount(event) {
    if (event.actions?.[0]?.TonTransfer) {
      return event.actions[0].TonTransfer.amount;
    }
    if (event.actions?.[0]?.JettonTransfer) {
      return event.actions[0].JettonTransfer.amount;
    }
    return 0;
  },

  getTransactionDescription(event) {
    const action = event.actions?.[0];
    if (!action) return 'Transaction';

    switch (action.type) {
      case 'TonTransfer':
        return 'TON Transfer';
      case 'JettonTransfer':
        return `${action.JettonTransfer?.jetton?.symbol || 'Token'} Transfer`;
      case 'NftItemTransfer':
        return 'NFT Transfer';
      case 'ContractDeploy':
        return 'Contract Deploy';
      default:
        return 'Transaction';
    }
  },

  // Format TON amount from nanotons
  formatTonAmount(nanotons) {
    return (parseInt(nanotons) / 1e9).toFixed(4);
  },

  // Validate TON address
  isValidTonAddress(address) {
    return /^[0-9a-fA-F]{64}$/.test(address.replace(/[:-]/g, '')) ||
      /^[a-zA-Z0-9_-]{48}$/.test(address);
  }
};