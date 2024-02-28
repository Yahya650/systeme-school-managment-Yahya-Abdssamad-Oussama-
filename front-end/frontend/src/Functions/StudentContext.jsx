import React, { createContext, useContext } from "react";
import toast from "react-hot-toast";
import { useContextApi } from "../config/Context/ContextApi";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { AxiosClient } from "../config/Api/AxiosClient";
import { errorToast, successToast } from "../config/Toasts/toasts";
import dcryptID from "../config/security/dcryptID";

const ContextStudent = createContext({
  getStudents: () => {},
  renewPassword: () => {},
  updateProfilePicture: () => {},
  getStudent: () => {},
  updateStudent: () => {},
  removeStudent: () => {},
  getStudentsTrash: () => {},
  createStudent: () => {},
  updateStudentWithParent: () => {},
  restoreStudent: () => {},
  createStudentWithParent: () => {},
  restoreStudentSelected: () => {},
  deleteStudentSelected: () => {},
  updateStudentWithCreateParent: () => {},
});

const StudentContext = ({ children }) => {
  const {
    setErrors,
    setStudents,
    setStudentsTrash,
    setTotal,
    setPageCount,
    navigateTo,
    setLoadingProfilePicture,
    setStudent,
    currentPage,
    setIds,
    studentsTrash,
    students,
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

  async function updateStudent(id, dataForm) {
    try {
      const { data } = await AxiosClient.put("/admin/students/" + id, dataForm);
      successToast(data.message);
      setErrors(null);
      navigateTo(-1);
    } catch (error) {
      console.log(error);
      errorToast(error.response.data.message);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  }

  async function getStudentsTrash(currentPage = 1) {
    try {
      const { data } = await AxiosClient.get(
        "/admin/etudiants/trash?page=" + currentPage
      );
      setTotal(data.total);
      setPageCount(data.last_page);
      setStudentsTrash(data.data);
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
  async function updateStudentWithCreateParent(id, dataForm) {
    try {
      const { data } = await AxiosClient.put(
        "/admin/students/" + id + "/upadte-with-create-parent",
        dataForm
      );
      successToast(data.message);
      withReactContent(Swal).fire({
        title: data.message,
        html: (
          <div>
            <b>CIN de Parent : </b> {data.cin} <br />
            <b>mot de passe de Parent: </b> {data.password} <br />
          </div>
        ),
        icon: "success",
      });
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
  async function restoreStudent(id) {
    const toastId = toast.loading("Restauration en cours...", {
      style: { color: "white", background: "black" },
    });
    try {
      const { data } = await AxiosClient.get(
        "/admin/etudiants/" + dcryptID(id) + "/restore"
      );
      await getStudentsTrash(currentPage);
      successToast(data.message, 3000, "top-center");
    } catch (error) {
      errorToast(error.response.data.message, 6000, "top-center");
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function restoreStudentSelected(ids) {
    const toastId = toast.loading("Restauration en cours...", {
      style: { color: "white", background: "black" },
    });
    try {
      const { data } = await AxiosClient.post(
        "/admin/etudiants/restore-select",
        {
          ids,
        }
      );
      await getStudentsTrash(
        currentPage !== 1 && studentsTrash.length === ids.length
          ? currentPage - 1
          : 1
      );
      setIds([]);
      successToast(data.message, 3000, "top-center");
    } catch (error) {
      errorToast(error.response.data.message, 6000, "top-center");
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function deleteStudentSelected(ids) {
    const toastId = toast.loading("Suppression en cours...", {
      style: { color: "white", background: "black" },
    });
    try {
      const { data } = await AxiosClient.post(
        "/admin/etudiants/delete-select",
        {
          ids,
        }
      );
      await getStudents(
        currentPage !== 1 && students.length === ids.length
          ? currentPage - 1
          : 1
      );
      setIds([]);
      successToast(data.message, 3000, "top-center");
    } catch (error) {
      console.log(error);
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
      successToast(data.message);
      withReactContent(Swal).fire({
        title: data.message,
        html: (
          <div className="d-flex gap-2">
            <div>
              <h6>Etudiant Information</h6>
              <b>Code Massar : </b> {data.code_massar} <br />
              <b>UserName : </b> {data.email} <br />
              <b>Password : </b> {data.password} <br />
            </div>
            <div>
              <h6>Parent Information</h6>
              <b>CIN : </b> {data.cin} <br />
              <b>Password : </b> {data.parent_password} <br />
            </div>
          </div>
        ),
        icon: "success",
      });
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
        updateStudent,
        removeStudent,
        restoreStudent,
        getStudentsTrash,
        createStudent,
        deleteStudentSelected,
        updateStudentWithParent,
        createStudentWithParent,
        updateStudentWithCreateParent,
        restoreStudentSelected,
      }}
    >
      {children}
    </ContextStudent.Provider>
  );
};

export const useStudentContext = () => useContext(ContextStudent);

export default StudentContext;
