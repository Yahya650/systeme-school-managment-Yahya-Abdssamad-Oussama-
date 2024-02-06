import React, { useEffect } from "react";
import _header from "./_header";
import { Outlet, useNavigate } from "react-router-dom";
import _sidebar from "./_sidebar";

const StudentLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("ud") &&
      JSON.parse(localStorage.getItem("ud")).role === "student"
    ) {
      document.title = "GSB - Student";
    } else {
      navigate("/student/login");
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

export default StudentLayout;
