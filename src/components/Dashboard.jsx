import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import BalanceCard from "./BalanceCard";
import TransactionsList from "./TransactionsList";
import JettonsList from "./JettonsList";
import NFTGallery from "./NFTGallery";

const Dashboard = ({ data, loading, error, onRefresh }) => {
  if (error) {
    return (
      <div className="glass-strong rounded-2xl p-8 text-center">
        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-primary-white mb-2">
          Error Loading Data
        </h3>
        <p className="text-primary-white/70 mb-4">{error}</p>
        <button
          onClick={onRefresh}
          className="btn-primary flex items-center gap-2 mx-auto"
        >
          <RefreshCw className="w-4 h-4" />
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Balance Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <BalanceCard
            balance={data.balance}
            loading={loading}
            onRefresh={onRefresh}
          />
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="glass rounded-xl p-4">
            <div className="text-2xl font-bold text-primary-white">
              {loading ? (
                <div className="h-8 bg-primary-white/20 rounded shimmer w-16"></div>
              ) : (
                data.transactions.length
              )}
            </div>
            <div className="text-sm text-primary-white/70">Transactions</div>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="text-2xl font-bold text-primary-white">
              {loading ? (
                <div className="h-8 bg-primary-white/20 rounded shimmer w-16"></div>
              ) : (
                data.jettons.length
              )}
            </div>
            <div className="text-sm text-primary-white/70">Jetton Assets</div>
          </div>

          <div className="glass rounded-xl p-4">
            <div className="text-2xl font-bold text-primary-white">
              {loading ? (
                <div className="h-8 bg-primary-white/20 rounded shimmer w-16"></div>
              ) : (
                data.nfts.length
              )}
            </div>
            <div className="text-sm text-primary-white/70">NFTs</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          <TransactionsList
            transactions={data.transactions}
            loading={loading}
          />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <JettonsList jettons={data.jettons} loading={loading} />

          <NFTGallery nfts={data.nfts} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
