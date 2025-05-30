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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="">
      <Navbar />
      <div className="user-details">
        <h2>Welcome,  {user.id}:{user?.username}!</h2>
        <Link to={{
                pathname: "/dashboard",
              }}
              className="text-grey" >Dashboard</Link>
        <div className="user-info">
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Role:</strong> {user?.role}
          </p>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
      <Cards />
    </div>
  );
};

export default Home;
