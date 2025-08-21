import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdOutlineMailLock } from "react-icons/md";
import { FaBlog } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { CiUser } from "react-icons/ci";

import { FaReact, FaNodeJs } from "react-icons/fa";
import { SiExpress, SiMongodb } from "react-icons/si";

import { images } from "../constants";
import { logout } from "../store/actions/user";

const navItemsInfo = [
  { name: "Home", type: "link", href: "/" , icon: FaHome },
  { name: "Blog", type: "link", href: "/blog" , icon: FaBlog},
  { name: "Contact", type: "link", href: "/contact" , icon: MdOutlineMailLock },
];

const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdownHandler = () => {
    setDropdown((curState) => {
      return !curState;
    });
  };

  return (
    <li className="relative group">
      {item.type === "link" ? (
        <>
          <Link to={item.href} className="flex items-center px-4 py-2 group-hover:text-[#1be415]  transition-colors duration-300"
          >
             <item.icon className="mr-2 w-7 h-7 text-current group-hover:text-[#1be415] transition-colors duration-300" />
            {item.name}
          </Link>
          <span className="cursor-pointer text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
            /
          </span>
        </>
      ) : (
        <div className="flex flex-col items-center">
          <button
            className="flex items-center px-4 py-2 gap-x-1"
            onClick={toggleDropdownHandler}
          >
            <span>{item.name}</span>
            <MdKeyboardArrowDown />
          </button>
          <div
            className={`${
              dropdown ? "block" : "hidden"
            } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
          >
            <ul className="flex flex-col overflow-hidden text-center rounded-lg shadow-lg bg-dark-soft lg:bg-transparent">
              {item.items.map((page, index) => (
                <Link
                  key={index}
                  to={page.href}
                  className="px-4 py-2 text-white hover:bg-dark-hard hover:text-white lg:text-dark-soft"
                >
                  {page.title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [navIsVisible, setNavIsVisible] = useState(false);
  const userState = useSelector((state) => state.user);
  const [profileDrowpdown, setProfileDrowpdown] = useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <section className="top-0 left-0 right-0 z-50">
      <header className="container flex items-center justify-between px-5 py-4 mx-auto">
        <Link to="/">
        <img className="w-60" src={images.VoaLogo} alt="logo" />
        </Link>

        <div className="flex items-center gap-3">
            <FaReact className="text-blue-500 w-6 h-6 hover:text-[#61DAFB] cursor-pointer" title="React" />
            <FaNodeJs className="text-white w-6 h-6 hover:text-[#68A063] cursor-pointer" title="Node.js" />
            <SiExpress className="text-yellow-500 w-6 h-6 hover:text-[#000000] cursor-pointer" title="Express" />
            <SiMongodb className="text-green-500 w-6 h-6 hover:text-[#47A248] cursor-pointer" title="MongoDB" />
       </div>

        <div className="z-50 lg:hidden">
          {navIsVisible ? (
            <AiOutlineClose
              className="w-6 h-6"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu className="w-6 h-6" onClick={navVisibilityHandler} />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } transition-all duration-300 mt-[56px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center`}
        >
          
          {/* MENU */}
          <ul className="flex flex-col items-center p-2 font-semibold text-white bg-gray-700 rounded-md gap-y-5 lg:text-dark-soft lg:flex-row gap-x-1">
            {navItemsInfo.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>
          {userState.userInfo ? (
            <div className="flex flex-col items-center font-semibold text-white gap-y-5 lg:text-dark-soft lg:flex-row gap-x-2">
              <div className="relative group">
                <div className="flex flex-col items-center">
                  <button
                    className="flex items-center px-6 py-2 mt-5 font-semibold bg-[#5eeccc] text-black transition-all duration-300 rounded gap-x-1 lg:mt-0 hover:bg-[#1be415]  cursor-pointer"
                    onClick={() => setProfileDrowpdown(!profileDrowpdown)}
                  >
                    <span>Account</span>
                    <MdKeyboardArrowDown />
                  </button>
                  <div
                    className={`${
                      profileDrowpdown ? "block" : "hidden"
                    } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-32 bg-gray-700`}>
                    <ul className="flex flex-col overflow-hidden text-center bg-gray-700 rounded-lg shadow-lg lg:bg-transparent">
                      {userState?.userInfo?.admin && (
                        <button
                          onClick={() => navigate("/dashboard")}
                          type="button"
                          className="flex px-1 py-1 text-white cursor-pointer hover:text-[#1be415]">
                          <MdDashboard className="w-5 h-5 mr-2"/>
                          Dashboard
                        </button>
                      )}

                      <button
                        onClick={() => navigate("/profile")}
                        type="button"
                        className="flex px-1 py-2 text-white cursor-pointer hover:text-[#1be415]">
                        <CiUser className="w-5 h-5 mr-1"/>
                        Profile
                      </button>
                      <button
                        onClick={logoutHandler}
                        type="button"
                        className="flex px-1 py-2 text-white cursor-pointer hover:text-[#1be415]">
                          <CgLogOut className="w-5 h-5 mr-1"/>
                        Logout
                      </button>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
             className="px-4 py-1 mt-5 font-semibold text-black bg-[#5eeccc] transition-all duration-300 rounded lg:mt-0  hover:bg-[#1be415] cursor-pointer"
            >
              Log-In
            </button>
          )}
        </div>
      </header>
    </section>
  );
};

export default Header;
