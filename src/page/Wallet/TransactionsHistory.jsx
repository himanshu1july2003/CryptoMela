import { Card } from '@/components/ui/card'
import { getUserWallet, getWalletTransactions } from '@/State/Wallet/Action'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { UpdateIcon } from '@radix-ui/react-icons'
import { ShuffleIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TransactionsHistory = () => {
    const dispatch=useDispatch()
  const { wallet } = useSelector(store => store)


const handleFetchUserWallet = () => {
  dispatch(getUserWallet(localStorage.getItem("jwt")));
};
  useEffect(() => {
    dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }))
    handleFetchUserWallet()
  }, [dispatch])

  return (
    <div>
      <div className="py-5 pt-10">
        <div className="flex gap-2 items-center pb-5">
          <h1 className="text-2xl font-semibold">History</h1>
          <UpdateIcon 
  onClick={() => dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }))}
  className="h-7 w-7 p-0 cursor-pointer hover:text-gray-400" 
/>

        </div>

        <div className="space-y-5">
          {wallet.transactions.length === 0 && (
            <p className="text-gray-400 text-center">No transactions yet</p>
          )}

          {[...wallet.transactions].reverse().map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <Card className="lg:w-[90%] w-[90%] px-5 py-3 flex flex-row items-center justify-between shadow-md">
                
                {/* Left Side - Icon + Info */}
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      <ShuffleIcon className="text-gray-500" />
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h1 className="font-medium">
                      {item.type === "CREDIT" ? "Received" : "Sent"}
                    </h1>
                    <p className="text-sm text-gray-500">{item.purpose}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                </div>

                {/* Right Side - Amount */}
                <div>
                  <p
                    className={`text-lg font-semibold ${
                      item.type === "CREDIT" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {item.type === "CREDIT" ? "+" : "-"} ${item.amount}
                  </p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TransactionsHistory
