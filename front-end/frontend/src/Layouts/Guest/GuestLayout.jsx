import React, { useEffect } from "react";
import _header from "./_header";
import { Outlet, useNavigate } from "react-router-dom";

const GuestLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("ud")) {
      navigate("/admin/dashboard");
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
