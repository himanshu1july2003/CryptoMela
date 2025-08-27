import { Card } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar'
import { UpdateIcon } from '@radix-ui/react-icons'
import { ShuffleIcon } from 'lucide-react'
import React from 'react'

const TransactionsHistory = () => {
    return (
        <div>
            <div className="py-5 pt-10">
                <div className="flex gap-2 items-center pb-5">
                    <h1 className="text-2xl font-semibold">History</h1>
                    <UpdateIcon className="h-7 w-7 p-0 cursor-pointer hover:text-gray-400" />
                </div>
                <div className="space-y-5">
                    {[1,1,1,1,1,1].map((item,i)=>
                    <div key={i} className='flex flex-col items-center'>
                        <Card className="lg:w-[90%] w-[90%] px-5 flex flex-row  items-center">
                            <div className="flex items-center gap-5">
                                <Avatar >
                                    <AvatarFallback>
                                        <ShuffleIcon className="" />
                                    </AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="space-y-1">
                                <h1>Buy Asset</h1>
                                <p className='text-sm text-gray-500'>20-5-2025</p>
                            </div>
                        </Card>
                    </div>)}
                </div>
            </div>
        </div>
    )
}

export default TransactionsHistory