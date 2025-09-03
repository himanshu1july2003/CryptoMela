import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { store } from '@/State/Store';
import { transferMoney } from '@/State/Wallet/Action';
import { Dialog, DialogClose } from '@radix-ui/react-dialog';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

const TransferFormm = () => {
    const {wallet}=useSelector(store=>store)
  const dispatch=useDispatch()
    const [formData, setFormData] = React.useState({
      amount:'',
      walletId:'',
      purpose:" "
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,[e.target.name]:e.target.value
      })
    };
     const handleSubmit = () => {
    dispatch(transferMoney({
      jwt:localStorage.getItem("jwt"),
      walletId:formData.walletId,
      reqData:{
        amount: formData.amount,
        purpose: formData.purpose
      }
    }))
  };
  return (
    <div className='pt-10 sapce-y-5'>
      <div>
        <h1 className="pb1">Enter Amount</h1>    
        <Input
        name="amount"
            onChange={handleChange}
            value={formData.amount}
            className=" py-7 "
            placeholder="$999"
            type="number"
          />  
      </div>
      <div>
        <h1 className="pb1">Enter WalletId</h1>    
        <Input
        name="walletId"
            onChange={handleChange}
           value={formData.walletId}
            className=" py-7 "
            placeholder="ABC123E"
          />  
      </div>
      <DialogClose className="w-full py-7">
      <Button onClick={handleSubmit} className="w-full py-7">
        Submit
      </Button>
      </DialogClose>
    </div>
  )
}

export default TransferFormm