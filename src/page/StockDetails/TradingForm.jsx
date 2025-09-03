import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getAssetDetails } from '@/State/Asset/Action'
import { payOrder } from '@/State/Order/Action'
import { getUserWallet } from '@/State/Wallet/Action'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { DotIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TradingForm = () => {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");   // 👈 empty string
  const [quantity, setQuantity] = useState(""); // 👈 empty string
  const [orderType, setOrderType] = useState("BUY");
  const { coin, wallet, asset } = useSelector(store => store);

  const handleChange = (e) => {
    const rawValue = e.target.value;
    const value = Number(rawValue);

    if (orderType === "BUY") {
      setAmount(rawValue);
      if (!isNaN(value)) {
        const volume = calculateBuyCost(
          value,
          coin.coinDetails?.market_data?.current_price?.usd
        );
        setQuantity(volume);
      } else {
        setQuantity("");
      }
    } else {
      setQuantity(rawValue);
    }
  };

  const calculateBuyCost = (amount, price) => {
    if (!price || isNaN(amount)) return "";
    let volume = amount / price;
    return volume.toFixed(6);
  };

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      dispatch(getUserWallet(jwt));
      if (coin.coinDetails?.id) {
        dispatch(getAssetDetails(coin.coinDetails.id, jwt));
      }
    }
  }, [dispatch, coin.coinDetails]);

  const handleBuyCrypto = async () => {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      console.error("JWT missing, user not logged in!");
      return;
    }

    const orderData = {
      coinId: coin.coinDetails?.id,
      quantity: Number(quantity),
      orderType
    };

    console.log("Sending orderData:", orderData);

    await dispatch(payOrder({ jwt, amount: Number(amount), orderData }));

    dispatch(getUserWallet(jwt));
    dispatch(getAssetDetails(coin.coinDetails?.id, jwt));

    // reset input
    setAmount("");
    setQuantity("");
  };

  return (
    <div>
      <div className="space-y-10 p-5">
        {/* Input field */}
        <div>
          <div className="flex gap-4 items-center justify-between">
            <Input
              className="py-7 focus:outline-none"
              placeholder={orderType === "BUY" ? "Enter Amount..." : "Enter Quantity..."}
              onChange={handleChange}
              type="number"
              value={orderType === "BUY" ? amount : quantity}
              name="amount"
            />
            <div>
              <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
                {quantity || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Coin Info */}
        <div className='flex gap-5 items-center p-1'>
          <Avatar>
            <AvatarImage className='h-8 w-8' src={coin.coinDetails?.image?.large} />
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <p>{coin.coinDetails?.symbol?.toUpperCase()}</p>
              <DotIcon className="text-gray-400" />
              <p className="text-gray-400">{coin.coinDetails?.name}</p>
            </div>
            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">
                ${coin.coinDetails?.market_data?.current_price?.usd}
              </p>
              <p className="text-red-600">
                <span>-{coin.coinDetails?.market_data?.market_cap_change_24h}</span>
                <span>(-{coin.coinDetails?.market_data?.market_cap_change_percentage_24h}%)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Order Type + Balance */}
        <div className="flex items-center justify-between">
          <p>Order Type</p>
          <p>Market Order</p>
        </div>
        <div className="flex items-center justify-between">
          <p>{orderType === "BUY" ? "Available Cash" : "Available Quantity"}</p>
          <p>
            {orderType === "BUY"
              ? "$" + (wallet?.userWallet?.balance ?? 0)
              : asset.assetDetails?.quantity || 0}
          </p>
        </div>

        {/* Action Buttons */}
        <div>
          <Button
            onClick={handleBuyCrypto}
            className={`w-full py-6 ${orderType === "SELL" ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}
          >
            {orderType}
          </Button>
          <Button
            variant="ghost"
            className="w-full py-6 hover:underline "
            onClick={() => setOrderType(orderType === "BUY" ? "SELL" : "BUY")}
          >
            {orderType === "BUY" ? "Or Sell" : "Or Buy"}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TradingForm
