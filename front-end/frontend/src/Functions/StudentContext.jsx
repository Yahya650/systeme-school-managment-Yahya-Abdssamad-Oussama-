import React, { createContext, useContext } from "react";
import toast from "react-hot-toast";
import { useContextApi } from "../config/Context/ContextApi";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { AxiosClient } from "../config/Api/AxiosClient";
import { errorToast, successToast } from "../config/Toasts/toasts";

const ContextStudent = createContext({
  getStudents: () => {},
  renewPassword: () => {},
  updateProfilePicture: () => {},
  getStudent: () => {},
  updateStudent: () => {},
  removeStudent: () => {},
  // createStudent: () => {},
  updateStudentWithParent: () => {},
  createStudentWithParent: () => {},
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
      errorToast(error.response.data.message);
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
      successToast(data.message);
    } catch (error) {
      errorToast(error.response.data.message);
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
      successToast(data.message);
    } catch (error) {
      errorToast(error.response.data.message);
    } finally {
      setLoadingProfilePicture(false);
    }
  }

  async function getStudent(id) {
    try {
      const { data } = await AxiosClient.get("/admin/students/" + id);
      setStudent(data);
    } catch (error) {
      errorToast(error.response.data.message);
    }
  }

  async function updateStudentWithParent(id, dataForm) {
    try {
      const { data } = await AxiosClient.put(
        "/admin/students/" + id + "/upadte-with-parent",
        dataForm
      );
      successToast(data.message);
      setErrors(null);
      navigateTo(-1);
    } catch (error) {
      errorToast(error.response.data.message);
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
      successToast(data.message, 3000, "top-center");
    } catch (error) {
      errorToast(error.response.data.message, 6000, "top-center");
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
      successToast(data.message);
      setErrors(null);
      navigateTo("/admin/all-students");
      // getStudents();
    } catch (error) {
      errorToast(error.response.data.message);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  }

  async function createStudentWithParent(dataForm) {
    try {
      const { data } = await AxiosClient.post(
        "/admin/etudiants/create-with-parent",
        dataForm
      );
      withReactContent(Swal).fire({
        title: data.message,
        html: (
          <div className="d-flex gap-2">
            <div>
              <h1>Etudiant Information</h1>
              <b>Code Massar : </b> {data.code_massar} <br />
              <b>UserName : </b> {data.email} <br />
              <b>Password : </b> {data.password} <br />
            </div>
            <div>
              <h1>Parent Information</h1>
              <b>CIN : </b> {data.cin} <br />
              <b>Password : </b> {data.parent_password} <br />
            </div>
          </div>
        ),
        icon: "success",
      });
      successToast(data.message);
      setErrors(null);
      navigateTo(-1);
    } catch (error) {
      errorToast(error.response.data.message);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  }
  return (
    <ContextStudent.Provider
      value={{
        getStudents,
        renewPassword,
        updateProfilePicture,
        getStudent,
        // updateStudent,
        removeStudent,
        createStudent,
        updateStudentWithParent,
        createStudentWithParent,
      }}
    >
      {children}
    </ContextStudent.Provider>
  );
};

export const useStudentContext = () => useContext(ContextStudent);

export default StudentContext;
