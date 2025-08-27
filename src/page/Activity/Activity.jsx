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
const Activity = () => {
  return (
   <div className='p-3 lg:p-10'>
      <Button variant="outline" className='p-10'> <p className='font-extrabold text-5xl'>Your Activities</p></Button>
                    <Table>
  <TableHeader>
    <TableRow>
      <TableHead>Date</TableHead>
      <TableHead>COIN</TableHead>
      <TableHead>BUY PRICE</TableHead>
      <TableHead>SELL PRICE</TableHead>
      <TableHead>ORDER TYPE</TableHead>
      <TableHead >PROFIT</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {[1,1,1,1,1 ].map((item,index)=> <TableRow key={index}>
        <TableCell>24/4/25</TableCell>
      <TableCell className=" font-medium flex gap-1  items-center">
        <Avatar className='-z-50'>
            <AvatarImage className='h-8 w-8' src='https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400'>
            </AvatarImage>
        </Avatar>
        <p>BTC</p>
       </TableCell>
        <TableCell>24</TableCell>
        <TableCell>111</TableCell>
        <TableCell>BUY</TableCell>
        <TableCell> 10
        </TableCell>
    </TableRow>
    )}
  </TableBody>
</Table>
    </div>
  )
}

export default Activity