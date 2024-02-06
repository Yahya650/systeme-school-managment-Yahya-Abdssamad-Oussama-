import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminLayout from "./Layouts/Admin/AdminLayout";
import SuperAdminLayout from "./Layouts/SuperAdmin/SuperAdminLayout";
import TeacherLayout from "./Layouts/Teacher/TeacherLayout";
import ParentStudentLayout from "./Layouts/ParentStudent/ParentStudentLayout";
import StudentLayout from "./Layouts/Student/StudentLayout";
import GuestLayout from "./Layouts/Guest/GuestLayout";
import DashboardAdmin from "./Pages/Admin/DashboardAdmin";
import CreateStudent from "./Pages/Admin/_student/CreateStudent";
import UpdateStudent from "./Pages/Admin/_student/UpdateStudent";
import ShowStudent from "./Pages/Admin/_student/ShowStudent";
import AllStudents from "./Pages/Admin/_student/AllStudents";
import Page404 from "./Pages/errors/Page404";
import LoginAdmin from "./Pages/Admin/Auth/LoginAdmin";
import ForgotPasswordAdmin from "./Pages/Admin/Auth/ForgotPasswordAdmin";
import DashboardSuperAdmin from "./Pages/SuperAdmin/DashboardSuperAdmin";
import LoginSuperAdmin from "./Pages/SuperAdmin/Auth/LoginSuperAdmin";
import ForgotPasswordSuperAdmin from "./Pages/SuperAdmin/Auth/ForgotPasswordSuperAdmin";
import DashboardTeacher from "./Pages/Teacher/DashboardTeacher";
import LoginTeacher from "./Pages/Teacher/Auth/LoginTeacher";
import ForgotPasswordTeacher from "./Pages/Teacher/Auth/ForgotPasswordTeacher";

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Page404 />} />

        {/* Guest Layout Routes */}
        <Route path="/" element={<GuestLayout />}>
          <Route index element={"Guest"} />

          {/* routes admin if he is not logged */}
          <Route path="admin/login" element={<LoginAdmin />} />
          <Route
            path="admin/forgot-password"
            element={<ForgotPasswordAdmin />}
          />

          {/* routes superAdmin if he is not logged */}
          <Route path="super-admin/login" element={<LoginSuperAdmin />} />
          <Route
            path="super-admin/forgot-password"
            element={<ForgotPasswordSuperAdmin />}
          />

          {/* routes Teacher if he is not logged */}
          <Route path="teacher/login" element={<LoginTeacher />} />
          <Route
            path="teacher/forgot-password"
            element={<ForgotPasswordTeacher />}
          />
        </Route>

        {/* SuperAdmin Layout Routes */}
        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route
            index
            element={<Navigate to="/super-admin/dashboard" replace />}
          />
          <Route path="dashboard" element={<DashboardSuperAdmin />} />
        </Route>

        {/* Admin Layout Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* if user going to /admin i will redirection to /admin/dashboard */}
          <Route index element={<Navigate to="/admin/dashboard" replace />} />

          <Route path="dashboard" element={<DashboardAdmin />} />
          <Route path="create-student" element={<CreateStudent />} />
          <Route path="update-student" element={<UpdateStudent />} />
          <Route path="show-student" element={<ShowStudent />} />
          <Route path="all-students" element={<AllStudents />} />
        </Route>

        {/* Teacher Layout Routes */}
        <Route path="/teacher" element={<TeacherLayout />}>
          <Route index element={<Navigate to="/teacher/dashboard" replace />} />

          <Route path="dashboard" element={<DashboardTeacher />} />
        </Route>

        {/* ParentStudent Layout Routes */}
        <Route path="/parent-student" element={<ParentStudentLayout />}></Route>

        {/* Student Layout Routes */}
        <Route path="/student" element={<StudentLayout />}></Route>
      </Routes>
    </>
  );
}

export default App;
