import React from 'react';
import Navbar from '../Comlponents/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Comlponents/Footer';

const HomeLayouts = () => {
  return (
     <>
       <Navbar/>
       <Outlet/>
       <Footer/>
     </>
  );
};

export default HomeLayouts;