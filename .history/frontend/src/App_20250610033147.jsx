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
import CreateCity from "./pages/city/CreateCity";
import CityPanel from "./pages/panel/CityPanel";
import UpdateCity from "./pages/city/UpdareCity";
import CategoryPanel from "./pages/panel/categoryPanel";
import CreateCategory from "./pages/category/CreateCategory";
import UpdateCategory from "./pages/category/UpdareCategory";
import CreateVenue from "./pages/venue/CreateVenue";
import VenuePanel from "./pages/panel/VenuePanel";
import UpdateVenue from "./pages/venue/UpdareVenue";
import Sidebar from "./components/sidebar/Sidebar";
import RoleBasedRoute from "./auth/RoleBasedRoute";
import NotFoundPage from "./components/notFound/NotFound";
import WeekendNotifications from "./components/notifications/Notification";
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          path="*"
          element={
            <PrivateRoute>
              <NotFoundPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <Sidebar>
                <DashBoard />
              </Sidebar>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/userpanel"
          element={
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <Sidebar>
                <UserPanel />
              </Sidebar>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/eventpanel"
          element={
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <Sidebar>
                <EventPanel />
              </Sidebar>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/user/create"
          element={
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <Sidebar>
                <CreateUserForm />
              </Sidebar>
            </RoleBasedRoute>
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
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <UpdateUserForm />
            </RoleBasedRoute>
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
          path="/events/notification"
          element={
            <PrivateRoute>
              <top
              <WeekendNotifications/>
            </PrivateRoute>
          }
        />
        <Route
          path="/event/create"
          element={
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <CreateEvent />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/event/edit/:id"
          element={
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <UpdateEventForm />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/citypanel"
          element={
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <Sidebar>
                <CityPanel />
              </Sidebar>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/city/create"
          element={
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <CreateCity />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/city/edit/:id"
          element={
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <UpdateCity />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/categorypanel"
          element={
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <Sidebar>
                <CategoryPanel />
              </Sidebar>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/venuepanel"
          element={
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <Sidebar>
                <VenuePanel />
              </Sidebar>
            </RoleBasedRoute>
          }
        />
        <Route
          path="/category/create"
          element={
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <CreateCategory />
            </RoleBasedRoute>
          }
        />

        <Route
          path="/category/edit/:id"
          element={
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <UpdateCategory />
            </RoleBasedRoute>
          }
        />
        {/* Root Redirect */}
        <Route
          path="/venue/create"
          element={
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <CreateVenue />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/venue/edit/:id"
          element={
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <UpdateVenue />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/setting"
          element={
            <RoleBasedRoute allowedRoles={["organizer"]}>
              <Sidebar>
                <SiteConfigEditor />
              </Sidebar>
            </RoleBasedRoute>
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
