import React from "react";

/**
 * CryptoShimmer.jsx (Dark Mode Optimized)
 * Reusable shimmer/skeleton loading component for crypto lists/cards.
 * Tailwind CSS utilities used for layout and sizing.
 *
 * Props:
 *  - count (number): how many skeleton items to render (default 6)
 *  - variant ("list" | "grid"): layout style (default "list")
 *  - cardHeight (string|number): height of each skeleton card (default 16 -> h-16)
 *  - className (string): extra wrapper classes
 */

const CryptoShimmer = ({
  count = 6,
  variant = "list",
  cardHeight = 16,
  className = "",
}) => {
  const items = Array.from({ length: count });

  const cardHClass = typeof cardHeight === "number" ? `h-${cardHeight}` : cardHeight;

  return (
    <div className={`w-full bg-black text-white ${className}`}>
      {/* Inline style for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .shimmer-overlay {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .shimmer-bar {
          position: absolute;
          top: 0;
          left: -150%;
          height: 100%;
          width: 50%;
          background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.08) 50%, rgba(0,0,0,0) 100%);
          animation: shimmer 1.2s ease-in-out infinite;
        }
      `}</style>

      {variant === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((_, i) => (
            <div
              key={i}
              className={`relative rounded-2xl overflow-hidden border border-gray-700 p-4 ${cardHClass} bg-gray-900`}
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-gray-800 w-12 h-12 flex-shrink-0"></div>
                <div className="flex-1">
                  <div className="h-4 mb-2 rounded-md bg-gray-800 w-3/4"></div>
                  <div className="h-3 rounded-md bg-gray-700 w-1/2"></div>
                </div>
                <div className="w-20 h-6 rounded-md bg-gray-700"></div>
              </div>

              <div className="shimmer-overlay">
                <div className="shimmer-bar" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((_, i) => (
            <div
              key={i}
              className={`relative flex items-center gap-4 rounded-xl overflow-hidden border border-gray-700 p-3 ${cardHClass} bg-gray-900`}
            >
              <div className="rounded-full bg-gray-800 w-12 h-12 flex-shrink-0"></div>

              <div className="flex-1 min-w-0">
                <div className="h-4 mb-2 rounded-md bg-gray-800 w-3/4"></div>
                <div className="h-3 rounded-md bg-gray-700 w-1/2"></div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="h-4 rounded-md bg-gray-700 w-20"></div>
                <div className="h-3 rounded-md bg-gray-800 w-12"></div>
              </div>

              <div className="shimmer-overlay">
                <div className="shimmer-bar" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoShimmer;
