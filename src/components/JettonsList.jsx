import React, { useState } from "react";
import { Coins, DollarSign, TrendingUp, ChevronDown } from "lucide-react";

const JettonsList = ({ jettons, loading }) => {
  const [showAll, setShowAll] = useState(false);

  const formatBalance = (balance, decimals) => {
    const divisor = Math.pow(10, decimals || 9);
    return (parseInt(balance) / divisor).toLocaleString(undefined, {
      maximumFractionDigits: 4,
    });
  };

  const formatUSDValue = (balance, decimals, price) => {
    if (!price) return null;
    const tokenAmount = parseInt(balance) / Math.pow(10, decimals || 9);
    const usdValue = tokenAmount * price;
    return usdValue.toLocaleString(undefined, {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const displayedJettons = showAll ? jettons : jettons.slice(0, 6);

  if (loading) {
    return (
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Coins className="w-5 h-5 text-primary-blue" />
          <h3 className="text-lg font-semibold text-primary-white">
            Jetton Assets
          </h3>
        </div>

        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-primary-white/5 rounded-xl"
            >
              <div className="w-12 h-12 bg-primary-white/20 rounded-full shimmer"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-primary-white/20 rounded shimmer w-24"></div>
                <div className="h-3 bg-primary-white/10 rounded shimmer w-16"></div>
              </div>
              <div className="text-right space-y-2">
                <div className="h-4 bg-primary-white/20 rounded shimmer w-20"></div>
                <div className="h-3 bg-primary-white/10 rounded shimmer w-16"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (jettons.length === 0) {
    return (
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Coins className="w-5 h-5 text-primary-blue" />
          <h3 className="text-lg font-semibold text-primary-white">
            Jetton Assets
          </h3>
        </div>

        <div className="text-center py-12">
          <Coins className="w-12 h-12 text-primary-white/50 mx-auto mb-4" />
          <p className="text-primary-white/70">No jetton assets found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Coins className="w-5 h-5 text-primary-blue" />
          <h3 className="text-lg font-semibold text-primary-white">
            Jetton Assets
          </h3>
          <span className="px-2 py-1 bg-primary-blue/20 text-primary-blue text-xs rounded-full">
            {jettons.length}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {displayedJettons.map((jetton, index) => (
          <div
            key={jetton.address || index}
            className="flex items-center gap-4 p-4 bg-primary-white/5 hover:bg-primary-white/10 rounded-xl transition-colors group"
          >
            <div className="flex-shrink-0">
              {jetton.image ? (
                <img
                  src={jetton.image}
                  alt={jetton.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : null}
              <div
                className="w-12 h-12 bg-gradient-to-br from-primary-blue/30 to-blue-500/30 rounded-full flex items-center justify-center"
                style={{ display: jetton.image ? "none" : "flex" }}
              >
                <Coins className="w-6 h-6 text-primary-blue" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-primary-white truncate">
                  {jetton.name || "Unknown Token"}
                </span>
                <span className="px-2 py-1 bg-primary-white/10 text-primary-white/80 text-xs rounded-full font-mono">
                  {jetton.symbol || "N/A"}
                </span>
              </div>
              <div className="text-sm text-primary-white/70">
                Balance: {formatBalance(jetton.balance, jetton.decimals)}
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              {jetton.price > 0 && (
                <>
                  <div className="font-medium text-green-400 flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {formatUSDValue(
                      jetton.balance,
                      jetton.decimals,
                      jetton.price
                    )}
                  </div>
                  <div className="text-sm text-primary-white/70">
                    ${jetton.price.toFixed(6)}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}

        {jettons.length > 6 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full py-3 text-center text-primary-blue hover:text-blue-300 transition-colors flex items-center justify-center gap-2"
          >
            {showAll ? "Show Less" : `Show All ${jettons.length} Tokens`}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showAll ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default JettonsList;
