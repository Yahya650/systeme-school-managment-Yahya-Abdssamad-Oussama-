import toast from "react-hot-toast";
import { AxiosClient } from "../Api/AxiosClient";
import { useContextApi } from "../Context/ContextApi";
import React, { createContext, useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import dcryptID from "../security/dcryptID";

const CrudAdminsContext = createContext({
  getAdmins: () => {},
  getAdmin: () => {},
  updateAdmin: () => {},
  removeAdmin: () => {},
  createAdmin: () => {},
  updateProfilePicture: () => {},
  renewPassword: () => {},
});

const CRUD_Admins = ({ children }) => {
  const {
    setAdmins,
    setAdmin,
    setErrors,
    navigateTo,
    setPageCount,
    setTotal,
    setLoadingProfilePicture,
    currentPage,
  } = useContextApi();

  async function getAdmins(currentPage = 1) {
    try {
      const { data } = await AxiosClient.get(
        "/super-admin/admins?page=" + currentPage
      );
      setTotal(data.total);
      setPageCount(data.last_page);
      setAdmins(data.data);
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 4000,
        position: "top-right",
      });
    }
  }
  async function getAdmin(id) {
    try {
      const { data } = await AxiosClient.get("/super-admin/admins/" + id);
      setAdmin(data);
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 4000,
        position: "top-right",
      });
    }
  }
  async function updateProfilePicture(id, profile_picture) {
    setLoadingProfilePicture(true);
    try {
      const formDataFile = new FormData();
      formDataFile.append("profile_picture", profile_picture);

      const { data } = await AxiosClient.post(
        "/super-admin/administrators/" +
          dcryptID(id) +
          "/update-profile-picture",
        formDataFile, // Passing formData directly as the second argument
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await getAdmin(dcryptID(id));
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

  async function updateAdmin(id, dataForm) {
    try {
      const { data } = await AxiosClient.put(
        "/super-admin/admins/" + id,
        dataForm
      );
      toast.success(data.message, {
        duration: 4000,
        position: "top-right",
      });
      setErrors(null);
      navigateTo(-1);
      // getAdmins();
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

  async function removeAdmin(id) {
    const toastId = toast.loading("Suppression en cours...", {
      style: { color: "white", background: "black" },
    });
    try {
      const { data } = await AxiosClient.delete("/super-admin/admins/" + id);
      await getAdmins(currentPage);
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

  async function renewPassword(id) {
    try {
      const { data } = await AxiosClient.get(
        "/super-admin/administrators/" + dcryptID(id) + "/renew-password"
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

  async function createAdmin(dataForm) {
    try {
      const { data } = await AxiosClient.post("/super-admin/admins", dataForm);
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
      navigateTo("/super-admin/all-admins");
      // getAdmins();
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
    <CrudAdminsContext.Provider
      value={{
        getAdmins,
        getAdmin,
        updateAdmin,
        removeAdmin,
        createAdmin,
        updateProfilePicture,
        renewPassword,
      }}
    >
      {children}
    </CrudAdminsContext.Provider>
  );
};

export const useCrudAdmins = () => useContext(CrudAdminsContext);

export default CRUD_Admins;
