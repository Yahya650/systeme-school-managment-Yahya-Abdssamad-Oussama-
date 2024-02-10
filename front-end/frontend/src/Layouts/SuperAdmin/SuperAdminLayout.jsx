import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import _header from "./_header";
import _sidebar from "./_sidebar";
import CRUD_Admins from "../../Functions/CRUD_Admins";

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

      {/* context for crud functions */}
      <CRUD_Admins>
        <Outlet />
      </CRUD_Admins>
    </>
  );
};

export default SuperAdminLayout;
