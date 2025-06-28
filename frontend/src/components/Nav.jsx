import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/actions/AuthActions";
import { motion } from "framer-motion";
import { setNavbarAnimationDone } from "../store/reducers/uiSlice";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    setTimeout(() => {
      navigate("/login");
    }, 100);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <motion.nav
      className={`fixed top-0 w-full z-50 md:px-12 md:py-5 px-4 lg:px-24 py-4 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } backdrop-blur-lg`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onAnimationComplete={() => dispatch(setNavbarAnimationDone(true))}
    >
      <motion.div
        className="flex items-center justify-between py-3"
        variants={containerVariants}
      >
        {/* Logo */}
        <motion.h1
          className="text-2xl font-[gilroy] text-[#24cfa5]"
          variants={itemVariants}
        >
          Kareer
        </motion.h1>

        {/* Desktop Nav */}
        <motion.div
          className="hidden md:flex gap-10 text-lg text-zinc-100 font-[hel]"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <NavLink className="hover:text-[#24cfa5]" to="/">
              Home
            </NavLink>
          </motion.div>
          <motion.div variants={itemVariants}>
            <NavLink className="hover:text-[#24cfa5]" to="/jobs">
              Jobs
            </NavLink>
          </motion.div>

          {user ? (
            <>
              <motion.div variants={itemVariants}>
                <NavLink className="hover:text-[#24cfa5]" to="/profile">
                  👤
                </NavLink>
              </motion.div>
              <motion.div variants={itemVariants}>
                <button onClick={handleLogout} className="hover:text-[#24cfa5]">
                  Logout
                </button>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div variants={itemVariants}>
                <NavLink className="hover:text-[#24cfa5]" to="/login">
                  Login
                </NavLink>
              </motion.div>
              <motion.div variants={itemVariants}>
                <NavLink className="hover:text-[#24cfa5]" to="/signup">
                  Sign Up
                </NavLink>
              </motion.div>
            </>
          )}
        </motion.div>

        {/* Hamburger Icon (not animated) */}
        <div
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(true)}
        >
          ☰
        </div>
      </motion.div>

      {/* Mobile Menu (you can optionally animate this too) */}
      <div
        className={`fixed top-0 right-0 h-screen w-full bg-black text-white transform transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="flex justify-between p-6 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          <h1 className="font-[gilroy] text-2xl uppercase">menu</h1>✖
        </div>

        <div className="flex flex-col px-6 py-4 h-full gap-10 text-lg font-[hel]">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/jobs" onClick={() => setIsOpen(false)}>
            Jobs
          </NavLink>

          {user ? (
            <>
              <NavLink to="/profile" onClick={() => setIsOpen(false)}>
                👤 Profile
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" onClick={() => setIsOpen(false)}>
                Login
              </NavLink>
              <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;
