import React, { useEffect } from "react";
import _header from "./_header";
import _sidebar from "./_sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import _footer from "../_footer.jsx";
import StudentContext from "../../Functions/StudentContext.jsx";
import ParentContext from "../../Functions/ParentContext.jsx";

function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("ud") &&
      JSON.parse(localStorage.getItem("ud")).role === "admin"
    ) {
      document.title = "GSB - Admin";
    } else {
      navigate("/admin/login");
    }
  }, []);

  return (
    <>
      <_header />
      <_sidebar />
      <StudentContext>
        <ParentContext>
          <div className="page-wrapper" style={{ minHeight: "394px" }}>
            <Outlet />
            <_footer />
          </div>
        </ParentContext>
      </StudentContext>
    </>
  );
}

export default AdminLayout;
