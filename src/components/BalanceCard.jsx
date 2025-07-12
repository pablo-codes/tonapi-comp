import React from "react";
import { Coins, RefreshCw, TrendingUp } from "lucide-react";
import { tonApiService } from "../services/tonApi";

const BalanceCard = ({ balance, loading, onRefresh }) => {
  const formatBalance = (nanotons) => {
    if (!nanotons) return "0.0000";
    return tonApiService.formatTonAmount(nanotons);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-400";
      case "uninitialized":
        return "text-yellow-400";
      case "frozen":
        return "text-red-400";
      default:
        return "text-primary-white/70";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active":
        return "Active";
      case "uninitialized":
        return "Uninitialized";
      case "frozen":
        return "Frozen";
      default:
        return "Unknown";
    }
  };

  if (loading) {
    return (
      <div className="glass-strong rounded-2xl p-6 card-hover">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary-blue/20 rounded-xl">
              <Coins className="w-6 h-6 text-primary-blue" />
            </div>
            <div>
              <div className="h-4 bg-primary-white/20 rounded shimmer w-24 mb-2"></div>
              <div className="h-3 bg-primary-white/10 rounded shimmer w-16"></div>
            </div>
          </div>
          <div className="h-8 w-8 bg-primary-white/20 rounded-lg shimmer"></div>
        </div>

        <div className="space-y-3">
          <div className="h-8 bg-primary-white/20 rounded shimmer w-32"></div>
          <div className="h-4 bg-primary-white/10 rounded shimmer w-20"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-2xl p-6 card-hover relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-primary-blue/30 to-blue-500/30 rounded-xl">
            <Coins className="w-6 h-6 text-primary-blue" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-primary-white">
              TON Balance
            </h3>
            <p className="text-sm text-primary-white/70">Current Holdings</p>
          </div>
        </div>

        <button
          onClick={onRefresh}
          className="p-2 hover:bg-primary-white/10 rounded-lg transition-colors group"
          disabled={loading}
        >
          <RefreshCw
            className={`w-5 h-5 text-primary-white/70 group-hover:text-primary-white transition-colors ${
              loading ? "animate-spin" : ""
            }`}
          />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-bold text-primary-white">
              {formatBalance(balance?.balance)}
            </span>
            <span className="text-lg text-primary-blue font-medium">TON</span>
          </div>

          {balance?.status && (
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  balance.status === "active"
                    ? "bg-green-400"
                    : balance.status === "uninitialized"
                    ? "bg-yellow-400"
                    : "bg-red-400"
                }`}
              ></div>
              <span
                className={`text-sm font-medium ${getStatusColor(
                  balance.status
                )}`}
              >
                {getStatusText(balance.status)}
              </span>
            </div>
          )}
        </div>

        <div className="pt-4 border-t border-primary-white/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-primary-white/70">Account Status</span>
            <span className="text-primary-white font-medium">
              {balance?.status ? getStatusText(balance.status) : "Unknown"}
            </span>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-transparent rounded-2xl pointer-events-none"></div>
    </div>
  );
};

export default BalanceCard;
