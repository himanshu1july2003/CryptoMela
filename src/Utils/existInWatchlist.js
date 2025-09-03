// Utils/existInWatchlist.js
export const existInWatchlist = (items, coin) => {
  if (!items || !coin) return false;
  return items.some((item) => item?.id === coin?.id);
};
