import React, { useState } from "react";
import { Image, X, ExternalLink, ChevronDown } from "lucide-react";

const NFTGallery = ({ nfts, loading }) => {
  const [selectedNFT, setSelectedNFT] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const displayedNFTs = showAll ? nfts : nfts.slice(0, 8);

  const NFTModal = ({ nft, onClose }) => {
    if (!nft) return null;

    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="glass-strong rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-primary-white">
                NFT Details
              </h3>
              <button
                onClick={onClose}
                className="p-2 hover:bg-primary-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-primary-white" />
              </button>
            </div>

            <div className="space-y-6">
              {nft.image && (
                <div className="aspect-square rounded-xl overflow-hidden bg-primary-white/5">
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-primary-white mb-2">
                    {nft.name}
                  </h4>
                  {nft.description && (
                    <p className="text-primary-white/80 text-sm leading-relaxed">
                      {nft.description}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary-white/5 rounded-xl">
                    <div className="text-sm text-primary-white/70 mb-1">
                      Collection
                    </div>
                    <div className="text-primary-white font-medium">
                      {nft.collection?.name || "Unknown"}
                    </div>
                  </div>

                  <div className="p-4 bg-primary-white/5 rounded-xl">
                    <div className="text-sm text-primary-white/70 mb-1">
                      Token Address
                    </div>
                    <div className="text-primary-white font-mono text-sm break-all">
                      {nft.address
                        ? `${nft.address.slice(0, 8)}...${nft.address.slice(
                            -8
                          )}`
                        : "N/A"}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  {nft.address && (
                    <a
                      href={`https://tonscan.org/nft/${nft.address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-4 py-2 bg-primary-blue/20 border border-primary-blue/30 hover:bg-primary-blue/30 rounded-lg text-center transition-colors flex items-center justify-center gap-2 text-primary-white"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View on TONScan
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Image className="w-5 h-5 text-primary-blue" />
          <h3 className="text-lg font-semibold text-primary-white">
            NFT Collection
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="aspect-square bg-primary-white/10 rounded-xl shimmer"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Image className="w-5 h-5 text-primary-blue" />
          <h3 className="text-lg font-semibold text-primary-white">
            NFT Collection
          </h3>
        </div>

        <div className="text-center py-12">
          <Image className="w-12 h-12 text-primary-white/50 mx-auto mb-4" />
          <p className="text-primary-white/70">No NFTs found</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="glass-strong rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Image className="w-5 h-5 text-primary-blue" />
            <h3 className="text-lg font-semibold text-primary-white">
              NFT Collection
            </h3>
            <span className="px-2 py-1 bg-primary-blue/20 text-primary-blue text-xs rounded-full">
              {nfts.length}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {displayedNFTs.map((nft, index) => (
            <div
              key={nft.address || index}
              className="group cursor-pointer"
              onClick={() => setSelectedNFT(nft)}
            >
              <div
                className="aspect-square rounded-xl overflow-hidden bg-primary-white/5 hover:bg-primary-white/10 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
                style={{ boxShadow: "0 10px 40px rgba(69, 174, 245, 0.2)" }}
              >
                {nft.image ? (
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ display: nft.image ? "none" : "flex" }}
                >
                  <Image className="w-8 h-8 text-primary-white/50" />
                </div>
              </div>

              <div className="mt-3 space-y-1">
                <h4 className="font-medium text-primary-white text-sm truncate group-hover:text-primary-blue transition-colors">
                  {nft.name}
                </h4>
                <p className="text-xs text-primary-white/70 truncate">
                  {nft.collection?.name || "Unknown Collection"}
                </p>
              </div>
            </div>
          ))}
        </div>

        {nfts.length > 8 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-6 py-3 text-center text-primary-blue hover:text-blue-300 transition-colors flex items-center justify-center gap-2"
          >
            {showAll ? "Show Less" : `Show All ${nfts.length} NFTs`}
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                showAll ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      <NFTModal nft={selectedNFT} onClose={() => setSelectedNFT(null)} />
    </>
  );
};

export default NFTGallery;
