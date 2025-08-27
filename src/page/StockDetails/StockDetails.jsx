import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
import { BookmarkIcon, DotIcon } from 'lucide-react'
import React from 'react'
import TradingForm from './TradingForm'
import Stockchart from '../Home/Stockchart'

const StockDetails = () => {
  return (
    <div className='p-5'>
      <div className='flex justify-between'>
        <div className='flex gap-5 items-center p-1'>
          <div>
            <Avatar className='-z-50'>
              <AvatarImage className='h-8 w-8' src='https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400'>

              </AvatarImage>
            </Avatar>
          </div>
          <div>
            <div>
              <div className="flex items-center gap-2">
                <p>BTC</p>
                <DotIcon className="text-gray-400" />
                <p className="text-gray-400">Bitcoin</p>
              </div>
              <div className="flex items-end gap-2">
                <p className="text-xl font-bold">$6554</p>
                <p className="text-red-600">
                  <span>-1319049822.578</span>
                  <span>(-0.29803%)</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-2 items-center'>
          <Button size="lg" >
            {false ? (
              <BookmarkFilledIcon className="h-10 w-9" />) :
              (<BookmarkIcon className="h-10 w-9" />
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
              <TradingForm/>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className='hidden lg:block lg:w-[90%] p-5 '>
      <Stockchart/>
      </div>
    </div>
  )
}
export default StockDetails