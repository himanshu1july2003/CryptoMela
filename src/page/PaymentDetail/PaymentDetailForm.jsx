import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Dialog, DialogClose } from '@radix-ui/react-dialog'
import React from 'react'
import { useForm } from 'react-hook-form'

const PaymentDetailForm = () => {
    const form = useForm({
        resolver: "",
        defaultValues: {
            accountHolderName: "",
            ifsc: "",
            accountNumber: "",
            bankName: ""
        },
    })

    const onSubmit = (data) => {
        console.log(data);
    }
    return (
        <div className='px-10 py-2'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className='space-y-6'>
                    <FormField
                        control={form.control}
                    name="AccountHolderName"
                    render={(field) => (
                        <FormItem >
                            <FormLabel> Account Holder Name </FormLabel>
                            <FormControl>
                                <Input
                                className="border w-full border-gray-700"
                                placeHolder="example: Himanshu Sharma" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
  >
    
  </FormField>
                    <FormField
                        control={form.control}
                    name="ifsc"
                    render={(field) => (
                        <FormItem >
                            <FormLabel> IFSC Code </FormLabel>
                            <FormControl>
                                <Input
                                className="border w-full border-gray-700"
                                placeHolder="example:XXXXX1111X" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
  >

  </FormField>
                    <FormField
                        control={form.control}
                    name="Accountnumber"
                    render={(field) => (
                        <FormItem >
                            <FormLabel> Account Number</FormLabel>
                            <FormControl>
                                <Input
                                className="border w-full border-gray-700"
                                placeHolder="example: 111122223333" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
  >

  </FormField>
                    <FormField
                        control={form.control}
                    name="ConfirmAccountnumber"
                    render={(field) => (
                        <FormItem >
                            <FormLabel>Confirm Account Number</FormLabel>
                            <FormControl>
                                <Input
                                className="border w-full border-gray-700"
                                placeHolder="example: 111122223333" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
  >

  </FormField>
                    <FormField
                        control={form.control}
                    name="bankName"
                    render={(field) => (
                        <FormItem >
                            <FormLabel>Bank Name</FormLabel>
                            <FormControl>
                                <Input
                                className="border w-full border-gray-700"
                                placeHolder="example: Yes Bank" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                        </FormItem>
                    )}
  >

  </FormField>
  <DialogClose className="w-full py-5">
  <Button type="submit" className="w-full py-5">
    Submit
  </Button>
  </DialogClose>
                </form>
            </Form>
        </div>
    )
}

export default PaymentDetailForm