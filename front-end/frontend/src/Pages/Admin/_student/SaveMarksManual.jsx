import React, { useEffect, useRef, useState } from "react";
import { useContextApi } from "../../../config/Context/ContextApi";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  faEraser,
  faMagnifyingGlass,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AxiosClient } from "../../../config/Api/AxiosClient";
import { errorToast, successToast } from "../../../config/Toasts/toasts";
import cryptID from "../../../config/security/cryptID";
import dcryptID from "../../../config/security/dcryptID";
import LoadingCircle from "../../../Components/LoadingCircle";

const SaveMarksManual = () => {
  const { user, errors, setErrors } = useContextApi();
  const course_id = useRef(null);
  const module_id = useRef(null);
  const classe_id = useRef(null);
  const semester_id = useRef(null);
  const type_exam_id = useRef(null);

  const [students, setStudents] = useState(null);
  const [saveMarkFormLoading, setSaveMarkFormLoading] = useState(false);
  const [classe, setClasse] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [passingMark, setPassingMark] = useState(null);
  const [modulId, setModulId] = useState(null);
  const [semesterId, setSemesterId] = useState(null);
  const [typeExamId, setTypeExamId] = useState(null);
  const [courseId, setCourseId] = useState(null);
  const [notes, setNotes] = useState(null);

  const [classes, setClasses] = useState(null);
  const [classeOptions, setClasseOptions] = useState([]);
  const [loadingClasseOptions, setLoadingClasseOptions] = useState(true);

  const [modules, setModules] = useState(null);
  const [modulesOptions, setModulesOptions] = useState([]);

  const [courses, setCourses] = useState(null);
  const [coursesOptions, setCoursesOptions] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);

  const [semesters, setSemesters] = useState(null);
  const [semestersOptions, setSemestersOptions] = useState([]);
  const [semestersLoading, setSemestersLoading] = useState(true);

  const [types, setTypes] = useState(null);
  const [typesOptions, setTypesOptions] = useState([]);
  const [typesLoading, setTypesLoading] = useState(true);

  const saveMarks = async (e) => {
    e.preventDefault();
    let marks = [];
    let isValid = true;
    console.log(passingMark);
    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      if (passingMark == 5) {
        if (
          $("#mark" + cryptID(student.id)).val() > 10 ||
          $("#mark" + cryptID(student.id)).val() < 0 ||
          !$("#mark" + cryptID(student.id)).val()
        ) {
          errorToast("Les notes doivent etre entre 0 et 10");
          isValid = false;
          break;
        }
      } else if (passingMark == 10) {
        if (
          $("#mark" + cryptID(student.id)).val() > 20 ||
          $("#mark" + cryptID(student.id)).val() < 0 ||
          !$("#mark" + cryptID(student.id)).val()
        ) {
          errorToast("Les notes doivent etre entre 0 et 20");
          isValid = false;
          break; // Stop the loop
        }
      }
      marks.push({
        student_id: student.id,
        mark: parseFloat($("#mark" + cryptID(student.id)).val()),
      });
    }

    if (isValid) {
      try {
        setSaveMarkFormLoading(true);
        const { data } = await AxiosClient.post("/admin/save-marks-manual", {
          classe_id: classe?.id,
          course_id: dcryptID(courseId),
          module_id: dcryptID(modulId),
          semester_id: dcryptID(semesterId),
          type_exam_id: dcryptID(typeExamId),
          marks,
        });
        successToast(data.message);
      } catch (error) {
        console.log(error);
        errorToast(error.response.data.message);
      } finally {
        setSaveMarkFormLoading(false);
      }
    }
  };

  const onChangeClasse = async (e) => {
    course_id.current?.setValue({
      value: null,
      label: "Selectionner Matiére",
    });
    setStudents(null);
    setModulesOptions([]);
    setCoursesOptions([]);
    try {
      setCoursesLoading(true);
      const { data } = await AxiosClient.post("/admin/onchange-classe", {
        classe_id: dcryptID(e.value),
      });
      setClasse(data.classe);
      setPassingMark(data.passing_mark);
      setCourses(data.courses);
      const options2 = data.courses.map((course) => ({
        value: cryptID(course.id),
        label: course.name,
      }));
      setCoursesOptions(options2);
    } catch (error) {
      errorToast(error.response.data.message);
    } finally {
      setCoursesLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.classe_id.value === "") {
      errorToast("sil vous plait choisir une classe", 2000);
      return;
    }
    setFormLoading(true);
    try {
      const { data } = await AxiosClient.post(
        "/admin/classe/" + dcryptID(e.target.classe_id.value) + "/students",
        {
          module_id: dcryptID(e.target.module_id?.value),
          semester_id: dcryptID(e.target.semester_id.value),
          type_exam_id: dcryptID(e.target.type_id.value),
          course_id: dcryptID(e.target.course_id.value),
        }
      );
      setModulId(e.target.module_id?.value);
      setSemesterId(e.target.semester_id.value);
      setTypeExamId(e.target.type_id.value);
      setCourseId(e.target.course_id.value);
      setErrors(null);
      if (data.length === 0) {
        errorToast("aucun etudiants trouver dans cette classe");
      }
      setStudents(data);
    } catch (error) {
      console.log(error);
      errorToast(error.response.data.message);
      setErrors(error.response.data.errors);
    } finally {
      setFormLoading(false);
    }
  };

  const onChangeCourses = async (e) => {
    module_id.current?.setValue({
      value: null,
      label: "Selectionner lwa7da",
    });
    setStudents(null);
    setModules([]);
    const course = courses?.filter((course) => course.id === dcryptID(e.value));
    const options =
      course?.length > 0
        ? course[0].modules.map((module) => ({
            value: cryptID(module.id),
            label: module.name,
          }))
        : [];
    setModules(course?.modules);
    setModulesOptions(options);
  };

  useEffect(() => {
    async function fetch1() {
      try {
        const { data } = await AxiosClient.get("/admin/etudiants/exam-records");
        setNotes(data);

        const classes = await AxiosClient.get("/admin/classes");
        const options2 = classes.data.map((classe) => ({
          value: cryptID(classe.id),
          label:
            classe.filiere_id !== null
              ? `${classe.code} ${classe.classe_type.name} ${classe.classe_type.school_level.name} - (${classe.filiere.name})`
              : `${classe.code} ${classe.classe_type.name} ${classe.classe_type.school_level.name}`,
        }));
        setClasses(classes.data);
        setClasseOptions(options2);
      } catch (error) {
        errorToast(error.response.data.message);
      } finally {
        setLoadingClasseOptions(false);
      }
    }
    fetch1();

    async function fetch2() {
      try {
        const semesters = await AxiosClient.get("/semesters");
        const options2 = semesters.data.map((semester) => ({
          value: cryptID(semester.id),
          label: `${semester.name}`,
        }));
        setSemesters(semesters.data);
        setSemestersOptions(options2);
      } catch (error) {
        errorToast(error.response.data.message);
      } finally {
        setSemestersLoading(false);
      }
    }
    fetch2();

    async function fetch5() {
      try {
        const typeExams = await AxiosClient.get("/type-exams");
        const options2 = typeExams.data.map((typeExam) => ({
          value: cryptID(typeExam.id),
          label: `${typeExam.name}`,
        }));
        setTypes(typeExams.data);
        setTypesOptions(options2);
      } catch (error) {
        errorToast(error.response.data.message);
      } finally {
        setTypesLoading(false);
      }
    }
    fetch5();
  }, []);

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <div className="page-sub-header">
              <h5 className="page-title">
                {new Date().getHours() >= 5 && new Date().getHours() < 18
                  ? "Bonjour "
                  : "Bonsoir "}
                {user?.last_name + " " + user?.first_name}!
              </h5>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="#">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Saisir Manuellement</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-body">
              <div className="page-header pb-3 border-bottom">
                <div className="row align-items-center">
                  <div className="col">
                    <h5 className="page-title">Saisir Manuellement</h5>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row d-flex">
                    <div className="col-12 col-sm-6">
                      <div className="form-group local-forms">
                        <label>
                          Classe <span className="login-danger">*</span>
                        </label>
                        <Select
                          styles={{
                            menu: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                          name="classe_id"
                          isLoading={loadingClasseOptions || coursesLoading}
                          options={classeOptions}
                          placeholder="Selectionner classe"
                          onChange={onChangeClasse}
                        />
                        <span className="text-danger">{errors?.classe_id}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group local-forms">
                        <label>
                          Matiére <span className="login-danger">*</span>
                        </label>
                        <Select
                          styles={{
                            menu: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                          name="course_id"
                          ref={course_id}
                          isLoading={coursesLoading}
                          options={coursesOptions}
                          placeholder="Selectionner Matiére"
                          onChange={onChangeCourses}
                        />
                        <span className="text-danger">{errors?.course_id}</span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Session <span className="login-danger">*</span>
                        </label>
                        <Select
                          styles={{
                            menu: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                          name="semester_id"
                          isLoading={semestersLoading}
                          options={semestersOptions}
                          placeholder="Selectionner Session"
                          onChange={() => setStudents(null)}
                        />
                        <span className="text-danger">
                          {errors?.semester_id}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Type de controle{" "}
                          <span className="login-danger">*</span>
                        </label>
                        <Select
                          styles={{
                            menu: (base) => ({ ...base, zIndex: 9999 }),
                          }}
                          name="type_id"
                          isLoading={typesLoading}
                          options={typesOptions}
                          placeholder="Selectionner Type de controle"
                          onChange={() => setStudents(null)}
                        />
                        <span className="text-danger">
                          {errors?.type_exam_id}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      {modulesOptions?.length > 0 && (
                        <div className="form-group local-forms">
                          <label>
                            lwa7da : <span className="login-danger">*</span>
                          </label>
                          <Select
                            styles={{
                              menu: (base) => ({ ...base, zIndex: 9999 }),
                            }}
                            name="module_id"
                            ref={module_id}
                            options={modulesOptions}
                            placeholder="Selectionner lwa7da"
                            onChange={() => setStudents(null)}
                          />
                          <span className="text-danger">
                            {errors?.module_id}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="col-12 col-sm-4 mb-3">
                      <div className="student-submit">
                        <button
                          type="submit"
                          disabled={formLoading}
                          className="btn btn-primary"
                        >
                          {formLoading ? (
                            <LoadingCircle />
                          ) : (
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                {classe && (
                  <div className="col-12 col-sm-12 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="table-responsive">
                          <table className="w-100 ">
                            <tbody>
                              <tr>
                                <td className={""}>
                                  <div className="d-flex gap-3 justify-content-start">
                                    <h5
                                      className="mb-0"
                                      style={{
                                        fontFamily: "Cairo, sans-serif",
                                      }}
                                    >
                                      Classe :
                                    </h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex gap-3 justify-content-start">
                                    <h5
                                      style={{
                                        fontFamily: "Cairo, sans-serif",
                                      }}
                                      className="text-muted mb-0"
                                    >
                                      {classe?.code}
                                    </h5>
                                  </div>
                                </td>
                                <td className={"ps-5"}>
                                  <div className="d-flex gap-3 justify-content-start">
                                    <h5
                                      style={{
                                        fontFamily: "Cairo, sans-serif",
                                      }}
                                      className="mb-0"
                                    >
                                      Niveau :
                                    </h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex gap-3 justify-content-start">
                                    <h5
                                      style={{
                                        fontFamily: "Cairo, sans-serif",
                                      }}
                                      className="text-muted mb-0"
                                    >
                                      {classe?.classe_type.name}{" "}
                                      {classe?.classe_type.school_level.name}{" "}
                                      {classe?.filiere?.name}
                                    </h5>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td className={""}>
                                  <div className="d-flex gap-3 my-3 justify-content-start">
                                    <h5
                                      style={{
                                        fontFamily: "Cairo, sans-serif",
                                      }}
                                      className="mb-0"
                                    >
                                      Nombre éléves :
                                    </h5>
                                  </div>
                                </td>
                                <td>
                                  <div className="d-flex gap-3 my-3 justify-content-start">
                                    <h5
                                      style={{
                                        fontFamily: "Cairo, sans-serif",
                                      }}
                                      className="text-muted mb-0"
                                    >
                                      {classe?.number_etud}
                                    </h5>
                                  </div>
                                </td>
                                <td className={"ps-5"}>
                                  <div className="d-flex gap-3 my-3 justify-content-start">
                                    <h5
                                      style={{
                                        fontFamily: "Cairo, sans-serif",
                                      }}
                                      className="mb-0"
                                    >
                                      Etablissement :
                                    </h5>
                                  </div>
                                </td>
                                <td className={""}>
                                  <h5
                                    style={{ fontFamily: "Cairo, sans-serif" }}
                                    className="text-muted mb-0"
                                  >
                                    Groupe Scolaire Ben Jellon
                                  </h5>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className="card"
                  style={{
                    boxShadow: "rgba(200, 200, 200, 0.23) 0px 0px 31px 3px",
                  }}
                >
                  {students?.length > 0 && (
                    <div className="card-body">
                      <div className="row">
                        <div className="col-sm-12 page-header pb-3 border-bottom">
                          <div className="row align-items-center">
                            <div className="col">
                              <h5 className="page-title">Saisir Les Notes</h5>
                            </div>
                            {/* <div className="col-auto text-end float-end ms-auto download-grp">
                              <a
                                href="#"
                                className="btn btn-outline-primary me-2"
                              >
                                <i className="fas fa-download"></i> Download
                              </a>
                            </div> */}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-sm-12">
                          <form onSubmit={saveMarks}>
                            <div className="table-responsive">
                              <table className="table border-0 star-student table-hover table-center mb-0 datatable table-striped">
                                <thead className="student-thread">
                                  <tr>
                                    <th>Code Massar</th>
                                    <th>Nom et Prenom</th>
                                    <th>Date de dernière connexion</th>
                                    <th>Classe</th>
                                    <th>Note</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {students?.map((student, i) => (
                                    <tr key={i}>
                                      <td>{student.code_massar}</td>
                                      <td>
                                        {student.first_name} {student.last_name}
                                      </td>
                                      <td>
                                        {student.last_login_date
                                          ? student.last_login_date
                                          : "Pas de connexion"}
                                      </td>
                                      <td>{student.classe.code}</td>
                                      <td>
                                        <input
                                          onChange={(e) => {
                                            if (
                                              (passingMark == 5 &&
                                                parseFloat(e.target.value) >
                                                  10) ||
                                              parseFloat(e.target.value) < 0 ||
                                              !parseFloat(e.target.value)
                                            ) {
                                              e.target.classList.add(
                                                "is-invalid"
                                              );
                                            } else if (
                                              (passingMark == 10 &&
                                                parseFloat(e.target.value) >
                                                  20) ||
                                              parseFloat(e.target.value) < 0 ||
                                              !parseFloat(e.target.value)
                                            ) {
                                              e.target.classList.add(
                                                "is-invalid"
                                              );
                                            } else {
                                              e.target.classList.remove(
                                                "is-invalid"
                                              );
                                            }
                                          }}
                                          type="text"
                                          id={"mark" + cryptID(student.id)}
                                          defaultValue={notes
                                            ?.filter(
                                              (exam_record) =>
                                                exam_record.exam.course_id ==
                                                  dcryptID(courseId) &&
                                                exam_record.exam.class_id ==
                                                  dcryptID(classe?.id) &&
                                                exam_record.exam.type.id ===
                                                  dcryptID(typeExamId) &&
                                                exam_record.student_id ==
                                                  student.id &&
                                                exam_record.exam.semester_id ==
                                                  dcryptID(semesterId)
                                            )[0]
                                            ?.note.toFixed(2)}
                                          className="form-control"
                                        />
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            <div className="student-submit mt-3">
                              <button
                                type="submit"
                                disabled={saveMarkFormLoading}
                                className="btn btn-primary"
                              >
                                {saveMarkFormLoading ? (
                                  <LoadingCircle />
                                ) : (
                                  "Enregistrer"
                                )}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaveMarksManual;
