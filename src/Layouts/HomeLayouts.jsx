import React from 'react';
import Navbar from '../Comlponents/Navbar';
import { Outlet } from 'react-router';

const HomeLayouts = () => {
  return (
     <>
       <Navbar/>
       <Outlet/>
     </>
  );
};

export default HomeLayouts;