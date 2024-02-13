import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import _header from "./_header";
import _sidebar from "./_sidebar";
import CRUD_Admins from "../../Functions/CRUD_Admins";
import CRUD_Teachers from "../../Functions/CRUD_Teachers";

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
        <CRUD_Teachers>
          <Outlet />
        </CRUD_Teachers>
      </CRUD_Admins>
    </>
  );
};

export default SuperAdminLayout;