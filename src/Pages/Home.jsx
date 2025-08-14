
import Hero from '../Components/Hero';
import TopScholarships from '../Components/TopScholarships';
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