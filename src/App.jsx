import React, { useState } from "react";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { Activity, Github, Twitter } from "lucide-react";
import WalletConnection from "./components/WalletConnection";
import Dashboard from "./components/Dashboard";
import { useDashboardData } from "./hooks/useDashboardData";
import logo from "./assets/logo.png";

const manifestUrl =
  "https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json";

function App() {
  const [currentAddress, setCurrentAddress] = useState("");
  const { data, loading, error, refreshData } =
    useDashboardData(currentAddress);

  const handleAddressChange = (address) => {
    setCurrentAddress(address);
  };

  return (
    <TonConnectUIProvider manifestUrl={manifestUrl}>
      <div className="min-h-screen bg-gradient-to-br from-primary-deep-blue via-primary-gray to-primary-deep-blue font-inter-display">
        {/* Header */}
        <header className="border-b border-primary-white/10 bg-gradient-to-br from-primary-deep-blue via-primary-gray to-primary-deep-blue font-inter-display backdrop-blur-sm glass-strong">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-primary-blue to-blue-500 rounded-xl animate-float">
                  <img
                    width="24px"
                    height="24px"
                    src={logo}
                    alt="TonApi rounded logo"
                  />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-primary-white">
                    TON Wallet Dashboard
                  </h1>
                  <p className="text-sm text-primary-white/70">
                    Real-time blockchain analytics
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-primary-white/10 rounded-lg transition-colors"
                >
                  <Github className="w-5 h-5 text-primary-white/70 hover:text-primary-white" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:bg-primary-white/10 rounded-lg transition-colors"
                >
                  <Twitter className="w-5 h-5 text-primary-white/70 hover:text-primary-white" />
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-primary-white mb-4">
              Explore TON Blockchain
            </h2>
            <p className="text-xl text-primary-white/80 max-w-2xl mx-auto">
              Connect your wallet or enter any TON address to view real-time
              balance, transactions, jetton assets, and NFT collections.
            </p>
          </div>

          {/* Wallet Connection */}
          <WalletConnection
            onAddressChange={handleAddressChange}
            currentAddress={currentAddress}
          />

          {/* Dashboard */}
          {currentAddress && (
            <Dashboard
              data={data}
              loading={loading}
              error={error}
              onRefresh={refreshData}
            />
          )}

          {/* Welcome Message */}
          {!currentAddress && (
            <div className="text-center py-16">
              <div className="glass-strong rounded-2xl p-12 max-w-2xl mx-auto">
                <Activity className="w-16 h-16 text-primary-blue mx-auto mb-6 animate-float" />
                <h3 className="text-2xl font-semibold text-primary-white mb-4">
                  Ready to Explore
                </h3>
                <p className="text-primary-white/80 mb-8">
                  Connect your TON wallet or enter a wallet address above to
                  start exploring blockchain data, transaction history, and
                  digital assets.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                  <div className="p-4 bg-primary-white/5 rounded-xl hover:bg-primary-white/10 transition-colors">
                    <div className="w-8 h-8 bg-primary-blue/20 rounded-lg flex items-center justify-center mb-3">
                      <Activity className="w-4 h-4 text-primary-blue" />
                    </div>
                    <h4 className="font-semibold text-primary-white mb-2">
                      Real-time Balance
                    </h4>
                    <p className="text-sm text-primary-white/70">
                      View current TON balance and account status
                    </p>
                  </div>

                  <div className="p-4 bg-primary-white/5 rounded-xl hover:bg-primary-white/10 transition-colors">
                    <div className="w-8 h-8 bg-primary-blue/20 rounded-lg flex items-center justify-center mb-3">
                      <Activity className="w-4 h-4 text-primary-blue" />
                    </div>
                    <h4 className="font-semibold text-primary-white mb-2">
                      Transaction History
                    </h4>
                    <p className="text-sm text-primary-white/70">
                      Detailed transaction logs with timestamps and fees
                    </p>
                  </div>

                  <div className="p-4 bg-primary-white/5 rounded-xl hover:bg-primary-white/10 transition-colors">
                    <div className="w-8 h-8 bg-primary-blue/20 rounded-lg flex items-center justify-center mb-3">
                      <Activity className="w-4 h-4 text-primary-blue" />
                    </div>
                    <h4 className="font-semibold text-primary-white mb-2">
                      Digital Assets
                    </h4>
                    <p className="text-sm text-primary-white/70">
                      Jetton tokens and NFT collections overview
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-primary-white/10 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-primary-white/70">
              <p>Built with React, Tailwind CSS, and TON API</p>
              <p className="mt-2 text-sm">
                Powered by{" "}
                <a
                  href="https://tonapi.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-blue hover:text-blue-300 transition-colors"
                >
                  TON API
                </a>{" "}
                and{" "}
                <a
                  href="https://github.com/ton-connect"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-blue hover:text-blue-300 transition-colors"
                >
                  TON Connect
                </a>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
