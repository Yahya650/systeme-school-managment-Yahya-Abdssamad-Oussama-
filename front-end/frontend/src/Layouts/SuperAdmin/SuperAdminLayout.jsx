import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import _header from "./_header";
import _sidebar from "./_sidebar";

const SuperAdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("ud") &&
      JSON.parse(localStorage.getItem("ud")).role === "super-admin"
    ) {
      document.title = "GSB - Super Admin";
    } else {
      navigate("/super-admin/login");
    }
  }, []);

  return (
    <>
      <_header />
      <_sidebar />
      <Outlet />
    </>
  );
};

export default SuperAdminLayout;
