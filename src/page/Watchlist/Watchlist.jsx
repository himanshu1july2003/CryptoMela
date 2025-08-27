import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '@/components/ui/button'
import { BookmarkFilledIcon } from '@radix-ui/react-icons'
const Watchlist = () => {
  const handleWatchlit= (val) => {
    console.log(val)
  }
  return (
    <div className='p-3 lg:p-10 flex-col gap-2'>
      <Button variant="outline" className='p-10'> <p className='font-extrabold text-5xl'>Watchlist</p></Button>
              <Table>
  <TableHeader>
    <TableRow>
      <TableHead>COIN</TableHead>
      <TableHead>High 24H</TableHead>
      <TableHead>Low 24H</TableHead>
      <TableHead>MARKET CAP</TableHead>
      <TableHead>PRICE</TableHead>
      <TableHead className="text-right text-red-600">REMOVE</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {[1,1,1,1,1 ].map((item,index)=> <TableRow key={index}>
      <TableCell className=" font-medium flex gap-1  items-center">
        <Avatar className='-z-50'>
            <AvatarImage className='h-8 w-8' src='https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400'>
            </AvatarImage>
        </Avatar>
        <p>BTC</p>
       </TableCell>
        <TableCell>24</TableCell>
        <TableCell>20</TableCell>
        <TableCell>111</TableCell>
        <TableCell>$150</TableCell>
        <TableCell className="text-right"> 
          <Button variant="ghost" onClick={()=>handleWatchlit(item.id)} size="icon" className="h-10 w-10">
            <BookmarkFilledIcon className=' w-6 h-6'></BookmarkFilledIcon>
          </Button>
        </TableCell>
    </TableRow>
    )}
  </TableBody>
</Table>
    </div>
  )
}

export default Watchlist