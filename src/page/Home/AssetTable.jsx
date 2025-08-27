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
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
const AssetTable = ({coin,category}) => {
  const navigate=useNavigate()
  console.log(coin)

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Coins</TableHead>
            <TableHead>NAME</TableHead>
            <TableHead>High 24H</TableHead>
            <TableHead>Low 24H</TableHead>
            <TableHead>Market Cap Rank</TableHead>
            <TableHead>PRICE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody >
          {coin.map((item, index) => <TableRow key={index}>
            <TableCell onClick={()=>navigate('/market/bitcoin')} className=" font-medium ">
              <Avatar className='-z-50'>
                <AvatarImage className='h-8 w-8' src={item.image}>
                </AvatarImage>
              </Avatar>
            </TableCell>
            <TableCell className="flex "> {item?.name} ({item?.symbol}) </TableCell>
            <TableCell className="text-green-500" >${item?.high_24h}</TableCell>
            <TableCell className="text-red-500">${item?.low_24h}</TableCell>
            <TableCell className="flex justify-center">{item?.market_cap_rank}</TableCell>
            <TableCell>${item?.current_price}</TableCell>
          </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default AssetTable