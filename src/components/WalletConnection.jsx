import React, { useState } from "react";
import { Wallet, Search, Copy, ExternalLink } from "lucide-react";
import { useTonConnect } from "../hooks/useTonConnect";

const WalletConnection = ({ onAddressChange, currentAddress }) => {
  const [manualAddress, setManualAddress] = useState("");
  const { wallet, connected, connectWallet, disconnectWallet } =
    useTonConnect();

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualAddress.trim()) {
      onAddressChange(manualAddress.trim());
    }
  };

  const handleConnectedWallet = () => {
    if (wallet?.address) {
      onAddressChange(wallet.address);
    }
  };

  const copyAddress = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <div className="glass-strong rounded-2xl p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Manual Address Input */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary-white">
            <Search className="w-5 h-5 text-primary-blue" />
            Enter Wallet Address
          </h3>
          <form
            onSubmit={handleManualSubmit}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
              placeholder="Enter TON wallet address..."
              className="flex-1 px-4 py-3 bg-primary-white/10 border border-primary-white/20 rounded-xl text-primary-white placeholder-primary-white/50 focus:outline-none focus:ring-2 focus:ring-primary-blue focus:border-transparent transition-all backdrop-blur-sm"
            />
            <button type="submit" className="btn-primary">
              Search
            </button>
          </form>
        </div>

        {/* Wallet Connection */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary-white">
            <Wallet className="w-5 h-5 text-primary-blue" />
            Connect Wallet
          </h3>

          {!connected ? (
            <button
              onClick={connectWallet}
              className="w-full px-6 py-3 bg-gradient-to-r from-primary-blue to-blue-500 hover:from-blue-500 hover:to-primary-blue rounded-xl font-medium transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2 text-primary-white"
              style={{ boxShadow: "0 4px 20px rgba(69, 174, 245, 0.3)" }}
            >
              <Wallet className="w-5 h-5" />
              Connect TON Wallet
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-500/20 border border-green-500/30 rounded-xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-300">Connected</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-primary-white">
                    {formatAddress(wallet?.address)}
                  </span>
                  <button
                    onClick={() => copyAddress(wallet?.address)}
                    className="p-1 hover:bg-primary-white/10 rounded transition-colors"
                  >
                    <Copy className="w-4 h-4 text-primary-white/70" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleConnectedWallet}
                  className="flex-1 px-4 py-2 bg-primary-blue/20 border border-primary-blue/30 hover:bg-primary-blue/30 rounded-lg text-sm transition-colors text-primary-white"
                >
                  View Dashboard
                </button>
                <button
                  onClick={disconnectWallet}
                  className="px-4 py-2 bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 rounded-lg text-sm transition-colors text-primary-white"
                >
                  Disconnect
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Current Address Display */}
      {currentAddress && (
        <div className="mt-6 p-4 bg-primary-blue/10 border border-primary-blue/20 rounded-xl backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-primary-blue rounded-full"></div>
              <span className="text-sm text-primary-blue">
                Viewing Dashboard For:
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm text-primary-white">
                {formatAddress(currentAddress)}
              </span>
              <button
                onClick={() => copyAddress(currentAddress)}
                className="p-1 hover:bg-primary-white/10 rounded transition-colors"
              >
                <Copy className="w-4 h-4 text-primary-white/70" />
              </button>
              <a
                href={`https://tonscan.org/address/${currentAddress}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 hover:bg-primary-white/10 rounded transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-primary-white/70" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletConnection;
