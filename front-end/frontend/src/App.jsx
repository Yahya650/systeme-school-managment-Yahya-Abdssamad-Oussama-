import { Route, Routes } from 'react-router-dom'
import './App.css'
import AdminLayout from './Layouts/Admin/AdminLayout'
import SuperAdminLayout from './Layouts/SuperAdmin/SuperAdminLayout';
import TeacherLayout from './Layouts/Teacher/TeacherLayout';
import ParentStudentLayout from './Layouts/ParentStudent/ParentStudentLayout';
import StudentLayout from './Layouts/Student/StudentLayout';
import GuestLayout from './Layouts/Guest/GuestLayout';

function App() {

  return (
    <>
      <Routes>

        {/* Guest Layout Routes */}
        <Route path='/' element={<GuestLayout />}>

        </Route>

        {/* SuperAdmin Layout Routes */}
        <Route path='/super-admin' element={<SuperAdminLayout />}>

        </Route>

        {/* Admin Layout Routes */}
        <Route path='/admin' element={<AdminLayout />}>

        </Route>

        {/* Teacher Layout Routes */}
        <Route path='/teacher' element={<TeacherLayout />}>

        </Route>

        {/* ParentStudent Layout Routes */}
        <Route path='/parent-student' element={<ParentStudentLayout />}>

        </Route>

        {/* Student Layout Routes */}
        <Route path='/student' element={<StudentLayout />}>

        </Route>

      </Routes>
    </>
  )
}

export default App
