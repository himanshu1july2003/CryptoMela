import React, { useEffect } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForUser } from '@/State/Order/Action'
import { store } from '@/State/Store'
import { calculateProfit } from '@/Utils/calculateProfit'
const Activity = () => {
  const {order}=useSelector(store=>store)
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getAllOrdersForUser(localStorage.getItem("jwt")))
  },[])
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
    {order.orders.map((item,index)=> <TableRow key={index}>
        <TableCell>24/4/25</TableCell>
      <TableCell className=" font-medium flex gap-1  items-center">
        <Avatar className='-z-50'>
            <AvatarImage className='h-8 w-8' src={item.orderItem.coin.image}>
            </AvatarImage>
        </Avatar>
        <p>{item.orderItem.coin.symbol}</p>
       </TableCell>
        <TableCell>{item.orderItem.coin.current_price}</TableCell>
        <TableCell>{item.orderItem.coin.current_price}</TableCell>
        <TableCell>BUY</TableCell>
        <TableCell> {calculateProfit(item)}
        </TableCell>
    </TableRow>
    )}
  </TableBody>
</Table>
    </div>
  )
}

export default Activity