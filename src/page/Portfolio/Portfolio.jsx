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
const Portfolio = () => {
  return (
    <div className='p-4 lg:p-20'>
      <h1 className='font-extrabold text-5xl'>Portfolio</h1>
              <Table>
  <TableHeader>
    <TableRow>
      <TableHead className="">Assets</TableHead>
      <TableHead>SYMBOL</TableHead>
      <TableHead>High 24H</TableHead>
      <TableHead>Low 24H</TableHead>
      <TableHead>MARKET CAP</TableHead>
      <TableHead>PRICE</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {[1,1,1,1,1 ].map((tem,index)=> <TableRow key={index}>
      <TableCell className=" font-medium">
        <Avatar className='-z-50'>
            <AvatarImage className='h-8 w-8' src='https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400'>

            </AvatarImage>
        </Avatar>
       </TableCell>
        <TableCell className="flex "> BTC </TableCell>
        <TableCell>24</TableCell>
        <TableCell>20</TableCell>
        <TableCell>111</TableCell>
        <TableCell>$150</TableCell>
    </TableRow>
    )}
  </TableBody>
</Table>
    </div>
  )
}

export default Portfolio