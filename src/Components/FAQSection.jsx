import React, { useEffect, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How can I apply for a scholarship?",
      answer: "You can apply by registering on ScholarHub, selecting a scholarship, filling out the application form, and paying the required fees.",
    },
    {
      question: "Can I apply for multiple scholarships?",
      answer: "Yes, you can apply for multiple scholarships, but make sure you meet the eligibility criteria for each one.",
    },
    {
      question: "Are the scholarships free?",
      answer: "Most scholarships cover tuition fees partially or fully. Some may require a small application or service charge.",
    },
    {
      question: "How will I know if my application is accepted?",
      answer: "You can track your application status in your Dashboard. Admin or moderators will update the status and provide feedback.",
    },
    {
      question: "Is there a deadline for applications?",
      answer: "Yes, each scholarship has a specific application deadline. Make sure to submit before the deadline to be considered.",
    },
  ];

  return (
    <section className="bg-gradient-to-br from-red-900 via-red-950 to-black py-16 px-6 md:px-12 my-3 w-11/12 mx-auto rounded-2xl shadow-2xl">
      <div className="text-center mb-14">
        <h2 className="text-4xl font-bold text-white flex items-center justify-center gap-3">
          <FaQuestionCircle className="text-amber-400" size={30} />
          Frequently Asked Questions
        </h2>
        <p className="text-amber-100 mt-3 max-w-2xl mx-auto text-lg">
          Find answers to common questions about applying scholarships and using ScholarHub.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-black/20 backdrop-blur-md border border-red-800 rounded-2xl shadow-md overflow-hidden"
          >
            <button
              className="w-full text-left px-6 py-4 flex justify-between items-center text-amber-100 hover:text-amber-400 transition"
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            >
              <span className="font-semibold">{faq.question}</span>
              <span className="text-xl">{openIndex === idx ? "-" : "+"}</span>
            </button>
            {openIndex === idx && (
              <div className="px-6 pb-4 text-amber-200 text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
