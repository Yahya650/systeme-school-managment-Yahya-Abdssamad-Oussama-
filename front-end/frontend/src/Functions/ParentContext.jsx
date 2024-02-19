import React, { createContext, useContext } from "react";
import { useContextApi } from "../Context/ContextApi";
import toast from "react-hot-toast";
import { AxiosClient } from "../Api/AxiosClient";

const ContextParent = createContext({ updateParent: () => {} });

const ParentContext = ({ children }) => {
  const { setErrors, navigateTo } = useContextApi();

  async function getParents(currentPage = 1) {
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

  async function updateParent(id, dataForm) {
    try {
      const { data } = await AxiosClient.put(
        "/admin/student-parents/" + id,
        dataForm
      );
      toast.success(data.message, {
        duration: 4000,
        position: "top-right",
      });
      setErrors(null);
      navigateTo(-1);
    } catch (error) {
      toast.error("Modifier Parent : " + error.response.data.message, {
        duration: 4000,
        position: "top-right",
      });
      if (error.response.status === 422) {
        setErrors(error.response.data.errors);
      }
    }
  }

  return (
    <ContextParent.Provider value={{ updateParent }}>{children}</ContextParent.Provider>
  );
};

export const useParentContext = () => useContext(ContextParent);

export default ParentContext;
