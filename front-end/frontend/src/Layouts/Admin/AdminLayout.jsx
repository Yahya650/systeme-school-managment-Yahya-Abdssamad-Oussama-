import React, { useEffect, useLayoutEffect } from "react";
import _header from "./_header";
import _sidebar from "./_sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import _footer from "./_footer";
// import { AxiosClient } from "../../Api/AxiosClient.js";
import { useContextApi } from "../../Context/ContextApi.jsx";

function AdminLayout() {
  const navigate = useNavigate();
  const { user, getUserProfile, setLoadingContaxt } = useContextApi();

  useEffect(() => {
    if (!localStorage.getItem("ud")) {
      navigate("/admin/login");
    } else {
      document.title = "GSB - Admin";
    }
  }, []);

  return (
    <>
      <_header />
      <_sidebar />
      <Outlet />
      {/* <_footer /> */}
    </>
  );
}

export default AdminLayout;
