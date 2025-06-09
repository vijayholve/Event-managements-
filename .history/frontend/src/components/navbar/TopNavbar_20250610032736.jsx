import React, { useEffect, useState } from "react";
import { Bell, Menu } from "lucide-react";
import { useEventContext } from "../../context/EventContext";
import { NavLink } from "react-router-dom";
import Nav_link from "./nav-link";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { events, setFilteredEvents, categories, cities } = useEventContext();

  // Set all events initially
  useEffect(() => {
    setFilteredEvents(events);
  }, [events]);

  // Filter logic
  useEffect(() => {
    let filtered = events;

    if (selectedCategory) {
      filtered = filtered.filter(
        (event) =>
          String(event.category?.id || event.category) === selectedCategory
      );
    }

    if (selectedCity) {
      filtered = filtered.filter(
        (event) => String(event.city?.id || event.city) === selectedCity
      );
    }

    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter((event) =>
        [event.title, event.description, event.organizer, event.location]
          .filter((field) => typeof field === "string") // Only keep strings
          .some((field) => field.toLowerCase().includes(lowerQuery))
      );
    }

    setFilteredEvents(filtered);
  }, [selectedCategory, selectedCity, searchQuery, events]);

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
