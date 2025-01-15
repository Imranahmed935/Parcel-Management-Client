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

const Navbar = () => {
  const [position, setPosition] = useState("bottom");

  return (
    <div className="flex justify-between items-center p-4 bg-gray-100 shadow-md">
      {/* Logo Section */}
      <div className="flex items-center gap-4">
        <img
          className="w-16 h-16 rounded-full"
          src={logo}
          alt="SwiftShip Logo"
        />
        <h1 className="text-3xl font-bold text-gray-800">SwiftShip</h1>
      </div>

      {/* Navigation Section */}
      <div className="flex items-center gap-6">
        <NavLink to="/" className="text-lg text-gray-700 hover:text-blue-500">
          Home
        </NavLink>

        <NavLink to="/notifications" className="text-lg">
          <MdNotifications className="text-2xl text-gray-700 hover:text-blue-500" />
        </NavLink>

        <Link to={"/login"}>
          {" "}
          <Button className="bg-blue-500 text-white hover:bg-blue-600">
            Login
          </Button>
        </Link>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">Options</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={position}
              onValueChange={setPosition}
            >
              <DropdownMenuRadioItem value="top">User</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="bottom">
                Dashboard
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="right">
                LogOut
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
