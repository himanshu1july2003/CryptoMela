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
import { useDispatch, useSelector } from 'react-redux'
import { getUserAssets } from '@/State/Asset/Action'
import { store } from '@/State/Store'
const Portfolio = () => {
  const dispatch=useDispatch()
  const {asset}=useSelector(store=>store)
  useEffect(() => {
    console.log("--->",asset)
    dispatch(getUserAssets(localStorage.getItem("jwt")))
  },[dispatch])
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
      <TableHead>My Holdings</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {(asset.userAssets || []).map((tem, index) => (
    <TableRow key={index}>
      <TableCell className="font-medium">
        <Avatar className='-z-50'>
          <AvatarImage className='h-8 w-8' src={tem.coin.image} />
        </Avatar>
      </TableCell>
      <TableCell className="flex ">{tem.coin.symbol.toUpperCase()}</TableCell>
      <TableCell>{tem.coin.high_24h}</TableCell>
      <TableCell>{tem.coin.low_24h}</TableCell>
      <TableCell className="bg-gray-500">${tem.quantity}</TableCell>
    </TableRow>
  ))}
</TableBody>

</Table>
    </div>
  )
}

export default Portfolio