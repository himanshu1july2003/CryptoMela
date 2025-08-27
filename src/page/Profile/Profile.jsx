import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { VerifiedIcon } from 'lucide-react'
import AccountVerificationform from '@/page/Auth(signUp_Login)/AccountVerificationform'
import { useSelector } from 'react-redux'
import { store } from '@/State/Store'
const Profile = () => {
  const {auth}=useSelector(store=>store)
  return (
    <div className='flex flex-col items-center mb-5'>
      <div className='pt-10 w-full lg:w-[60%]'>
        <Card>
          <CardHeader className='pb-9'>
            <CardTitle className="text-3xl">Your Details</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col">
            <div className='flex flex-col lg:flex gap-10 '>
              <div className='space-y-7'>
                <div className='flex'>
                  <p className='w-[9rem]'>Email : </p>
                  <p className='text-gray-500'>{auth.user?.email}</p>
                </div>
              </div>
              <div className='space-y-7'>
                <div className='flex'>
                  <p className='w-[9rem]'>Full Name : </p>
                  <p className='text-gray-500'> {auth.user?.fullName }</p>
                </div>
              </div>
              <div className='space-y-7'>
                <div className='flex'>
                  <p className='w-[9rem]'>Date of Birth : </p>
                  <p className='text-gray-500'>01-07-2003</p>
                </div>
              </div>
              <div className='space-y-7'>
                <div className='flex'>
                  <p className='w-[9rem]'>Nationality : </p>
                  <p className='text-gray-500'>Indian</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6">
          <Card className="w-full">
            <CardHeader className="pb-7">
              <div className="flex items-center gap-3">
                <CardTitle>2 Step Verification</CardTitle>
                {true ? (
                  <Badge className={"space-x-2 text-white bg-green-600"}>
                    <VerifiedIcon />
                    <span>Enabled</span>
                  </Badge>
                ) : (
                  <Badge className="bg-orange-500">Disabled</Badge>
                )}
              </div>
            </CardHeader>
          </Card> 
        </div>
      </div>
    </div>
  )
}

export default Profile