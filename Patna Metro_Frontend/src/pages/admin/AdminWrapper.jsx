import React, { useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

const AdminWrapper = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // If not logged in, show the Login screen
  if (!isLoggedIn) {
    return <AdminLogin onLogin={setIsLoggedIn} />;
  }

  // If logged in, show the Dashboard
  return <AdminDashboard onLogout={setIsLoggedIn} />;
};

export default AdminWrapper;
