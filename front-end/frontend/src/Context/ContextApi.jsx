import React, {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { AxiosClient, BACKEND_URL } from "../Api/AxiosClient";
import { useNavigate } from "react-router-dom";
import LoadingCircleContext from "../Components/LoadingCircleContext";
import cryptString from "./../security/cryptString";

const Context = createContext({
  errors: null,
  user: null,
  setUser: () => {},
  setErrors: () => {},
  Login: () => {},
  logout: () => {},
  getUserProfile: () => {},
  setLoadingContaxt: () => {},
});

const ContextApi = ({ children }) => {
  const [errors, setErrors] = useState(null);
  const [loadingContaxt, setLoadingContaxt] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
        // navigate('/')
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
        errors,
        setErrors,
        logout,
        user,
        setUser,
        getUserProfile,
        setLoadingContaxt,
      }}
    >
      {loadingContaxt ? <LoadingCircleContext /> : children}
    </Context.Provider>
  );
};

export const useContextApi = () => useContext(Context);

export default ContextApi;
