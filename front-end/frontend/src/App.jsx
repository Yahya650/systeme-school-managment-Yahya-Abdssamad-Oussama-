import React, { Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import $ from "jquery";

// Import layout components
import AdminLayout from "./Layouts/Admin/AdminLayout";
import SuperAdminLayout from "./Layouts/SuperAdmin/SuperAdminLayout";
import TeacherLayout from "./Layouts/Teacher/TeacherLayout";
import ParentStudentLayout from "./Layouts/ParentStudent/ParentStudentLayout";
import StudentLayout from "./Layouts/Student/StudentLayout";
import GuestLayout from "./Layouts/Guest/GuestLayout";
import LoadingCircleContext from "./Components/LoadingCircleContext";

// Lazy load your pages
const DashboardAdmin = React.lazy(() => import("./Pages/Admin/DashboardAdmin"));
const ProfileSuperAdmin = React.lazy(() =>
  import("./Pages/SuperAdmin/ProfileSuperAdmin")
);
const CreateStudent = React.lazy(() =>
  import("./Pages/Admin/_student/CreateStudent")
);
const UpdateStudent = React.lazy(() =>
  import("./Pages/Admin/_student/UpdateStudent")
);
const ShowStudent = React.lazy(() =>
  import("./Pages/Admin/_student/ShowStudent")
);
const AllStudents = React.lazy(() =>
  import("./Pages/Admin/_student/AllStudents")
);
const Page404 = React.lazy(() => import("./Pages/errors/Page404"));
const LoginAdmin = React.lazy(() => import("./Pages/Admin/Auth/LoginAdmin"));
const ForgotPasswordAdmin = React.lazy(() =>
  import("./Pages/Admin/Auth/ForgotPasswordAdmin")
);
const DashboardSuperAdmin = React.lazy(() =>
  import("./Pages/SuperAdmin/DashboardSuperAdmin")
);
const LoginSuperAdmin = React.lazy(() =>
  import("./Pages/SuperAdmin/Auth/LoginSuperAdmin")
);
const ForgotPasswordSuperAdmin = React.lazy(() =>
  import("./Pages/SuperAdmin/Auth/ForgotPasswordSuperAdmin")
);
const DashboardTeacher = React.lazy(() =>
  import("./Pages/Teacher/DashboardTeacher")
);
const LoginTeacher = React.lazy(() =>
  import("./Pages/Teacher/Auth/LoginTeacher")
);
const ForgotPasswordTeacher = React.lazy(() =>
  import("./Pages/Teacher/Auth/ForgotPasswordTeacher")
);
const Page401 = React.lazy(() => import("./Pages/errors/Page401"));
const DashboardStudent = React.lazy(() =>
  import("./Pages/Student/DashboardStudent")
);
const LoginStudent = React.lazy(() =>
  import("./Pages/Student/Auth/LoginStudent")
);
const ForgotPasswordStudent = React.lazy(() =>
  import("./Pages/Student/Auth/ForgotPasswordStudent")
);
const ForgotPasswordParent = React.lazy(() =>
  import("./Pages/ParentStudent/Auth/ForgotPasswordParent")
);
const DashboardParent = React.lazy(() =>
  import("./Pages/ParentStudent/DashboardParent")
);
const LoginParent = React.lazy(() =>
  import("./Pages/ParentStudent/Auth/LoginParent")
);
const AllAdmins = React.lazy(() =>
  import("./Pages/SuperAdmin/_admin/AllAdmins")
);
const ShowAdmin = React.lazy(() =>
  import("./Pages/SuperAdmin/_admin/ShowAdmin")
);
const UpdateAdmin = React.lazy(() =>
  import("./Pages/SuperAdmin/_admin/UpdateAdmin")
);
const CreateAdmin = React.lazy(() =>
  import("./Pages/SuperAdmin/_admin/CreateAdmin")
);
const CreateTeacher = React.lazy(() =>
  import("./Pages/SuperAdmin/_teacher/CreateTeacher")
);
const UpdateTeacher = React.lazy(() =>
  import("./Pages/SuperAdmin/_teacher/UpdateTeacher")
);
const ShowTeacher = React.lazy(() =>
  import("./Pages/SuperAdmin/_teacher/ShowTeacher")
);
const AllTeachers = React.lazy(() =>
  import("./Pages/SuperAdmin/_teacher/AllTeachers")
);
const IndexGuest = React.lazy(() => import("./Pages/Guest/IndexGuest"));
const ShowMarks = React.lazy(() => import("./Pages/Student/ShowMarks"));
const SaveMarksManual = React.lazy(() =>
  import("./Pages/Admin/_student/SaveMarksManual")
);
const SaveMarksExcel = React.lazy(() =>
  import("./Pages/Admin/_student/SaveMarksExcel")
);

const LezyLoadingSuspense = ({ component }) => (
  <Suspense
    fallback={
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "calc(100vh - 60px)" }}
      >
        <LoadingCircleContext />
      </div>
    }
  >
    {component}
  </Suspense>
);

