import React, { useEffect } from "react";
import _header from "./_header";
import { Outlet, useNavigate } from "react-router-dom";

const GuestLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("ud") &&
      JSON.parse(localStorage.getItem("ud")).role === "admin"
    ) {
      navigate("/admin/dashboard");
    } else if (
      localStorage.getItem("ud") &&
      JSON.parse(localStorage.getItem("ud")).role === "super-admin"
    ) {
      navigate("/super-admin/dashboard");
    } else if (
      localStorage.getItem("ud") &&
      JSON.parse(localStorage.getItem("ud")).role === "teacher"
    ) {
      navigate("/teacher/dashboard");
    }
    document.title = "GSB - Guest";
  }, []);

  return (
    <>
      <_header />
      <Outlet />
      {/* <footer></footer> */}
    </>
  );
};

export default GuestLayout;
