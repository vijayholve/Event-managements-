import React from "react";
import UserList from "../../components/list/UserList";
import Header from "../../components/dashboard/Header";

const UserPanel = () => {
  return (
    <>
<Header
  title="User Creation"
  subtitle="Fill the form to register a new user"
  icon="bi bi-person-plus"
  link="/user/create"
/>
      <UserList />
    </>
  );
};

export default UserPanel;
