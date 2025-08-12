// src/components/Hero.jsx
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const Hero = () => {
  return (
    <div className=" ">
      <div className=" ">
        <div className="w-full   ">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={4000}
            transitionTime={800}
          >
            {/* Slide 1 */}
            <div className="relative h-[300px] md:h-[350px] lg:h-[600px]">
              <img
                src="https://i.ibb.co/fGv4rx1X/cambridge.jpg"
                alt="Scholarship Offer 1"
                className="h-full w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-amber-500 text-xl md:text-3xl lg:text-4xl font-bold mb-2">
                  100% Tuition Fee Waiver – Apply Now
                </h2>
                <p className="text-white text-sm md:text-lg max-w-2xl">
                  Get a full scholarship covering your entire tuition fee and join world-class institutions without any cost.
                </p>
                <button
                  className="mt-6 bg-amber-600 text-white px-6 py-2.5 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-amber-700 transition cursor-pointer"
                  type="button"
                >
                  <span>Read Success Stories</span>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715"
                      stroke="#fff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Slide 2 */}
            <div className="relative h-[300px] md:h-[450px] lg:h-[600px]">
              <img
                src="https://i.ibb.co/0R2fhxyN/photo-1592280771190-3e2e4d571952.jpg"
                alt="Scholarship Offer 2"
                className="h-full w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-amber-500 text-xl md:text-3xl lg:text-4xl font-bold mb-2">
                  Global Scholarships for Top Universities
                </h2>
                <p className="text-white text-sm md:text-lg max-w-2xl">
                  Apply for prestigious global scholarships and get admitted to the top-ranked universities around the world today.
                </p>
                <button
                  className="mt-6 bg-amber-600 hover:bg-amber-800 text-white px-6 py-2.5 rounded-full text-sm font-medium flex items-center space-x-2  transition cursor-pointer"
                  type="button"
                >
                  <span>Read Success Stories</span>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715"
                      stroke="#fff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Slide 3 */}
            <div className="relative h-[300px] md:h-[450px] lg:h-[600px]">
              <img
                src="https://i.ibb.co/Ygf8xCX/graduate-3.jpg"
                alt="Scholarship Offer 3"
                className="h-full w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-amber-500 text-xl md:text-3xl lg:text-4xl font-bold mb-2">
                  Internship + Scholarship Combo Program
                </h2>
                <p className="text-white text-sm md:text-lg max-w-2xl">
                  Enhance your career with combined internship and scholarship programs offered by international academic partners.
                </p>
                <button
                  className="mt-6 bg-amber-600 text-white px-6 py-2.5 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-amber-700 transition cursor-pointer"
                  type="button"
                >
                  <span>Read Success Stories</span>
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                    <path
                      d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715"
                      stroke="#fff"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Hero;
