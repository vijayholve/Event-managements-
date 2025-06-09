import { NavLink } from "react-router-dom";
import Nav_link from "./nav-link";
import { Bell } from "lucide-react";

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
        <NavLink to="/events/notification" className="relative inline-block">
          <Bell className="w-5 h-5 text-gray-700" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
            3
          </span>
        </NavLink>
    </nav>
  );
};
export default TopNavbar;