function App() {
  var Sidemenu = function () {
    this.$menuItem = $("#sidebar-menu a");
  };
  function init() {
    var $this = Sidemenu;
    $("#sidebar-menu a").on("click", function (e) {
      if ($(this).parent().hasClass("submenu")) {
        e.preventDefault();
      }
      if (!$(this).hasClass("subdrop")) {
        $("ul", $(this).parents("ul:first")).slideUp(350);
        $("a", $(this).parents("ul:first")).removeClass("subdrop");
        $(this).next("ul").slideDown(350);
        $(this).addClass("subdrop");
      } else if ($(this).hasClass("subdrop")) {
        $(this).removeClass("subdrop");
        $(this).next("ul").slideUp(350);
      }
    });
    $("#sidebar-menu ul li.submenu a.active")
      .parents("li:last")
      .children("a:first")
      .addClass("active")
      .trigger("click");
  }
  useEffect(() => {
    init();
  }, []);

  return (
    <Routes>
      <Route path="*" element={<Page404 />} />
      <Route path="error/404" element={<Page404 />} />

      {/* Guest Layout Routes */}
      <Route path="/" element={<GuestLayout />}>
        <Route
          index
          element={<LezyLoadingSuspense component={<IndexGuest />} />}
        />
        <Route
          path="error/401"
          element={<LezyLoadingSuspense component={<Page401 />} />}
        />
        <Route
          path="admin/login"
          element={<LezyLoadingSuspense component={<LoginAdmin />} />}
        />
        <Route
          path="admin/forgot-password"
          element={<LezyLoadingSuspense component={<ForgotPasswordAdmin />} />}
        />
        <Route
          path="super-admin/login"
          element={<LezyLoadingSuspense component={<LoginSuperAdmin />} />}
        />
        <Route
          path="super-admin/forgot-password"
          element={
            <LezyLoadingSuspense component={<ForgotPasswordSuperAdmin />} />
          }
        />
        <Route
          path="teacher/login"
          element={<LezyLoadingSuspense component={<LoginTeacher />} />}
        />
        <Route
          path="teacher/forgot-password"
          element={
            <LezyLoadingSuspense component={<ForgotPasswordTeacher />} />
          }
        />
        <Route
          path="student/login"
          element={<LezyLoadingSuspense component={<LoginStudent />} />}
        />
        <Route
          path="student/forgot-password"
          element={
            <LezyLoadingSuspense component={<ForgotPasswordStudent />} />
          }
        />
        <Route
          path="student-parent/login"
          element={<LezyLoadingSuspense component={<LoginParent />} />}
        />
        <Route
          path="student-parent/forgot-password"
          element={<LezyLoadingSuspense component={<ForgotPasswordParent />} />}
        />
      </Route>

      {/* SuperAdmin Layout Routes */}
      <Route path="/super-admin" element={<SuperAdminLayout />}>
        <Route
          index
          element={<Navigate to="/super-admin/dashboard" replace />}
        />
        <Route
          path="profile"
          element={<LezyLoadingSuspense component={<ProfileSuperAdmin />} />}
        />
        <Route
          path="dashboard"
          element={<LezyLoadingSuspense component={<DashboardSuperAdmin />} />}
        />
        <Route
          path="create-admin"
          element={<LezyLoadingSuspense component={<CreateAdmin />} />}
        />
        <Route
          path="update-admin/:id"
          element={<LezyLoadingSuspense component={<UpdateAdmin />} />}
        />
        <Route
          path="show-admin/:id"
          element={<LezyLoadingSuspense component={<ShowAdmin />} />}
        />
        <Route
          path="all-admins"
          element={<LezyLoadingSuspense component={<AllAdmins />} />}
        />
        <Route
          path="create-teacher"
          element={<LezyLoadingSuspense component={<CreateTeacher />} />}
        />
        <Route
          path="update-teacher/:id"
          element={<LezyLoadingSuspense component={<UpdateTeacher />} />}
        />
        <Route
          path="show-teacher/:id"
          element={<LezyLoadingSuspense component={<ShowTeacher />} />}
        />
        <Route
          path="all-teachers"
          element={<LezyLoadingSuspense component={<AllTeachers />} />}
        />
      </Route>

      {/* Admin Layout Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route
          path="dashboard"
          element={<LezyLoadingSuspense component={<DashboardAdmin />} />}
        />
        <Route
          path="create-student"
          element={<LezyLoadingSuspense component={<CreateStudent />} />}
        />
        <Route
          path="update-student/:id"
          element={<LezyLoadingSuspense component={<UpdateStudent />} />}
        />
        <Route
          path="show-student/:id"
          element={<LezyLoadingSuspense component={<ShowStudent />} />}
        />
        <Route
          path="all-students"
          element={<LezyLoadingSuspense component={<AllStudents />} />}
        />
        <Route
          path="saisir-marks-manual"
          element={<LezyLoadingSuspense component={<SaveMarksManual />} />}
        />
        <Route
          path="saisir-marks-excel"
          element={<LezyLoadingSuspense component={<SaveMarksExcel />} />}
        />
      </Route>

      {/* Teacher Layout Routes */}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<Navigate to="/teacher/dashboard" replace />} />
        <Route
          path="dashboard"
          element={<LezyLoadingSuspense component={<DashboardTeacher />} />}
        />
      </Route>

      {/* ParentStudent Layout Routes */}
      <Route path="/student-parent" element={<ParentStudentLayout />}>
        <Route
          index
          element={<Navigate to="/student-parent/dashboard" replace />}
        />
        <Route
          path="dashboard"
          element={<LezyLoadingSuspense component={<DashboardParent />} />}
        />
      </Route>

      {/* Student Layout Routes */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Navigate to="/student/dashboard" replace />} />
        <Route
          path="dashboard"
          element={<LezyLoadingSuspense component={<DashboardStudent />} />}
        />
        <Route
          path="marks"
          element={<LezyLoadingSuspense component={<ShowMarks />} />}
        />
      </Route>
    </Routes>
  );
}

export default App;
