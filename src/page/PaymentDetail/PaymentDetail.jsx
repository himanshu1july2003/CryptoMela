import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
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

const PaymentDetail = () => {
  return (
    <div>
      <div className="px-20">
        <h1 className="text-3xl font-bold py-10">Payment Details</h1>
        <Card>
          <CardHeader>
            <CardTitle>
              Yes Bank
            </CardTitle>
            <CardDescription>
              A/C No :
              ************1651
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <p className="w-32">A/C Holder </p>
              <p className="text-gray-400"> :  with zosh</p>
            </div>
            <div className="flex items-center">
              <p className="w-32">IFSC</p>
              <p className="text-gray-400">: YESB0000007</p>
            </div>
          </CardContent>
        </Card>
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