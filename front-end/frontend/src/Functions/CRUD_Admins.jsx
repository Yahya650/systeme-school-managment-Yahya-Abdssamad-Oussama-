import toast from "react-hot-toast";
import { AxiosClient } from "../Api/AxiosClient";
import { useContextApi } from "../Context/ContextApi";
import React, { createContext, useContext } from "react";

const CrudAdminsContext = createContext({
  getAdmins: () => {},
  getAdmin: () => {},
  updateAdmin: () => {},
  removeAdmin: () => {},
  createAdmin: () => {},
});

const CRUD_Admins = ({ children }) => {
  const { setAdmins, setAdmin, setErrors, Toast } = useContextApi();

  async function getAdmins() {
    try {
      const { data } = await AxiosClient.get("/super-admin/admins");
      setAdmins(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getAdmin(id) {
    try {
      const { data } = await AxiosClient.get("/super-admin/admins/" + id);
      setAdmin(data);
    } catch (error) {
      console.log(error);
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
      // getAdmins();
    } catch (error) {
      toast.error(error.response.data.message, {
        duration: 4000,
        position: "top-right",
      });
      console.log(error);
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  }

  async function removeAdmin(id) {
    try {
      await AxiosClient.delete("/super-admin/admins/" + id);
      getAdmins();
    } catch (error) {
      console.log(error);
    }
  }

  async function createAdmin(data) {
    try {
      await AxiosClient.post("/super-admin/admins", data);
      getAdmins();
    } catch (error) {
      console.log(error);
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
      }}
    >
      {children}
    </CrudAdminsContext.Provider>
  );
};

export const useCrudAdmins = () => useContext(CrudAdminsContext);

export default CRUD_Admins;
