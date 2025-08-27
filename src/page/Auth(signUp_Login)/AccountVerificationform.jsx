import React from 'react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@radix-ui/react-dialog'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogHeader } from '@/components/ui/dialog'
const AccountVerificationform = () => {
    const [value,setValue]=React.useState("")
      const handleSubmit = () => {
    console.log("");
  };
  
    return (
        <div>
            <div className='flex justify-center'>
                <div className='space-y-5 mt-10 w-full'>
                    <div className='flex justify-between items-center'>
                        <p>Email :</p>
                        <p>himanshu@gmail.com</p>
                    </div>
                    <Dialog>
                        <DialogTrigger>
                            <Button>Send OTP</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Enter OTP</DialogTitle>
                            </DialogHeader>
                            <div>
                                <InputOTP 
                                onChange={(value)=>setValue(value)}
                                maxLength={6}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                                <DialogClose>
                                    <Button className="w-[10rem]"> Submit</Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    )
}

export default AccountVerificationform