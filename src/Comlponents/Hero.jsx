// src/components/Banner.jsx
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Hero = () => {
  return (
    <div className="w-full max-w-screen-2xl mx-auto mt-6">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={800}
      >
        {/* Slide 1 */}
        <div className="relative h-[400px]">
          <img
            src="https://i.ibb.co/GRYxCHT/scholarship1.jpg"
            alt="Scholarship Offer 1"
            className="h-full w-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-3xl md:text-4xl font-bold">
              🎓 100% Tuition Fee Waiver – Apply Now!
            </h2>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="relative h-[400px]">
          <img
            src="https://i.ibb.co/mJGB2F7/scholarship2.jpg"
            alt="Scholarship Offer 2"
            className="h-full w-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-3xl md:text-4xl font-bold">
              🌍 Global Scholarships for Top Universities
            </h2>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="relative h-[400px]">
          <img
            src="https://i.ibb.co/5BBbThF/scholarship3.jpg"
            alt="Scholarship Offer 3"
            className="h-full w-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <h2 className="text-white text-3xl md:text-4xl font-bold">
              💼 Internship + Scholarship Combo Program
            </h2>
          </div>
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
