import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { addItemToWatchlist, getUserWatchlist } from "@/State/Watchlist/Action";
import { existInWatchlist } from "@/Utils/existInWatchlist";

const Watchlist = () => {
  const { items, loading } = useSelector((state) => state.watchlist);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWatchlist(localStorage.getItem("jwt")));
  }, [dispatch]);

  // toggle function -> add/remove dono ka kaam karega
  const handleToggleWatchlist = (coinId) => {
    dispatch(
      addItemToWatchlist({
        coinId,
        jwt: localStorage.getItem("jwt"),
      })
    );
  };

  if (loading) return <p className="p-5 text-center">Loading...</p>;

  return (
    <div className="p-3 lg:p-10 flex-col gap-2">
      <Button variant="outline" className="p-10">
        <p className="font-extrabold text-5xl">Watchlist</p>
      </Button>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>COIN</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>High 24h</TableHead>
            <TableHead>Low 24h</TableHead>
            <TableHead className="text-right">ACTION</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items && items.coins && items.coins.length > 0 ? (
            items.coins.map((item, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium flex gap-1 items-center">
                  <Avatar>
                    <AvatarImage className="h-8 w-8" src={item.image} />
                  </Avatar>
                  <p>{item.symbol?.toUpperCase()}</p>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.high_24h}</TableCell>
                <TableCell>{item.low_24h}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    onClick={() => handleToggleWatchlist(item.id)}
                    size="icon"
                    className="h-10 w-10"
                  >
                    <BookmarkFilledIcon className="w-6 h-6" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No coins in watchlist
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default Watchlist;
