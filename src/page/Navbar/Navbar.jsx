import React from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Logo from "@/Utils/LOGO.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DragHandleHorizontalIcon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'
import { store } from '@/State/Store'

const Navbar = () => {
    const {auth}=useSelector(store=>store)
    return (
        <div className='px-2 py-3 border-b z-50 flex justify-between items-center'>
            <div className='flex items-center gap-4 '>
                <Sheet>
                    <SheetTrigger><Button
                        variant="ghost"
                        size="icon"
                        className="rounded-full h-11 w-11"
                    >
                        <DragHandleHorizontalIcon className="h-8 w-8" />
                    </Button>
                    </SheetTrigger>
                    <SheetContent side="left">
                        <SheetHeader>
                            <SheetTitle className="text-3xl gap-10 flex flex-col justify-center">
                                <div className='flex  justify-center items-center gap-1'>
                                    <Avatar>
                                        <AvatarImage src={Logo} />
                                        <AvatarFallback>C</AvatarFallback>
                                    </Avatar>
                                    <div className='flex justify-center items-center'>
                                        <span className=' flex text-orange-400 '> Crypto</span>
                                        <span className=''> Mela</span>
                                    </div>
                                </div>
                                <Sidebar />
                            </SheetTitle>
                        </SheetHeader>
                    </SheetContent>
                </Sheet>
                <div className='flex gap-6'>
                    <div className='flex justify-between items-center gap-1'>
                    <Avatar>
                        <AvatarImage src={Logo} />
                        <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                    <div className='flex'>
                        <span className=' flex text-orange-400 font-bold text-lg'> Crypto</span>
                        <span className='font-bold text-lg'> Mela</span>
                    </div>
                    </div>
                    <Button className="flex gap-2">
                        <MagnifyingGlassIcon className="h-7 w-7" />
                        <span className='w-2vh'>Search</span>
                    </Button>
                </div>
            </div>
            <div>
                <Avatar>
                     <AvatarImage src="x/" />
                    <AvatarFallback>{auth.user?.fullName[0]}</AvatarFallback>
                </Avatar>
            </div>
        </div>
    )
}
export default Navbar 
