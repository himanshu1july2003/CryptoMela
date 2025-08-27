import React from 'react'
import {
  Sheet,
  SheetClose
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { BookmarkIcon, CreditCard, HomeIcon, LandmarkIcon, Wallet } from 'lucide-react'
import { LayoutDashboard as DashboardIcon } from 'lucide-react'
import { ActivityLogIcon, ExitIcon, PersonIcon } from '@radix-ui/react-icons'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/State/Auth/Action'
import { store } from '@/State/Store'

const menu = [
  { name: "Home", path: "/", icon: <HomeIcon className="h-6 w-6" /> },
  { name: "Profile", path: "/Profile", icon: <PersonIcon className="h-6 w-6" /> },
  { name: "Portfolio", path: "/portfolio", icon: <DashboardIcon className="h-6 w-6" /> },
  { name: "Watchlist", path: "/Watchlist", icon: <BookmarkIcon className="h-6 w-6" /> },
  { name: "Activity", path: "/Activity", icon: <ActivityLogIcon className="h-6 w-6" /> },
  { name: "Payment Detail", path: "/PaymentDetail", icon: <LandmarkIcon className="h-6 w-6" /> },
  { name: "Wallet", path: "/Wallet", icon: <Wallet className="h-6 w-6" /> },
  { name: "Withdraw", path: "/Withdraw", icon: <CreditCard className="h-6 w-6" /> },
  { name: "Logout", path: "/signin", icon: <ExitIcon className="h-6 w-6" /> }, // ✅ logout ke baad login page bhejna better h
]

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const {auth}=useSelector(store=>store);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin"); // ✅ logout ke baad login ya home page bhej
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      {menu.map((e) => (
        <div key={e.name}>
          <SheetClose asChild>
            <Button
              onClick={() => {
                if (e.name === "Logout") {
                  handleLogout(); // ✅ sirf logout ke liye alag handle
                } else {
                  navigate(e.path); // ✅ baaki sab ke liye normal navigation
                }
              }}
              variant=""
              className="flex gap-3 w-full justify-start"
            >
              <span>{e.icon}</span>
              <span>{e.name}</span>
            </Button>
          </SheetClose>
        </div>
      ))}
    </div>
  )
}

export default Sidebar
