import React, { useEffect } from "react";
import _header from "./_header";
import { Outlet, useNavigate } from "react-router-dom";
import _sidebar from "./_sidebar";
import _footer from './../_footer';

const ParentStudentLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("ud") &&
      JSON.parse(localStorage.getItem("ud")).role === "student-parent"
    ) {
      document.title = "GSB - Parent Student";
    } else {
      navigate("/student-parent/login");
    }
  }, []);

  return (
    <>
      <_header />
      <_sidebar />
      <div className="page-wrapper" style={{ minHeight: "394px" }}>
        <Outlet />
        <_footer />
      </div>
    </>
  );
};

export default ParentStudentLayout;
