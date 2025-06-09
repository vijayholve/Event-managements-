// Home.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../features/auth/authSlice";
import "../../css/base/Home.css";
import Navbar from "../../components/navbar/Navbar";
import Cards from "../../components/card/Cards";
const Home = () => {
  const user = useSelector((state) => state.auth.user);


  return (
    <div className="">
      <Navbar />
      <Cards />
    </div>
  );
};

export default Home;
