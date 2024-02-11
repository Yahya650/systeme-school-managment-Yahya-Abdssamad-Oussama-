import { createContext, useContext } from "react";
import { AxiosClient } from "../Api/AxiosClient";
import { useContextApi } from "../Context/ContextApi";
import toast from "react-hot-toast";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const CrudTeachersContext = createContext({
  getTeachers: () => {},
  updateTeacher: () => {},
  removeTeacher: () => {},
  createTeacher: () => {},
  getTeacher: () => {},
});

const CRUD_Teachers = ({ children }) => {
  const { setTeachers, setTeacher, setErrors, navigateTo } = useContextApi();

  async function getTeachers() {
    try {
      const { data } = await AxiosClient.get("/super-admin/teachers");
      setTeachers(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getTeacher(id) {
    try {
      const { data } = await AxiosClient.get("/super-admin/teachers/" + id);
      setTeacher(data);
    } catch (error) {
      console.log(error);
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
      navigateTo("/super-admin/all-teachers");
      // getTeachers();
    } catch (error) {
      console.log(error);
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
    try {
      const { data } = await AxiosClient.delete("/super-admin/teachers/" + id);
      await getTeachers();
      toast.success(data.message, {
        duration: 4000,
        position: "top-center",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        duration: 4000,
        position: "top-center",
      });
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
      console.log(error);
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
    <CrudTeachersContext.Provider
      value={{
        getTeachers,
        updateTeacher,
        removeTeacher,
        createTeacher,
        getTeacher,
      }}
    >
      {children}
    </CrudTeachersContext.Provider>
  );
};

export const useCrudTeachers = () => useContext(CrudTeachersContext);

export default CRUD_Teachers;
