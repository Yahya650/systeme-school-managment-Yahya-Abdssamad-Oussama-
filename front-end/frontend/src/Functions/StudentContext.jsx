import React, { createContext, useContext } from "react";
import toast from "react-hot-toast";
import { useContextApi } from "../Context/ContextApi";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { AxiosClient } from "../Api/AxiosClient";

const Context = createContext({
  getStudents: () => {},
  renewPassword: () => {},
  updateProfilePicture: () => {},
  getStudent: () => {},
  updateStudent: () => {},
  removeStudent: () => {},
  createStudent: () => {},
});

const StudentContext = ({ children }) => {
  const {
    setErrors,
    setStudents,
    setTotal,
    setPageCount,
    navigateTo,
    setLoadingProfilePicture,
    setStudent,
    currentPage,
  } = useContextApi();

  async function getStudents(currentPage = 1) {
    try {
      const { data } = await AxiosClient.get(
        "/admin/students?page=" + currentPage
      );
      setTotal(data.total);
      setPageCount(data.last_page);
      setStudents(data.data);
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 4000,
        position: "top-right",
      });
    }
  }

  async function renewPassword(id) {
    try {
      const { data } = await AxiosClient.get(
        "/admin/etudiants/" + dcryptID(id) + "/renew-password"
      );
      withReactContent(Swal).fire({
        title: data.message,
        html: (
          <div>
            <b>Code Massar : </b> {data.code_massar} <br />
            <b>Nouveau mot de passe: </b> {data.password} <br />
            <b>Password : </b> {data.message} <br />
          </div>
        ),
        icon: "success",
      });
      toast.success(data.message, {
        duration: 4000,
        position: "top-right",
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 4000,
        position: "top-right",
      });
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  }

  async function updateProfilePicture(id, profile_picture) {
    setLoadingProfilePicture(true);
    try {
      const formDataFile = new FormData();
      formDataFile.append("profile_picture", profile_picture);

      const { data } = await AxiosClient.post(
        "/admin/etudiants/" + dcryptID(id) + "/update-profile-picture",
        formDataFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await getStudent(dcryptID(id));
      toast.success(data.message, {
        duration: 4000,
        position: "top-right",
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 4000,
        position: "top-right",
      });
    } finally {
      setLoadingProfilePicture(false);
    }
  }

  async function getStudent(id) {
    try {
      const { data } = await AxiosClient.get("/admin/students/" + id);
      setStudent(data);
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 4000,
        position: "top-right",
      });
    }
  }

  async function updateStudent(id, dataForm) {
    try {
      const { data } = await AxiosClient.put("/admin/students/" + id, dataForm);
      toast.success(data.message, {
        duration: 4000,
        position: "top-right",
      });
      setErrors(null);
      navigateTo(-1);
      // getStudents();
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 4000,
        position: "top-right",
      });
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  }

  async function removeStudent(id) {
    const toastId = toast.loading("Suppression en cours...", {
      style: { color: "white", background: "black" },
    });
    try {
      const { data } = await AxiosClient.delete("/admin/students/" + id);
      await getStudents(currentPage);
      toast.success(data.message, {
        duration: 4000,
        position: "top-center",
      });
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 4000,
        position: "top-center",
      });
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function createStudent(dataForm) {
    try {
      const { data } = await AxiosClient.post("/admin/students", dataForm);
      withReactContent(Swal).fire({
        title: data.message,
        html: (
          <div>
            <b>Code Massar : </b> {data.code_massar} <br />
            <b>Nouveau mot de passe: </b> {data.password} <br />
            <b>Password : </b> {data.message} <br />
          </div>
        ),
        icon: "success",
      });
      toast.success(data.message, {
        duration: 4000,
        position: "top-right",
      });
      setErrors(null);
      navigateTo("/admin/all-students");
      // getStudents();
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 4000,
        position: "top-right",
      });
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  }
  return (
    <Context.Provider
      value={{
        getStudents,
        renewPassword,
        updateProfilePicture,
        getStudent,
        updateStudent,
        removeStudent,
        createStudent,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStudentContext = () => useContext(Context);

export default StudentContext;
