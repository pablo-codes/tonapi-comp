import React, { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownLeft,
  Clock,
  ExternalLink,
  Filter,
  ChevronDown,
} from "lucide-react";

const TransactionsList = ({ transactions, loading }) => {
  const [filter, setFilter] = useState("all");
  const [showAll, setShowAll] = useState(false);

  const getTransactionIcon = (type) => {
    const isOutgoing = type;

    return isOutgoing ? (
      <ArrowDownLeft className="w-4 h-4 text-green-400" />
    ) : (
      <ArrowUpRight className="w-4 h-4 text-red-400" />
    );
  };

  const getTransactionColor = (type) => {
    return type ? "text-green-400" : "text-red-400";
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const formatHash = (hash) => {
    if (!hash || typeof hash !== "string") return "Invalid Hash";
    return `${hash.slice(0, 8)}...${hash.slice(-8)}`;
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (filter === "all") return true;
    if (filter === "incoming") return tx.incoming;
    if (filter === "outgoing") return tx.incoming == false;
    if (filter === "jetton") return tx.type === "jetton";
    return true;
  });

  const displayedTransactions = showAll
    ? filteredTransactions
    : filteredTransactions.slice(0, 10);

  if (loading) {
    return (
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-primary-white">
            Recent Transactions
          </h3>
          <div className="h-8 w-20 bg-primary-white/20 rounded shimmer"></div>
        </div>

        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 p-4 bg-primary-white/5 rounded-xl"
            >
              <div className="w-10 h-10 bg-primary-white/20 rounded-lg shimmer"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-primary-white/20 rounded shimmer w-32"></div>
                <div className="h-3 bg-primary-white/10 rounded shimmer w-24"></div>
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

  return (
    <div className="glass-strong rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2 text-primary-white">
          <Clock className="w-5 h-5 text-primary-blue" />
          Recent Transactions
        </h3>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-primary-white/70" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-primary-white/10 border border-primary-white/20 rounded-lg px-3 py-1 text-sm text-black focus:outline-none focus:ring-2 focus:ring-primary-blue text-primary-white backdrop-blur-sm"
          >
            <option value="all">All</option>
            <option value="incoming">Incoming</option>
            <option value="outgoing">Outgoing</option>
            <option value="jetton">Tokens</option>
          </select>
        </div>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="w-12 h-12 text-primary-white/50 mx-auto mb-4" />
          <p className="text-primary-white/70">No transactions found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayedTransactions.map((tx, index) => (
            <div
              key={tx.hash}
              className="flex items-center gap-4 p-4 bg-primary-white/5 hover:bg-primary-white/10 rounded-xl transition-colors group"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-primary-white/10 rounded-lg flex items-center justify-center">
                  {getTransactionIcon(tx.incoming)}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-primary-white truncate">
                    {tx.description}
                  </span>
                  {tx.success === false && (
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-full">
                      Failed
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-sm text-primary-white/70">
                  <span>{formatTimestamp(tx.timestamp)}</span>
                  <span>•</span>
                  <span className="font-mono truncate">
                    {formatHash(tx.hash)}
                  </span>
                </div>
              </div>

              <div className="text-right flex-shrink-0">
                <div
                  className={`font-medium ${getTransactionColor(tx.incoming)}`}
                >
                  {tx.incoming ? "+" : "-"}
                  {tx.amount}
                </div>

                <div className="text-sm text-primary-white/70">
                  Fee: {Number(tx.fee)} TON
                </div>
              </div>

              <a
                href={`https://tonscan.org/tx/${tx.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-primary-white/10 rounded-lg"
              >
                <ExternalLink className="w-4 h-4 text-primary-white/70" />
              </a>
            </div>
          ))}

          {filteredTransactions.length > 10 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="w-full py-3 text-center text-primary-blue hover:text-blue-300 transition-colors flex items-center justify-center gap-2"
            >
              {showAll
                ? "Show Less"
                : `Show All ${filteredTransactions.length} Transactions`}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  showAll ? "rotate-180" : ""
                }`}
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionsList;
