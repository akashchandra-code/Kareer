import React from 'react';
import { MousePointerClick, Brain, ShieldCheck, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: <MousePointerClick className="text-[#24cfa5]  w-10 h-10" />,
    title: 'Easy to Use',
    points: [
      'Clean and intuitive interface.',
      'Apply to jobs in just a few clicks.',
      'No learning curve—ready to use.',
      'Smooth user experience on all devices.',
    ],
  },
  {
    icon: <Brain className="text-[#24cfa5] w-10 h-10" />,
    title: 'AI Resume Analyzer',
    points: [
      'Scans resumes for skills and keywords.',
      'Matches you with relevant jobs instantly.',
      'Improves resume with AI suggestions.',
      'Saves time.',
    ],
  },
  {
    icon: <ShieldCheck className="text-[#24cfa5]  w-10 h-10" />,
    title: 'Secure & Verified',
    points: [
      'Data is encrypted and secure.',
      'Verified employers and listings.',
      'No fake job posts or scams.',
      'Ensures safe job search experience.',
    ],
  },
];

const Feature = () => {
  return (
    <div className="w-full py-14 md:py-20 px-6  md:mb-10 text-white">
      <h1 className="text-[2.5rem] sm:text-[3rem] md:text-[5rem] font-[neu]  text-center mb-16 text-white">
        Features 
      </h1>

      <div className="flex flex-col md:flex-row gap-10 justify-center  items-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#171717] w-full md:w-[25rem] hover:-translate-y-2 transition-transform duration-300 min-h-[340px] shadow-md border-t-4 border-[#24cfa5] rounded-xl p-8 text-center"
          >
            <div className="flex justify-center mb-4">
              <div className=" p-4 rounded-full">{feature.icon}</div>
            </div>
            <h2 className="text-xl font-semibold mb-6 text-white">{feature.title}</h2>
            <ul className="text-left space-y-3">
              {feature.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-white">
                  <CheckCircle size={18} className="text-[#24cfa5] mt-1" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feature;
