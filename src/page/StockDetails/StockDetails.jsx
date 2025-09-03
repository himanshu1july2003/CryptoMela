import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { BookmarkIcon, DotIcon } from "lucide-react";
import React, { useEffect } from "react";
import TradingForm from "./TradingForm";
import Stockchart from "../Home/Stockchart";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCoinDetails } from "@/State/Coin/Action";
import { RESET_COIN_DETAILS } from "@/State/Coin/ActionTypes";
import { addItemToWatchlist } from "@/State/Watchlist/Action";
import { existInWatchlist } from "@/Utils/existInWatchlist";
import CryptoShimmer from "@/Utils/ShimmerUI";

const StockDetails = () => {
  const coin = useSelector((state) => state.coin);
  const { items } = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch({ type: RESET_COIN_DETAILS });
    dispatch(fetchCoinDetails(id, localStorage.getItem("jwt")));
  }, [id, dispatch]);

  if (coin.loading) return <p className="text-center mt-10"><CryptoShimmer/></p>;
  if (coin.error) return <p className="text-center mt-10 text-red-500">{coin.error}</p>;
  if (!coin.coinDetails) return null;

  const isInWatchlist = existInWatchlist(items, coin.coinDetails);

  const handleAddToWatchlist = () => {
    dispatch(
      addItemToWatchlist({
        coinId: coin.coinDetails?.id,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  return (
    <div className="p-5">
      <div className="flex justify-between">
        {/* Left side */}
        <div className="flex gap-5 items-center p-1">
          <Avatar>
            <AvatarImage className="h-8 w-8" src={coin.coinDetails?.image?.large} />
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p>{coin.coinDetails?.symbol?.toUpperCase()}</p>
              <DotIcon className="text-gray-400" />
              <p className="text-gray-400">{coin.coinDetails?.name}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">
                ${coin.coinDetails?.market_data?.current_price?.usd?.toLocaleString()}
              </p>
              <p
                className={
                  coin.coinDetails?.market_data?.market_cap_change_percentage_24h > 0
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {coin.coinDetails?.market_data?.market_cap_change_24h?.toLocaleString()} (
                {coin.coinDetails?.market_data?.market_cap_change_percentage_24h}%)
              </p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex gap-2 items-center">
          <Button onClick={handleAddToWatchlist} size="lg">
            {isInWatchlist ? (
              <BookmarkFilledIcon className="h-10 w-9 text-yellow-500" />
            ) : (
              <BookmarkIcon className="h-10 w-9" />
            )}
          </Button>
          <Dialog>
            <DialogTrigger>
              <Button size="lg">Trade</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>How Much Do you want to spend?</DialogTitle>
              </DialogHeader>
              <TradingForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Chart */}
      <div className="hidden lg:block lg:w-[90%] p-5">
        <Stockchart coinId={id} />
      </div>
    </div>
  );
};

export default StockDetails;
