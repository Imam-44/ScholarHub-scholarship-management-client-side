// src/components/Hero.jsx
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-scroll";

<Link
  to="student-success"
  smooth={true}
  duration={800}
  className="mt-6 bg-amber-500 text-white px-6 py-2.5 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-amber-600 transition cursor-pointer"
>
  <span>Read Success Stories</span>
</Link>


const slides = [
  {
    id: 1,
    title: "100% Tuition Fee Waiver – Apply Now",
    description:
      "Get a full scholarship covering your entire tuition fee and join world-class institutions without any cost.",
    image: "https://i.ibb.co/fGv4rx1X/cambridge.jpg",
    buttonColor: "bg-amber-500",
  },
  {
    id: 2,
    title: "Global Scholarships for Top Universities",
    description:
      "Apply for prestigious global scholarships and get admitted to the top-ranked universities around the world today.",
    image: "https://i.ibb.co/0R2fhxyN/photo-1592280771190-3e2e4d571952.jpg",
    buttonColor: "bg-amber-500",
  },
  {
    id: 3,
    title: "Internship + Scholarship Combo Program",
    description:
      "Enhance your career with combined internship and scholarship programs offered by international academic partners.",
    image: "https://i.ibb.co/Ygf8xCX/graduate-3.jpg",
    buttonColor: "bg-amber-500",
  },
];

const Hero = () => {
  return (
    <div className="">
      <div className="w-full">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={4000}
          transitionTime={800}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="relative h-[300px] md:h-[450px] lg:h-[600px]"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-amber-400 text-xl md:text-3xl lg:text-4xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-white text-sm md:text-lg max-w-2xl">
                  {slide.description}
                </p>
                <Link to="student-success"
                  smooth={true}
                  duration={800}
                   offset={-100} 
                  >
                  <button
                    className={`${slide.buttonColor} text-white px-6 py-2.5 rounded-full text-sm font-medium flex items-center space-x-2 hover:bg-amber-600 transition cursor-pointer mt-6`}
                    type="button"
                  >
                    <span>Read Success Stories</span>
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M4.821 11.999h13.43m0 0-6.714-6.715m6.715 6.715-6.715 6.715"
                        stroke="#fff"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Hero;
