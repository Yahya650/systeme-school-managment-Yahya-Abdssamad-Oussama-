import { createContext, useContext } from "react";
import { AxiosClient } from "../Api/AxiosClient";
import { useContextApi } from "../Context/ContextApi";
import toast from "react-hot-toast";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import dcryptID from "../security/dcryptID";

const ContextTeacher = createContext({
  getTeachers: () => {},
  updateTeacher: () => {},
  removeTeacher: () => {},
  createTeacher: () => {},
  getTeacher: () => {},
  updateProfilePicture: () => {},
  renewPassword: () => {},
});

const TeacherContext = ({ children }) => {
  const {
    setTeachers,
    setTeacher,
    setErrors,
    navigateTo,
    setPageCount,
    setTotal,
    setLoadingProfilePicture,
    currentPage,
  } = useContextApi();

  async function getTeachers(currentPage = 1) {
    try {
      const { data } = await AxiosClient.get(
        "/super-admin/teachers?page=" + currentPage
      );
      setTotal(data.total);
      setPageCount(data.last_page);
      setTeachers(data.data);
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
        "/super-admin/professors/" + dcryptID(id) + "/renew-password"
      );
      withReactContent(Swal).fire({
        title: data.message,
        html: (
          <div>
            <b>CIN : </b> {data.cin} <br />
            <b>E-mail : </b> {data.email} <br />
            <b>Password : </b> {data.password} <br />
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
        "/super-admin/professors/" + dcryptID(id) + "/update-profile-picture",
        formDataFile,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await getTeacher(dcryptID(id));
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

  async function getTeacher(id) {
    try {
      const { data } = await AxiosClient.get("/super-admin/teachers/" + id);
      setTeacher(data);
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 4000,
        position: "top-right",
      });
    }
  }

  async function updateTeacher(id, dataForm) {
    try {
      const { data } = await AxiosClient.put(
        "/super-admin/teachers/" + id,
        dataForm
      );
      toast.success(data.message, {
        duration: 4000,
        position: "top-right",
      });
      setErrors(null);
      navigateTo(-1);
      // getTeachers();
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

  async function removeTeacher(id) {
    const toastId = toast.loading("Suppression en cours...", {
      style: { color: "white", background: "black" },
    });
    try {
      const { data } = await AxiosClient.delete("/super-admin/teachers/" + id);
      await getTeachers(currentPage);
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

  async function createTeacher(dataForm) {
    try {
      const { data } = await AxiosClient.post(
        "/super-admin/teachers",
        dataForm
      );
      withReactContent(Swal).fire({
        title: data.message,
        html: (
          <div>
            <b>CIN : </b> {data.cin} <br />
            <b>E-mail : </b> {data.email} <br />
            <b>Password : </b> {data.password} <br />
          </div>
        ),
        icon: "success",
      });
      toast.success(data.message, {
        duration: 4000,
        position: "top-right",
      });
      setErrors(null);
      navigateTo("/super-admin/all-teachers");
      // getTeachers();
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
    <ContextTeacher.Provider
      value={{
        getTeachers,
        updateTeacher,
        removeTeacher,
        createTeacher,
        updateProfilePicture,
        getTeacher,
        renewPassword,
      }}
    >
      {children}
    </ContextTeacher.Provider>
  );
};

export const useTeachersContext = () => useContext(ContextTeacher);

export default TeacherContext;
