import React, { createContext, useContext, useEffect, useState } from "react";
import { AxiosClient } from "../Api/AxiosClient";
import { useNavigate } from "react-router-dom";
import LoadingCircleContext from "../Components/LoadingCircleContext";
import cryptString from "../security/cryptString";
import toast, { Toaster } from "react-hot-toast";
// import "./styles.css";

const Context = createContext({
  errors: null,
  user: null,
  setUser: () => {},
  setErrors: () => {},
  Login: () => {},
  logout: () => {},
  getUserProfile: () => {},
  setLoadingContaxt: () => {},
  students: null,
  setStudents: () => {},
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
  navigateTo: () => {},
  setTeacher: () => {},
});

export const ContextApi = ({ children }) => {
  const [errors, setErrors] = useState(null);
  const [loadingContaxt, setLoadingContaxt] = useState(false);
  const [user, setUser] = useState(null);
  const [students, setStudents] = useState(null);
  const [admins, setAdmins] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [teachers, setTeachers] = useState(null);
  const [teacher, setTeacher] = useState(null);
  const [parents, setParnets] = useState(null);
  const navigate = useNavigate();

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

  const getUserProfile = async () => {
    if (localStorage.getItem("ud")) {
      try {
        setLoadingContaxt(true);
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
      console.log(error);
      toast.error(error.response.data.message, {
        duration: 4000,
        position: "top-right",
      });
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
      // console.log(error);
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
        setAdmin,
        setTeacher,
        students,
        admin,
        admins,
        teachers,
        teacher,
        parents,
        calculateAge,
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
