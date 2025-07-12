import React from 'react';
import Hero from '../Comlponents/Hero';
import TopScholarships from '../Comlponents/TopScholarship';

const Home = () => {
  return (
     <div className='w-11/12 mx-auto'>
       <Hero/>
       <TopScholarships/>
     </div>
  );
};

export default Home;