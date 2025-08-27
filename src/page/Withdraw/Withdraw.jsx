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
const Withdraw = () => {
  return (
    <div>
      <div className='p-3 lg:p-10'>
      <Button variant="outline" className='p-10'> <p className='font-extrabold text-5xl'>Withdrawal History</p></Button>
                    <Table>
  <TableHeader>
    <TableRow>
      <TableHead>Date</TableHead>
      <TableHead>Method</TableHead>
      <TableHead>Amount</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {[1,1,1,1,1 ].map((item,index)=> <TableRow key={index}>
        <TableCell>24-8-2025</TableCell>
        <TableCell>RAZORPAY</TableCell>
        <TableCell>100</TableCell>
        <TableCell>🟢</TableCell>
    </TableRow>
    )}
  </TableBody>
</Table>
    </div>
    </div>
  )
}

export default Withdraw