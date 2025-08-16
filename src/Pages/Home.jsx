// src/Pages/Home.jsx
import React, { useEffect } from "react";
import Hero from "../Components/Hero";
import TopScholarships from "../Components/TopScholarships";
import StudentSuccessStories from "../Components/StudentSuccessStories";
import CoreFeatures from "../Components/CoreFeatures";
import ScholarshipCategories from "../Components/ScholarshipCategories";
import NewsletterSubscription from "../Components/NewsletterSubscription";
import ScholarshipStats from "../Components/ScholarshipStats";
import AnimatedSection from "../Components/AnimatedSection";
import FeaturedUniversities from "../Components/FeaturedUniversities";


const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);  
  }, []);

  return (
    <div className="">
      {/* Hero Section */}
   
        <Hero />


      <div className="w-11/12 mx-auto">

        {/* Top Scholarships */}
        <AnimatedSection>
          <TopScholarships />
        </AnimatedSection>

        {/* Scholarship Stats */}
        <AnimatedSection>
          <ScholarshipStats />
        </AnimatedSection>

        {/* Student Success Stories */}
        <AnimatedSection>
          <StudentSuccessStories />
        </AnimatedSection>

        {/* Core Features */}
        <AnimatedSection>
          <CoreFeatures />
        </AnimatedSection>

        {/* Featured Universities Carousel */}
        <AnimatedSection>
           <FeaturedUniversities/>
        </AnimatedSection>

        {/* Newsletter Subscription */}
        <AnimatedSection>
          <NewsletterSubscription />
        </AnimatedSection>

        {/* Scholarship Categories */}
        <AnimatedSection>
          <ScholarshipCategories />
        </AnimatedSection>

      </div>
    </div>
  );
};

export default Home;
