import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from "./View/Home/Index";
import MainLayout from './Layout/MainLayout';
import "./Css/Vendors.css";
import "./Css/Main.css";

import "./Css/Style.css";
import CruiseList from './View/Cruise/CruiseList';
import CruiseBooking from './View/Booking/CruiseBooking';
import SuccessPage from './View/Success/SuccessPage';
import Index from './View/FlightList/Index';
import Checkout from './View/Checkout/Checkout';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout/>}>
              <Route path='/' element={<Home/>}/>
              <Route path='/cruiselist' element={<CruiseList/>}/>
              <Route path='/cruisebooking' element={<CruiseBooking/>}/>
              <Route path='/success' element={<SuccessPage/>}/>
              <Route path="/flight-list" element={<Index/>}/>
              <Route path="/checkout" element={<Checkout/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
