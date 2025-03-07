"use client";

import { Link, NavLink } from "react-router-dom";
import { MdMenu, MdNotifications } from "react-icons/md";
import { useState } from "react";
import logo from "../../assets/logo/new-logo.png";
import { Button } from "@/components/ui/button";
import { IoIosLogOut } from "react-icons/io";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/Hooks/useAuth";
import useRole from "@/Hooks/useRole";
import toast from "react-hot-toast";

const Navbar = () => {
  const [position, setPosition] = useState("bottom");
  const { user, handleLogout } = useAuth();
  const [roleUser] = useRole();
  const [open, setOpen] = useState(false);

  const handleLogoutForm = () => {
    handleLogout()
      .then(() => {
        toast.success("successfully logout");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <div className=" p-2 sticky top-0 z-20 bg-white">
      <div className="flex justify-between items-center px-4 lg:w-8/12 mx-auto ">
        <div className="flex items-center lg:gap-0 gap-4">
          <img
            className="w-20 h-20 rounded-full hidden md:block "
            src={logo}
            alt="SwiftShip Logo"
          />
          <span
            onClick={() => setOpen(true)}
            className={`md:hidden text-2xl ${open ? "hidden" : "block"}`}
          >
            <MdMenu />
          </span>
          <span
            onClick={() => setOpen(false)}
            className={`text-red-500 md:hidden ${
              open ? "block" : "hidden"
            } text-2xl `}
          >
            X
          </span>
          <h1 className="lg:text-3xl text-lg font-bold text-blue-600">
            SwiftShip
          </h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex gap-6">
            <NavLink to="/" className={({ isActive }) =>
                      isActive ? "border-b border-b-black text-lg text-blue-600 font-semibold" : "text-lg text-blue-600 font-semibold "
                    }>
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "border-b border-b-black text-lg text-blue-600 font-semibold" : "text-lg text-blue-600 font-semibold "
              }
            >
              About Us
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "border-b border-b-black text-lg text-blue-600 font-semibold" : "text-lg text-blue-600 font-semibold "
              }
            >
              Contact us
            </NavLink>
          </div>

          <ul
            className={`md:hidden transition-all duration-300 ease-in-out absolute top-16 bg-gray-200 p-6 rounded shadow-lg 
  ${open ? "left-4 opacity-100 scale-100" : "-left-full opacity-0 scale-95"}`}
          >
            <NavLink
              to="/"
              className="text-lg text-gray-700 font-semibold block"
            >
              <li onClick={()=>setOpen(false)}>Home</li>
            </NavLink>
            <NavLink
              to="/about"
              className="text-lg text-gray-700 font-semibold block"
            >
              <li onClick={()=>setOpen(false)}>About Us</li>
            </NavLink>
            <NavLink
              to="/contact"
              className="text-lg text-gray-700 font-semibold block"
            >
              <li onClick={()=>setOpen(false)}>Contact Us</li>
            </NavLink>
          </ul>

          {user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img
                    className="w-10 h-10 cursor-pointer rounded-full"
                    src={user?.photoURL}
                    alt=""
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                  >
                    <DropdownMenuRadioItem value="top">
                      {user?.displayName}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">
                      {roleUser === "admin" && (
                        <NavLink to={"/dashboard/statistics"}>
                          {" "}
                          Dashboard{" "}
                        </NavLink>
                      )}
                      {roleUser === "deliveryMan" && (
                        <NavLink to={"/dashboard/myDeliveryList"}>
                          {" "}
                          Dashboard{" "}
                        </NavLink>
                      )}
                      {roleUser === "user" && (
                        <NavLink to={"/dashboard/profile"}> Dashboard </NavLink>
                      )}
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">
                      <Button onClick={handleLogoutForm}>
                        LogOut <IoIosLogOut className="text-red-600 text-2xl" />
                      </Button>
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                {" "}
                <Button className="bg-[#f8de5a] text-black rounded hover:bg-[#c5a91b]">
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
