import React, { useEffect } from "react";
import _header from "./_header";
import { Outlet, useNavigate } from "react-router-dom";
import _sidebar from "./_sidebar";

const TeacherLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("ud") &&
      JSON.parse(localStorage.getItem("ud")).role === "teacher"
    ) {
      document.title = "GSB - Teacher";
    } else {
      navigate("/teacher/login");
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

export default TeacherLayout;
