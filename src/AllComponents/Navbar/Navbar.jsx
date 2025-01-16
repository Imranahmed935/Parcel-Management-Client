"use client";

import { Link, NavLink } from "react-router-dom";
import { MdNotifications } from "react-icons/md";
import { useState } from "react";
import logo from "../../assets/logo/parcel2.png";
import { Button } from "@/components/ui/button";
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

const Navbar = () => {
  const [position, setPosition] = useState("bottom");
  const { user, handleLogout } = useAuth();

  const handleLogoutForm = () => {
    handleLogout()
      .then(() => {
        console.log("successfully logout");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <img
          className="w-16 h-16 rounded-full"
          src={logo}
          alt="SwiftShip Logo"
        />
        <h1 className="lg:text-3xl text-2xl font-bold text-gray-800">
          SwiftShip
        </h1>
      </div>

      {/* Navigation Section */}
      <div className="flex items-center gap-6">
        <NavLink to="/" className="text-lg text-gray-700 hover:text-blue-500">
          Home
        </NavLink>

        <NavLink to="/notifications" className="text-lg">
          <MdNotifications className="text-2xl text-gray-700 hover:text-blue-500" />
        </NavLink>

        {user ? (
          <>
            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                {/* <Button variant="outline">Options</Button> */}
                <img
                  className="w-10 h-10 rounded-full"
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
                    {user.displayName}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="bottom">
                    <NavLink to={'/dashboard'}>
                          Dashboard
                    </NavLink>
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">
                    <Button onClick={handleLogoutForm}>LogOut</Button>
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              {" "}
              <Button className="bg-blue-500 text-white hover:bg-blue-600">
                Login
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
