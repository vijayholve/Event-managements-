import React, { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
import { useEventContext } from "../../context/EventContext";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const {
    events,
    setEvents,
    filteredEvents,
    setFilteredEvents,
    categories,
    cities,
    loading,
  } = useEventContext();

  // Set all events initially
  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  // Filter logic
useEffect(() => {
  let filtered = events;

  const log = (label, data) => console.log(label, JSON.stringify(data, null, 2));

  if (selectedCategory) {
    filtered = filtered.filter(
      (event) =>
        String(event.category?.id || event.category) === selectedCategory
    );
  }

  if (selectedCity) {
    filtered = filtered.filter(
      (event) =>
        String(event.city?.id || event.city) === selectedCity
    );
  }

  console.log("Filtered Events", filtered);
  setFilteredEvents(filtered);
}, [selectedCategory, selectedCity, events]);

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">EventMate</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <a href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="/about" className="text-gray-700 hover:text-blue-600">
            About
          </a>

          {/* Category Dropdown */}
          <select
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Category</option>
            {categories?.map((cat) => (
              <option key={cat.id} value={String(cat.id)}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* City Dropdown */}
          <select
            className="bg-gray-100 text-gray-700 px-3 py-1 rounded"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>

          {/* Search */}
          <input
            type="text"
            placeholder="Search events..."
            className="px-3 py-1 border border-gray-300 rounded"
          />

          {/* Notification */}
          <button className="relative">
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              3
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 space-y-2 px-2 pb-4">
          <a href="/" className="block text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="/about" className="block text-gray-700 hover:text-blue-600">
            About
          </a>

          <select
            className="w-full bg-gray-100 text-gray-700 px-3 py-1 rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <select
            className="w-full bg-gray-100 text-gray-700 px-3 py-1 rounded"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <option value="">City</option>
            {cities.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search events..."
            className="w-full px-3 py-1 border border-gray-300 rounded"
          />

          <button className="flex items-center gap-2 text-gray-700">
            <Bell className="w-5 h-5" /> Notifications
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
