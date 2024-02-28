import React, { createContext, useContext, useEffect, useState } from "react";
import { AxiosClient } from "../Api/AxiosClient";
import { useNavigate } from "react-router-dom";
import LoadingCircleContext from "../../Components/LoadingCircleContext";
import cryptString from "../security/cryptString";
import toast, { Toaster } from "react-hot-toast";
import { errorToast, successToast } from "../Toasts/toasts";

const Context = createContext({
  errors: null,
  user: null,
  setUser: () => {},
  setErrors: () => {},
  Login: () => {},
  logout: () => {},
  getUserProfile: () => {},
  setLoadingContaxt: () => {},
  setStudentsTrash: () => {},
  students: null,
  studentsTrash: null,
  setStudents: () => {},
  setStudent: () => {},
  student: null,
  admins: null,
  setAdmins: () => {},
  admin: null,
  setAdmin: () => {},
  teachers: null,
  setTeachers: () => {},
  parents: null,
  setParnets: () => {},
  calculateAge: () => {},
  teacher: null,
  pageCount: null,
  currentPage: null,
  total: null,
  loadingProfilePicture: null,
  adminsTrash: null,
  teachersTrash: null,
  setAdminsTrash: () => {},
  setTeachersTrash: () => {},
  navigateTo: () => {},
  setTotal: () => {},
  setTeacher: () => {},
  setPageCount: () => {},
  setCurrentPage: () => {},
  handlePageClick: () => {},
  setLoadingProfilePicture: () => {},
  changePassword: () => {},
  setIds: () => {},
  ids: null,
});

export const ContextApi = ({ children }) => {
  const [errors, setErrors] = useState(null);
  const [loadingContaxt, setLoadingContaxt] = useState(false);
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState(null);
  const [studentsTrash, setStudentsTrash] = useState(null);
  const [student, setStudent] = useState(null);
  const [admins, setAdmins] = useState(null);
  const [adminsTrash, setAdminsTrash] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const [teachersTrash, setTeachersTrash] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [parents, setParnets] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [ids, setIds] = useState([]);
  const [loadingProfilePicture, setLoadingProfilePicture] = useState(false);

  const navigate = useNavigate();

  const getUserProfile = async () => {
    setLoadingContaxt(true);
    if (localStorage.getItem("ud")) {
      try {
        const { data } = await AxiosClient.get(
          "/" + JSON.parse(localStorage.getItem("ud")).role + "/profile"
        );
        setUser(data);
      } catch (error) {
        localStorage.removeItem("ud");
        navigate("/");
      }
    }
    setLoadingContaxt(false);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const changePassword = async (guard, formData) => {
    try {
      const { data } = await AxiosClient.put(
        "/" + guard + "/change-password",
        formData
      );
      successToast(data.message);
      setErrors(null);
    } catch (error) {
      errorToast(error.response.data.message);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  };

  const handlePageClick = async (page, fetchData) => {
    const toastId1 = toast.loading("Loading...", {
      style: { color: "white", background: "black" },
    });
    const { selected } = page;
    const val_currentPage = selected + 1;
    await fetchData(false, val_currentPage);
    setCurrentPage(val_currentPage);
    toast.dismiss(toastId1);
  };

  // Function to calculate age based on date of birth
  const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  };

  const Login = async (guard, username, password) => {
    try {
      if (guard != "student" && guard != "student-parent") {
        const { data } = await AxiosClient.post("/" + guard + "/login", {
          cin_email: username,
          password,
        });
        setErrors(null);
        localStorage.setItem(
          "ud",
          JSON.stringify({ role: guard, _token: cryptString(data.token) })
        );
        await getUserProfile();
        navigate("/" + guard + "/dashboard", { replace: true });
      } else if (guard == "student") {
        const { data } = await AxiosClient.post("/" + guard + "/login", {
          code_massar: username,
          password,
        });
        setErrors(null);
        localStorage.setItem(
          "ud",
          JSON.stringify({ role: guard, _token: cryptString(data.token) })
        );
        await getUserProfile();
        navigate("/" + guard + "/dashboard", { replace: true });
      } else if (guard == "student-parent") {
        const { data } = await AxiosClient.post("/" + guard + "/login", {
          cin: username,
          password,
        });
        setErrors(null);
        localStorage.setItem(
          "ud",
          JSON.stringify({ role: guard, _token: cryptString(data.token) })
        );
        await getUserProfile();
        navigate("/" + guard + "/dashboard", { replace: true });
      }
    } catch (error) {
      errorToast(error.response.data.message);
      
      if (error.response.status === 422) {
        if (guard != "student" && guard != "student-parent") {
          setErrors({
            cin_email: error.response.data.errors.cin_email,
            password: error.response.data.errors.password,
          });
        } else if (guard == "student") {
          setErrors({
            code_massar: error.response.data.errors.code_massar,
            password: error.response.data.errors.password,
          });
        } else if (guard == "student-parent") {
          setErrors({
            cin: error.response.data.errors.cin,
            password: error.response.data.errors.password,
          });
        }
      }
    }
  };

  const logout = async (guard) => {
    try {
      await AxiosClient.get("/" + guard + "/logout");
      localStorage.removeItem("ud");
      navigate("/", { replace: true });
    } catch (error) {
      navigate("/error/401", { replace: true });
    }
  };

  return (
    <Context.Provider
      value={{
        Login,
        logout,
        errors,
        user,
        setErrors,
        setUser,
        getUserProfile,
        setLoadingContaxt,
        setAdmins,
        setTeachers,
        setParnets,
        setStudents,
        setStudentsTrash,
        setAdmin,
        setTeacher,
        adminsTrash,
        teachersTrash,
        setAdminsTrash,
        setTeachersTrash,
        students,
        studentsTrash,
        admin,
        admins,
        teachers,
        teacher,
        parents,
        pageCount,
        currentPage,
        total,
        loadingProfilePicture,
        ids,
        calculateAge,
        setIds,
        setLoadingProfilePicture,
        setPageCount,
        setCurrentPage,
        setTotal,
        handlePageClick,
        changePassword,
        setStudent,
        student,
        navigateTo: navigate,
      }}
    >
      {loadingContaxt ? (
        <div
          className="w-100 d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <LoadingCircleContext />
        </div>
      ) : (
        <>
          {children}
          <Toaster
            toastOptions={{
              success: {
                style: {
                  background: "green",
                },
              },
              error: {
                style: {
                  background: "#CC0000",
                },
              },
              style: {
                color: "white",
                zIndex: 99999,
              },
            }}
          />
        </>
      )}
    </Context.Provider>
  );
};

export const useContextApi = () => useContext(Context);

export default ContextApi;
