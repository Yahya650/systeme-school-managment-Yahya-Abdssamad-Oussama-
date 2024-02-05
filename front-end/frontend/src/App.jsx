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

function App() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Page404 />} />
        {/* Guest Layout Routes */}
        <Route path="/" element={<GuestLayout />}>
          <Route index element={'Guest'} /> 
          <Route path="admin/login" element={<LoginAdmin />} />
          <Route path="admin/forgot-password" element={<ForgotPasswordAdmin />} />
        </Route>

        {/* SuperAdmin Layout Routes */}
        <Route path="/super-admin" element={<SuperAdminLayout />}></Route>

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
        <Route path="/teacher" element={<TeacherLayout />}></Route>

        {/* ParentStudent Layout Routes */}
        <Route path="/parent-student" element={<ParentStudentLayout />}></Route>

        {/* Student Layout Routes */}
        <Route path="/student" element={<StudentLayout />}></Route>
      </Routes>
    </>
  );
}

export default App;
