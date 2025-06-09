import React, { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
import { useEventContext } from "../../context/EventContext";
import { NavLink } from "react-router-dom";
import Nav_link from "./nav-link";

const TopNavbar = () => {

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">EventMate</div>

  {/* Desktop Menu */}
<div className="hidden md:flex items-center gap-6">
  <Nav_link link="/" title={"home"}>
    Home
  </Nav_link>
  <Nav_link link="/dashboard" title={"dashboard"}>
    Dashboard2
  </Nav_link>
  </div>
  </div>
  </nav>
    );
}
export default TopNavbar;
