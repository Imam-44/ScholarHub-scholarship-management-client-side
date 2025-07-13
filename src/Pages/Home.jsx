import React from 'react';
import Hero from '../Components/Hero';
import TopScholarships from '../Components/TopScholarship';
import Hi from '../Components/Hi';
import StudentSuccessStories from '../Components/StudentSuccessStories';
import CoreFeatures from '../Components/CoreFeatures';

const Home = () => {
  return (
     <div className='w-11/12 mx-auto'>
       <Hero/>
       <TopScholarships/>
       <StudentSuccessStories/>
       <CoreFeatures/>
     </div>
  );
};

export default Home;