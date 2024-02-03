import React, { useEffect, useLayoutEffect } from "react";
import _header from "./_header";
import _sidebar from "./_sidebar";
import { Outlet } from "react-router-dom";
import _footer from "./_footer";

function AdminLayout() {
  useEffect(() => {
    const loadScripts = async () => {
      await import("../../../public/assets/js/jquery-3.6.0.min.js");
      await import(
        "../../../public/assets/plugins/bootstrap/js/bootstrap.bundle.min.js"
      );
      await import("../../../public/assets/js/feather.min.js");
      await import(
        "../../../public/assets/plugins/slimscroll/jquery.slimscroll.min.js"
      );
      await import(
        "../../../public/assets/plugins/apexchart/apexcharts.min.js"
      );
      await import("../../../public/assets/plugins/apexchart/chart-data.js");
      await import("../../../public/assets/js/script.js");
      await import("../../../public/assets/plugins/select2/js/select2.min.js");
      await import("../../../public/assets/plugins/moment/moment.min.js");
      await import("../../../public/assets/js/bootstrap-datetimepicker.min.js");
      await import(
        "../../../public/assets/plugins/datatables/datatables.min.js"
      );
    };
    loadScripts();
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
