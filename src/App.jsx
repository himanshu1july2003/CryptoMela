import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './page/Home/Home';
import Auth from './page/Auth(signUp_Login)/Auth';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from './State/Auth/Action';
import Portfolio from './page/Portfolio/Portfolio';
import Profile from './page/Profile/Profile';
import Watchlist from './page/Watchlist/Watchlist';
import Activity from './page/Activity/Activity';
import PaymentDetail from './page/PaymentDetail/PaymentDetail';
import Wallet from './page/Wallet/Wallet';
import StockDetails from './page/StockDetails/StockDetails';
import SearchCoin from './page/SearchCoin/SearchCoin';
import Withdraw from './page/Withdraw/Withdraw';
import NotFound from './page/NotFound/NotFound';
import Navbar from './page/Navbar/Navbar';

function App() {
  const {auth}=useSelector(store=>store);
  const dispatch=useDispatch()
   console.log("auth: ",auth)
   
useEffect(() => {
  const token = localStorage.getItem("jwt");
  if (token && !auth.user) {
    dispatch(getUser(token));

  }
}, [auth.jwt, auth.user, dispatch]); // 👈 ab user bhi dependency me hai


  return (
    <BrowserRouter>
    {!auth.user ?(
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path="/signin" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/forgot-password" element={<Auth />}/>
        </Routes>
):(
         <>
          {/* ✅ Navbar sirf login ke baad show hoga */}
          <Navbar />  
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/Portfolio' element={<Portfolio />}></Route>
            <Route path='/Profile' element={<Profile />}></Route>
            <Route path='/Watchlist' element={<Watchlist />}></Route>
            <Route path='/Activity' element={<Activity />}></Route>
            <Route path='/PaymentDetail' element={<PaymentDetail />}></Route>
            <Route path='/Wallet' element={<Wallet />}></Route>
            <Route path='/market/:id' element={<StockDetails />}></Route>
            <Route path='/SearchCoin' element={<SearchCoin />}></Route>
            <Route path='/Withdraw' element={<Withdraw />}></Route>
            <Route path='*' element={<NotFound />}></Route>
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;