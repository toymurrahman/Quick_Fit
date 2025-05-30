"use client";

import LoginButton from "@/components/Common/LoginButton";
import NavLink from "@/components/Common/NavLink";
import { AuthContext } from "@/components/Provider/AuthProvider";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import logo from "../../../../public/logo.png"
import Script from "next/script";
import { clearConfig } from "dompurify";

const Navbar = () => {
  const [showOptions, setShowOption] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [role, setRole] = useState();
  const axios = useAxiosPublic();
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (user) {
      axios
        .get(`/users/${user?.email}`)
        .then((res) => {
          setRole(res.data.role);
        })
        .catch((err) => {

        });
    }
  }, [user?.email]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localTheme = localStorage.getItem("theme");
      if (localTheme) {
        setTheme(localTheme);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      document.querySelector("html").setAttribute("data-theme", theme);
    }
  }, [theme]);

  const handleTheme = (e) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setTheme(newTheme);
  };

  const handleProfileClick = () => {
    setShowOption(!showOptions);
  };

  const navLinkClass =
    "justify-center font-medium mr-6 pb-1 font-light border-b-2 hover: border-transparent transition-all duration-700 hover:delay-200";

  const navLink = (
    <>
      <div className="capitalize flex lg:flex-row flex-col gap-2 lg:gap-0 ">
        <NavLink href="/" className={`${navLinkClass} `}>
          Home
        </NavLink>

        <NavLink href="/courses" className={`${navLinkClass} `}>
          Courses
        </NavLink>
        <NavLink
          href="/services/nutrition"
          className={`${navLinkClass} hover:delay-200 hover:border-b-slate-500 `}
        >
          Services
        </NavLink>
        <NavLink
          href="/tracker"
          className={`${navLinkClass} hover:delay-200 hover:border-b-slate-500 `}
        >
          Tracker
        </NavLink>
        <NavLink href="/calculator" className={`${navLinkClass} `}>
          Calculator
        </NavLink>
        <NavLink href="/eshop" className={`${navLinkClass} `}>
          E-Shop
        </NavLink>
        <NavLink href="/forum/health" className={`${navLinkClass} `}>
          Forum
        </NavLink>

        <div className="lg:flex lg:items-center lg:justify-end lg:space-x-8">
          <div className="relative">
            <div
              tabIndex={0}
              role="button"
              className={`${navLinkClass} text-xl ml-4 ${isDropdownOpen ? "text-three" : ""
                }`}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            // onBlur={() => setIsDropdownOpen(false)}
            >
              More
            </div>

            {isDropdownOpen && (
              <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md w-52 my-1 space-y-2 absolute top-12 lg:left-0 left-12">
                <NavLink href="/tips" className={`${navLinkClass} `}>
                  Tips
                </NavLink>
                <NavLink href="/eatBetter" className={`${navLinkClass} `}>
                  Eat Better
                </NavLink>
                <NavLink href="/contactUs" className={`${navLinkClass} `}>
                  Contact
                </NavLink>
                <NavLink href="/aboutUs" className={`${navLinkClass} `}>
                  About Us
                </NavLink>
                <NavLink href="/experts" className={`${navLinkClass} `}>
                  Our Expert
                </NavLink>
                <NavLink href="/bookmarks" className={`${navLinkClass} `}>
                  Bookmarks
                </NavLink>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-gray-200 ">
      <div className="navbar  pt-4 pb-4 bg-white w-11/12 mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow bg-base-100 rounded-box w-52"
            >
              {navLink}
            </ul>
          </div>

          <div>
            <Link href="/">
              {" "}
              <Image
                height={200}
                width={200}
                src={logo}
                // src='https://res.cloudinary.com/dmiq6scyx/image/upload/v1709571597/2_1_-removebg-preview_yhifxc.png'
                className=" h-20 w-28 md:w-40 object-cover"
              />
            </Link>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLink}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="avatar online" onClick={handleProfileClick}>
              <div className="w-12 rounded-full">
                <img src={user?.photoURL} alt="profile" />
              </div>
              {showOptions && (
                <ul className="dropdown-content text-md font-semibold  z-[1] w-24 lg:w-40  gap-1 menu p-2 shadow bg-base-100 rounded-md my-1 space-y-2 absolute top-12 mt-4 lg:-left-12 -left-6 ">
                  <p className="font-bold italic text-center text-secondary">
                    {user.displayName}
                  </p>
                  <hr />

                  <Link
                    href="/profile"
                    className="text-center hover:border-b-2 py-1 hover:border-secondary w-2/3 m-auto"
                  >
                    Profile
                  </Link>
                  {role == "admin" && (
                    <Link
                      href="/adminDashboard"
                      className="text-center hover:border-b-2 hover:border-secondary w-2/3 m-auto"
                    >
                      Dashboard
                    </Link>
                  )}
                  {role === "publisher" && (
                    <Link
                      href="/instructorDashboard"
                      className="text-center hover:border-b-2 hover:border-secondary w-2/3 m-auto"
                    >
                      Dashboard
                    </Link>
                  )}

                  <hr />
                  <button className="text-center btn btn-error hover:bg-three  " onClick={logOut}>
                    Logout
                  </button>
                </ul>
              )}
            </div>
          ) : (
            <Link href="/login" className="font-bold">
              <div className="md:w-32">
                <LoginButton>Login</LoginButton>
              </div>
            </Link>
          )}
          <label className="swap swap-rotate ml-2 hidden">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              onChange={handleTheme}
              checked={theme === "light" ? false : true}
            />

            {/* sun icon */}
            <svg
              className="swap-on fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off fill-current w-10 h-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
      </div>
      <Script src="//code.tidio.co/yon4hzclfzxqkaa36tvnrsacwevkewoi.js" async></Script> 
    </nav>
    
  );
};

export default Navbar;

