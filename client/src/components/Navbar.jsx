import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";

function Navbar() {
  const [isopen, setIsopen] = useState(false);
  const toggleMenu = () => {
    setIsopen(!isopen);
  };
  return (
    // <div classNameName="md:flex justify-between  pt-8 pl-10 pr-10 md:flex-row h-20 flex flex-col gap-5 w-[100vw] ">
    //   <h1 classNameName="text-[#398D8D] md:text-3xl font-bold text-xl ">
    //     Deepfake Detection
    //   </h1>

    //   <ul
    //     classNameName={`flex md:gap-10 flex-col md:flex-row   transition-transform  duration-150 ease-in ${
    //       isopen
    //         ? "translate-y-0 opacity-100"
    //         : "-translate-y-full opacity-0 md:flex"
    //     } md:active md:translate-y-0 md:opacity-100 flex flex-col gap-5  `}
    //   >
    //     <li classNameName="text-[#398D8D]  text-[1.2rem] font-bold italic leading=[24.2px]">
    //       <Link to="/">Home</Link>
    //     </li>
    //     <li classNameName="text-[#398D8D] text-[1.2rem]  font-bold italic leading=[24.2px]">
    //       <Link to="/About">About</Link>
    //     </li>
    //     <li classNameName="text-[#398D8D]  text-[1.2rem]  font-bold italic leading=[24.2px]">
    //       <Link to="/Contact">Contact Us</Link>
    //     </li>
    //   </ul>
    //   <div onClick={toggleMenu} classNameName="md:hidden absolute right-8 top-9 ">
    //     {isopen ? <FaTimes /> : <FaBars />}
    //   </div>
    // </div>

    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            DF Detection
          </span>
        </Link>
        {/* <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <button
            type="button"
            className="text-white bg-[#398D8D] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Get started
          </button>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div> */}
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col items-center p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 text-gray-900 hover:text-[#398D8D] bg-blue-700 rounded md:bg-transparent md:p-0 md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 px-3 text-gray-900 rounded hover:text-[#398D8D] md:hover:bg-transparent md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="block py-2 px-3 text-gray-900 rounded hover:text-[#398D8D] md:hover:bg-transparent  md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact Us
              </Link>
            </li>
            <button className="bg-[#398D8D] hover:bg-[#2e6e6e] px-4 py-2 text-white rounded-xl">
              <Link to={"/login"}>Login</Link>
            </button>
            <button className="bg-[#398D8D] hover:bg-[#2e6e6e] px-4 py-2 text-white rounded-xl">
              <Link to={"/register"}>Register</Link>
            </button>
          </ul>
        </div>
      </div>
      <Outlet />
    </nav>
  );
}

export default Navbar;
