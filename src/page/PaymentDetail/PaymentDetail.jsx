import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React, { useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import PaymentDetailForm from './PaymentDetailForm'
import { useDispatch, useSelector } from 'react-redux'
import { store } from '@/State/Store'
import { getPaymentDetails } from '@/State/WithDrawal/Action'

const PaymentDetail = () => {
  const {withdrawal}=useSelector(store=>store)
  console.log("------------>",withdrawal)
  const dispatch=useDispatch()
  useEffect(() => {
    dispatch(getPaymentDetails({jwt:localStorage.getItem("jwt")}))
  },[])
 const accountNumber = withdrawal?.paymentDetails?.accountNumber || "";

// Mask all but last 4 digits
const maskedAccountNumber = accountNumber
  ? "*".repeat(accountNumber.length - 4) + accountNumber.slice(-4)
  : "";


  return (
    <div>
      <div className="px-20">
        <h1 className="text-3xl font-bold py-10">Payment Details</h1>
        {withdrawal.paymentDetails &&
        (<Card>
          <CardHeader>
            <CardTitle>
              {withdrawal?.paymentDetails?.bankName}
            </CardTitle>
            <CardDescription>
              A/C No :
              {maskedAccountNumber}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <p className="w-32">A/C Holder </p>
              <p className="text-gray-400"> : {withdrawal?.paymentDetails?.accountHolderName}</p>
            </div>
            <div className="flex items-center">
              <p className="w-32">IFSC</p>
              <p className="text-gray-400">: {withdrawal?.paymentDetails?.ifsc}</p>
            </div>
          </CardContent>
        </Card>)}
        <Dialog>
          <DialogTrigger>
            <Button className="py-6 m-2">
              Add Payment Details
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl">Payment Details</DialogTitle>
              <PaymentDetailForm/>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default PaymentDetail