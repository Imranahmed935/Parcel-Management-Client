"use client";

import { Link, NavLink } from "react-router-dom";
import { MdNotifications } from "react-icons/md";
import { useState } from "react";
import logo from "../../assets/logo/parcel2.png";
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
  const [role] = useRole();
  

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
    <div className="flex justify-between items-center sticky top-0 z-20 bg-white px-4">
      <div className="flex items-center gap-4">
        <img
          className="w-16 h-16 rounded-full"
          src={logo}
          alt="SwiftShip Logo"
        />
        <h1 className="lg:text-3xl text-2xl font-bold text-blue-600">
          SwiftShip
        </h1>
      </div>


      <div className="flex items-center gap-6">
        <NavLink to="/" className="text-lg text-gray-700 hover:text-blue-500">
          Home
        </NavLink>

        <NavLink  className="text-lg">
          <MdNotifications className="text-2xl text-gray-700 hover:text-blue-500" />
        </NavLink>

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
                    {role === 'admin' && <NavLink to={'/dashboard/statistics'}> Dashboard </NavLink>}
                    {role === 'deliveryMan' && <NavLink to={'/dashboard/myDeliveryList'}> Dashboard </NavLink>}
                    {role === 'user' && <NavLink to={'/dashboard/profile'}> Dashboard </NavLink>}
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="right">
                    <Button onClick={handleLogoutForm}>LogOut <IoIosLogOut className="text-red-600 text-2xl" /></Button>
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
