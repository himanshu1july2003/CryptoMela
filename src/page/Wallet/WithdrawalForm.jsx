import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { withdrawalRequest } from '@/State/WithDrawal/Action';
import { Dialog, DialogClose } from '@radix-ui/react-dialog';
import { Landmark } from 'lucide-react';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const WithdrawalForm = () => {
  const [amount, setAmount] = React.useState('');
    const dispatch=useDispatch()

  const handleChange = (e) => {
    setAmount(e.target.value);
  };
 
  const handleSubmit = () => {
    dispatch(withdrawalRequest(amount,localStorage.getItem("jwt")))
    console.log(amount)
  };
 

  return (
    <div className='pt-10 space-y-5'>
      <div className='flex justify-between items-center rounded-md bg-slate-900 text-xl font-bold px-5 py-4'>
        <p>Available balance</p>
        <p>$9000</p>
      </div>

      <div className='flex flex-col items-center'>
        <h1>Enter Withdrawal amount</h1>

        <div className='flex items-center justify-center'>
          <Input
            onChange={handleChange}
            value={amount}
            className="withdrawalInput py-7 border-none outline-none focus: outline:none
            px-0 text-2xl text-center"
            placeholder="$999"
            type="number"
          />
        </div>
      </div>
      <div>
        <p className='pb-2'>Transfer to</p>
        <div className='flex items-center gap-5 border px-5 py-2 rounded-md'>
          <Landmark
          className='h-6 w-6'
           />
           <div>
            <p className='text-xl font-bold'> Yes Bank</p>
            <p className='text-xs'> **********1651</p>
           </div>
        </div>
      </div>
      <DialogClose className="w-full">
      <Button variant="" onClick={handleSubmit} className="w-full py-7 text-xl ">
        Withdraw
      </Button>
      </DialogClose>
    </div>
  )
}

export default WithdrawalForm