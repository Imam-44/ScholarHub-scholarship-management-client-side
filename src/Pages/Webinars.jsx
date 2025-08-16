import React from "react";
import { FaRegCalendarAlt, FaRegClock, FaChalkboardTeacher } from "react-icons/fa";
import Swal from "sweetalert2";

const webinars = [
  {
    id: 1,
    title: "How to Apply for Scholarships Successfully",
    host: "ScholarHub Team",
    date: "Aug 20, 2025",
    time: "4:00 PM - 5:30 PM GMT",
    image: "https://i.ibb.co.com/V07RTKfR/international-conference-1597531-1280.jpg",
    description: "Learn step-by-step how to submit winning scholarship applications and avoid common mistakes.",
  },
  {
    id: 2,
    title: "Top Universities for International Students",
    host: "University Experts",
    date: "Aug 25, 2025",
    time: "3:00 PM - 4:30 PM GMT",
    image: "https://i.ibb.co.com/5bZGWkP/adults-3984852-1280.jpg",
    description: "Discover the top universities offering full scholarships and how to secure your spot.",
  },
  {
    id: 3,
    title: "Writing a Compelling Scholarship Essay",
    host: "ScholarHub Mentors",
    date: "Sep 1, 2025",
    time: "5:00 PM - 6:00 PM GMT",
    image: "https://i.ibb.co.com/GfNtbCjR/right-4703925-1280.jpg",
    description: "Tips and strategies to craft scholarship essays that impress the selection committee.",
  },
];

const Webinars = () => {
  const handleRegister = (title) => {
    Swal.fire({
      icon: "success",
      title: "Registration Successful",
      text: `You have successfully registered for "${title}"`,
      confirmButtonColor: "#f59e0b",
    });
  };

  return (
    <section className="bg-gradient-to-br from-red-900 via-red-950 to-black py-16 px-6 md:px-12 my-4 w-11/12 mx-auto rounded-3xl shadow-2xl">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
          Upcoming Webinars
        </h2>
        <p className="text-amber-100 mt-3 max-w-2xl mx-auto text-lg">
          Join our interactive webinars to gain insights on scholarships, applications, and university selection.
        </p>
      </div>

      {/* Webinar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {webinars.map((webinar) => (
          <div
            key={webinar.id}
            className="bg-black/20 backdrop-blur-md border border-red-800 rounded-2xl shadow-md overflow-hidden hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src={webinar.image}
              alt={webinar.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-amber-400 mb-2">{webinar.title}</h3>
              <p className="text-sm text-amber-200 mb-3">{webinar.description}</p>
              <div className="flex flex-col gap-2 text-sm text-amber-300 mb-4">
                <span className="flex items-center gap-1">
                  <FaRegCalendarAlt /> {webinar.date}
                </span>
                <span className="flex items-center gap-1">
                  <FaRegClock /> {webinar.time}
                </span>
                <span className="flex items-center gap-1">
                  <FaChalkboardTeacher /> {webinar.host}
                </span>
              </div>
              <button
                onClick={() => handleRegister(webinar.title)}
                className="w-full bg-amber-400 text-black font-semibold py-2 rounded-xl hover:bg-amber-500 transition"
              >
                Register Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Webinars;
