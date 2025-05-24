import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "./features/auth/authSlice";

import Login from "./auth/Login";
import Register from "./auth/Register";
import PrivateRoute from "./auth/PrivateRoute";
import Home from "./pages/base/Home";
import CreateEvent from "./pages/event/CreateEvent";
import DashBoard from "./pages/panel/DashBoard";
import Sidebar from "./components/navbar/Sidebar";
import SiteConfingContent, { SiteConfig } from "./api/siteconfig/Sitecofig";
import SiteConfigEditor from "./components/setting/SiteConfigEditor";
import { EventProvider } from "./context/EventContext";
import UpdateEventForm from "./pages/event/UpdateEventForm";
import UserPanel from "./pages/panel/UserPanel";
import { UserProvider } from "./context/UserContext";
import EventDetail from "./pages/event/EventDetail";
import EventPanel from "./pages/panel/EventPanel";
import EventRegisterPanel from "./pages/panel/EventRegisterPanel";
import CreateUserForm from "./pages/user/CreateUser";
import UserProfile from "./pages/user/UserProfile";
import UpdateUserForm from "./pages/user/UpdateUserForm";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem("tokens"));
    const user = JSON.parse(localStorage.getItem("user"));

    if (tokens && user) {
      dispatch(loginSuccess({ user, tokens }));
    }

    setIsLoading(false);
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <SiteConfingContent>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/home" replace /> : <Register />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Sidebar>
                <DashBoard />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/userpanel"
          element={
            <PrivateRoute>
              <Sidebar>
                <UserPanel />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/eventpanel"
          element={
            <PrivateRoute>
              <Sidebar>
                <EventPanel />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/user/create"
          element={
            <PrivateRoute>
              <Sidebar>
                <CreateUserForm />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/user/:id"
          element={
            <PrivateRoute>
              <Sidebar>
                <UserProfile />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/user/edit/:id"
          element={
            <PrivateRoute>
              <UpdateUserForm />
            </PrivateRoute>
          }
        />
        <Route
          path="/eventregisterpanel"
          element={
            <PrivateRoute>
              <Sidebar>
                <EventRegisterPanel />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/events/:id"
          element={
            <PrivateRoute>
              <EventDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/event/create"
          element={
            <PrivateRoute>
              <CreateEvent />
            </PrivateRoute>
          }
        />

        <Route
          path="/event/edit/:id"
          element={
            <PrivateRoute>
              <UpdateEventForm />
            </PrivateRoute>
          }
        />

        {/* Root Redirect */}
        <Route
          path="/setting"
          element={
            <PrivateRoute>
              <Sidebar>
                <SiteConfigEditor />
              </Sidebar>
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </SiteConfingContent>
  );
}

export default App;
