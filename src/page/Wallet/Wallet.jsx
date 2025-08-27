import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CopyIcon, DollarSign, ShuffleIcon, UploadIcon, WalletIcon } from 'lucide-react'
import { ReloadIcon } from '@radix-ui/react-icons'
import WithdrawalForm from './WithdrawalForm'
import TopupForm from './TopupForm'
import TransferFormm from './TransferFormm'
import TransactionsHistory from './TransactionsHistory'
const Wallet = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='pt-10 w-full lg:w-[60%]'>
        <Card>
          <CardHeader className="pb-9">
            <div className='flex justify-between items-center'>
              <div className='flex items-center gap-5'>
                <WalletIcon size={50}></WalletIcon>
                <div>
                  <CardTitle className="text-2xl">My Wallet</CardTitle>
                  <div className='flex items-center gap-1'>
                    <p className='text-gray-200'>
                      #A475Ed
                    </p>
                    <CopyIcon className='cursor-pointer hover:text-slate-200 h-3' />
                  </div>
                </div>
              </div>
              <ReloadIcon className='w-5 h-5 cursor-pointer hover:text-gray-400◘' />
            </div>
          </CardHeader>
          <CardContent>
            <div className='flex items-center'>
              <DollarSign />
              <span className='text-2xl font-semibold'> 20000</span>
            </div>
            <div className='flex gap-7 mt-5'>
              <Dialog>
                <DialogTrigger>
                  <div className='h-24 w-24 hover:text-gray-400
                  cursor-pointer flex flex-col justify-center items-center 
                  rounded-md shadow-slate-800 shadow-md'>
                    <UploadIcon/>
                    <span className='text-sm mt-2'>
                      Withdrawal
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Request Withdrawal</DialogTitle>
                  </DialogHeader>
                  <WithdrawalForm />
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <div className='h-24 w-24 hover:text-gray-400
                  cursor-pointer flex flex-col justify-center items-center 
                  rounded-md shadow-slate-800 shadow-md'>
                    <UploadIcon/>
                    <span className='text-sm mt-2'>
                      Add Money
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Top Up Your Wallet</DialogTitle>
                  </DialogHeader>
                 <TopupForm/>
                </DialogContent>
              </Dialog>
              <Dialog> 
                <DialogTrigger>
                  <div className='h-24 w-24 hover:text-gray-400
                  cursor-pointer flex flex-col justify-center items-center 
                  rounded-md shadow-slate-800 shadow-md'>
                    <ShuffleIcon/>
                    <span className='text-sm mt-2'>
                      Transfer
                    </span>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Transfer to Other Wallet</DialogTitle>
                  </DialogHeader>
                  <TransferFormm/>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        <TransactionsHistory/>
      </div>
    </div>
  )
}

export default Wallet