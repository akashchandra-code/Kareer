import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.4 },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Hero = () => {
  const navbarDone = useSelector((state) => state.ui.navbarAnimationDone);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 🧠 For mobile: render basic content
  if (!isDesktop) {
    return (
      <div className="w-full mt-24 md:mt-10 px-4 md:px-12 lg:px-24 py-20 font-[neu] relative">
        <div className="text-center md:text-left">
          <h1 className="text-[2.3rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[6rem] xl:text-[7rem] font-[neu] leading-tight md:leading-[1.2]">
            Land <span className="text-[#24cfa5]">your dream</span>
            <br className="hidden md:block" />
            job with <br className="hidden md:block" />
            confidence.
          </h1>

          <p className="block mt-4 text-sm text-center font-[hel] text-white">
            Kickstart your <span className="text-[#24cfa5]">career with Kareer</span>. Explore,
            apply, and get hired – smarter and faster.
          </p>

          <div className="mt-8 flex justify-center">
            <Link to="/jobs">
              <button className="bg-[#24cfa5] px-6 py-2.5 rounded-lg text-white font-[neu] transition duration-300 hover:bg-[#1bb896]">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 💻 For desktop: use animation
  return (
    <motion.div
      className="w-full mt-24 md:mt-10 px-4 md:px-12 lg:px-24 py-20 font-[neu] relative"
      variants={containerVariants}
      initial="hidden"
      animate={navbarDone ? 'visible' : 'hidden'}
    >
      <div className="text-center md:text-left">
        <h1 className="text-[2.3rem] sm:text-[3rem] md:text-[4.5rem] lg:text-[6rem] xl:text-[7rem] font-[neu] leading-tight md:leading-[1.2]">
          <motion.span variants={wordVariants}>Land</motion.span>{"    "}
          <motion.span variants={wordVariants} className="text-[#24cfa5]">
            your dream
          </motion.span>{' '}
          <br className="hidden md:block" />
          <motion.span className='' variants={wordVariants}>job with</motion.span>{' '}
          <br className="hidden md:block" />
          <motion.span variants={wordVariants}>confidence.</motion.span>
        </h1>

        <motion.h2
          className="hidden md:block absolute top-[90%] right-10 text-sm md:text-base lg:text-lg w-60 font-extralight font-[hel]"
          variants={wordVariants}
        >
          Kickstart your <span className="text-[#24cfa5]">career with Kareer</span>. Explore,
          apply, and get hired – smarter and faster.
        </motion.h2>

        <motion.div
          className="mt-8 flex justify-center md:justify-start"
          variants={wordVariants}
        >
          <Link to="/jobs">
            <button className="bg-[#24cfa5] px-6 py-2.5 rounded-lg text-white font-[neu] transition duration-300 hover:bg-[#1bb896]">
              Get started
            </button>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Hero;
