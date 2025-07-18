import { Buffer } from 'buffer';
window.Buffer = Buffer;
import { TonApiClient } from '@ton-api/client';
import { Address } from 'ton';

const tonApi = new TonApiClient({
  baseUrl: 'https://tonapi.io',
  apiKey: process.env.REACT_APP_TON_API_KEY
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
        hash: event.eventId,
        incoming: this.getincoming(event),
        timestamp: event.timestamp,
        type: event.actions[0].type,
        amount: event.actions[0].simplePreview.value,
        fee: this.formatTonAmount(event.extra),
        success: event.actions[0].status,
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

      return nfts.nftItems.map(nft => ({
        address: nft.address,
        name: nft.metadata?.name || 'Unnamed NFT',
        description: nft.metadata?.description || '',
        image: nft.previews?.[0]?.url,
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

  getincoming(event) {
    if (event.actions?.[0]) {
      const action = event.actions?.[0];

      return action[action.type].recipient.address.toRawString() == event.account.address.toRawString() ? true : false;
    }
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
  isValidTonAddress(addresse) {
    try {
      const address = Address.parse(addresse);

      return true;
    } catch (e) {
      console.error("Invalid TON base64 address:", e.message);
      return false;
    }
  }
};