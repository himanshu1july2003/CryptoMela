import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DotFilledIcon } from '@radix-ui/react-icons';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // <-- Add this line
import { DialogClose } from '@radix-ui/react-dialog';
import { useDispatch } from 'react-redux';
import { paymentHandler } from '@/State/Wallet/Action';

const TopupForm = () => {
  const [amount, setAmount] = React.useState('');
  const [payment, setPayment] = React.useState("RAZORPAY");
  const dispatch=useDispatch()
  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handlePaymentMethod = (val) => {
    
    setPayment(val);
  };

  const handleSubmit = () => {
    console.log("Amount:", amount,);
    console.log("Amount:", payment,);
    
    dispatch(paymentHandler({jwt:localStorage.getItem("jwt"),payment,amount}))
  };

  return (
    <div className='pt-10 space-y-10'>
      <div>
        <h1 className='pb-1'>Enter Amount</h1>
        <Input
          onChange={handleChange}
          value={amount}
          className="py-7 text-lg font-light"
          placeholder="$9999"
        />
      </div>

      <div>
        <h1 className='pb-1'>Select payment method</h1>
        <RadioGroup
          onValueChange={handlePaymentMethod}
          value={payment}
          className="flex gap-5"
        >
          <div className='px-5 p-3 flex items-center space-x-2 border rounded-md'>
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-9 w-9"
              value="RAZORPAY"
              id="razorpay"
            />
            <Label htmlFor="razorpay">
              <div className="bg-white rounded-md px-5 py-2 w-32">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Razorpay_logo.svg/1280px-Razorpay_logo.svg.png" alt="Razorpay Logo" />
              </div>
            </Label>
          </div>

          <div className='px-5 p-3 flex items-center space-x-2 border rounded-md'>
            <RadioGroupItem
              icon={DotFilledIcon}
              className="h-9 w-9"
              value="STRIPE"
              id="stripe"
            />
            <Label htmlFor="stripe">
              <div className="bg-white rounded-md px-5 py-2 w-32">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" alt="Stripe Logo" />
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
     <DialogClose className="w-full py-7">
      <Button onClick={handleSubmit} className="w-full py-7">
        Submit
      </Button>
      </DialogClose>
    </div>
  );
};

export default TopupForm;