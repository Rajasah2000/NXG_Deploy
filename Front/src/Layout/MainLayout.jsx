import React, { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Outlet, useLocation } from 'react-router-dom'
import ColorContext from '../Components/Context/ColorContext';

function MainLayout() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    }, [location]

    )


  }

  )

  return (
    <ColorContext>
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
    </ColorContext>
  )
}

export default MainLayout
