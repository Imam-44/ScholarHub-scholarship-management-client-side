import React from 'react';
import Hero from '../Components/Hero';
import TopScholarships from '../Components/TopScholarship';
import StudentSuccessStories from '../Components/StudentSuccessStories';
import CoreFeatures from '../Components/CoreFeatures';

const Home = () => {
  return (
    <>
      <Hero />
      <div className='w-11/12 mx-auto'>

        <TopScholarships />
        <StudentSuccessStories />
        <CoreFeatures />
      </div>
    </>
  );
};

export default Home;