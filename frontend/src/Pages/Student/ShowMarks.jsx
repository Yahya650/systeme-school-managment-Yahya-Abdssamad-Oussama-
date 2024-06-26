import React, { useEffect, useState } from "react";
import { useContextApi } from "../../config/Context/ContextApi";
import { Link } from "react-router-dom";
import { AxiosClient } from "../../config/Api/AxiosClient";
import { errorToast, successToast } from "../../config/Toasts/toasts";
import Select from "react-select";
import cryptID from "../../config/security/cryptID";
import dcryptID from "./../../config/security/dcryptID";
import LoadingCircle from "./../../Components/LoadingCircle";

const ShowMarks = () => {
  const { user, setErrors, errors } = useContextApi();
  const [schoolYearLoading, setSchoolYearLoading] = useState(true);
  const [schoolYearsOptions, setSchoolYearsOptions] = useState([]);
  const [semesterLoading, setSemesterLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [semestersOptions, setSemestersOptions] = useState([]);
  const [semester, setSemester] = useState(null);
  const [notes, setNotes] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormLoading(true);
    try {
      const { data } = await AxiosClient.post("/student/marks", {
        school_year_id: dcryptID(event.target.school_year_id.value),
        semester_id: dcryptID(event.target.semester_id.value),
      });
      console.log(data);
      setSemester(
        ...semestersOptions.filter(
          (s) => dcryptID(s.value) == dcryptID(event.target.semester_id.value)
        )
      );
      setNotes(data);
      successToast(data.message);
    } catch (error) {
      setErrors(error.response.data.errors);
      errorToast(error.response.data.message);
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    async function fetchSchoolYears() {
      try {
        const schoolYearsData = await AxiosClient.get("/school-years");
        setSchoolYearsOptions(
          schoolYearsData.data.map((schoolYear) => ({
            value: cryptID(schoolYear.id),
            label: `${schoolYear.year}`,
          }))
        );
      } catch (error) {
        errorToast(error.response.data.message);
      } finally {
        setSchoolYearLoading(false);
      }
    }
    async function fetchSemesters() {
      try {
        const semestersData = await AxiosClient.get("/semesters");
        setSemestersOptions(
          semestersData.data.map((semester) => ({
            value: cryptID(semester.id),
            value1: semester.semester,
            label: semester.name,
          }))
        );
        setErrors(null);
      } catch (error) {
        errorToast(error.response.data.message);
      } finally {
        setSemesterLoading(false);
      }
    }
    fetchSchoolYears();
    fetchSemesters();
  }, []);

  function getNoteForExam(notes, moduleId, courseId, examType) {
    if (!notes) return "";

    const filteredNotes = notes.filter((exam_record) => {
      return (
        (!moduleId || exam_record.exam.module_id === moduleId) &&
        exam_record.exam.course_id === courseId &&
        exam_record.exam.type.type === examType
      );
    });

    return filteredNotes.length > 0 ? filteredNotes[0].note.toFixed(2) : "";
  }

  return (
    <div className="content container-fluid">
      <div className="page-header">
        <div className="row">
          <div className="col-sm-12">
            <div className="page-sub-header">
              <h3 className="page-title">
                {new Date().getHours() >= 5 && new Date().getHours() < 18
                  ? "Bonjour "
                  : "Bonsoir "}
                {user?.last_name + " " + user?.first_name}!
              </h3>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="#">Dashboard</Link>
                </li>
                <li className="breadcrumb-item active">Notes</li>
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
                    <h3 className="page-title">Suivi des notes</h3>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row d-flex">
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Année Scolaire <span className="login-danger">*</span>
                        </label>
                        <Select
                          name="school_year_id"
                          isLoading={schoolYearLoading}
                          options={schoolYearsOptions}
                          placeholder="Selectionner année scolaire"
                        />
                        <span className="text-danger">
                          {errors?.school_year_id}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="form-group local-forms">
                        <label>
                          Session <span className="login-danger">*</span>
                        </label>
                        <Select
                          name="semester_id"
                          isLoading={semesterLoading}
                          options={semestersOptions}
                          placeholder="Selectionner session"
                        />
                        <span className="text-danger">
                          {errors?.semester_id}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-sm-4">
                      <div className="student-submit">
                        <button
                          type="submit"
                          disabled={formLoading}
                          className="btn btn-primary mb-3"
                        >
                          {formLoading ? (
                            <LoadingCircle />
                          ) : (
                            "Afficher les notes"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div
                  className="card"
                  style={{
                    boxShadow: "rgba(200, 200, 200, 0.23) 0px 0px 31px 3px",
                  }}
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-12 page-header pb-3 border-bottom">
                        <div className="row align-items-center">
                          <div className="col">
                            <h3 className="page-title">Notes</h3>
                          </div>
                          <div className="col-auto text-end float-end ms-auto download-grp">
                            <a
                              href="#"
                              className="btn btn-outline-primary me-2"
                            >
                              <i className="fas fa-download"></i> Download
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-sm-12">
                        <ul className="nav nav-tabs">
                          <li className="nav-item">
                            <a
                              href="#mcc"
                              data-bs-toggle="tab"
                              aria-expanded="false"
                              className="nav-link active"
                            >
                              Notes Controls Continues
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              href="#mn"
                              data-bs-toggle="tab"
                              aria-expanded="true"
                              className="nav-link"
                            >
                              Moyenne Note
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="col-sm-12">
                        <div className="tab-content">
                          <div className="tab-pane active" id="mcc">
                            <div className="table-responsive">
                              <table className="table table-responsive border star-student table-hover table-center mb-0 datatable table-striped">
                                <thead className="student-thread">
                                  <tr>
                                    <th>Matière</th>
                                    {user?.classe.courses.filter(
                                      (cours) => cours.modules.length > 0
                                    ).length > 0 && <th>Sous Unité</th>}
                                    <th>Premier contrôle</th>
                                    <th>Deuxième contrôle</th>
                                    <th>Troisième contrôle</th>
                                    <th>Quatrième contrôle</th>
                                    <th>Activités intégrées</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {user?.classe.courses.map((course, i) => (
                                    <React.Fragment key={i}>
                                      {course.modules &&
                                      course.modules.length > 0 ? (
                                        course.modules.map((module, j) => (
                                          <tr key={`${i}-${j}`}>
                                            {j === 0 && (
                                              <td
                                                rowSpan={course.modules.length}
                                                className="border"
                                              >
                                                {course.name}
                                              </td>
                                            )}
                                            <td key={j}>{module.name}</td>
                                            <td>
                                              {getNoteForExam(
                                                notes,
                                                module.id,
                                                course.id,
                                                "cc1"
                                              )}
                                            </td>
                                            <td>
                                              {getNoteForExam(
                                                notes,
                                                module.id,
                                                course.id,
                                                "cc2"
                                              )}
                                            </td>
                                            <td>
                                              {getNoteForExam(
                                                notes,
                                                module.id,
                                                course.id,
                                                "cc3"
                                              )}
                                            </td>
                                            <td>
                                              {getNoteForExam(
                                                notes,
                                                module.id,
                                                course.id,
                                                "cc4"
                                              )}
                                            </td>
                                            <td>
                                              {getNoteForExam(
                                                notes,
                                                module.id,
                                                course.id,
                                                "AI"
                                              )}
                                            </td>
                                          </tr>
                                        ))
                                      ) : (
                                        <tr key={i}>
                                          <td>{course.name}</td>
                                          {user?.classe.courses.filter(
                                            (cours) => cours.modules.length > 0
                                          ).length > 0 && (
                                            <td className="text-center">-</td>
                                          )}

                                          <td>
                                            {getNoteForExam(
                                              notes,
                                              null,
                                              course.id,
                                              "cc1"
                                            )}
                                          </td>
                                          <td>
                                            {getNoteForExam(
                                              notes,
                                              null,
                                              course.id,
                                              "cc2"
                                            )}
                                          </td>
                                          <td>
                                            {getNoteForExam(
                                              notes,
                                              null,
                                              course.id,
                                              "cc3"
                                            )}
                                          </td>
                                          <td>
                                            {getNoteForExam(
                                              notes,
                                              null,
                                              course.id,
                                              "cc4"
                                            )}
                                          </td>
                                          <td>
                                            {getNoteForExam(
                                              notes,
                                              null,
                                              course.id,
                                              "AI"
                                            )}
                                          </td>
                                        </tr>
                                      )}
                                    </React.Fragment>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          <div className="tab-pane" id="mn">
                            <div className="table-responsive">
                              <table className="table border star-student table-hover table-center mb-0 datatable table-striped">
                                <thead className="student-thread">
                                  <tr>
                                    <th>Matière</th>
                                    {user?.classe.courses.filter(
                                      (cours) => cours.modules.length > 0
                                    ).length > 0 && <th>Sous Unité</th>}
                                    <th>Notes Controls Continues</th>
                                    <th>Coefficient</th>
                                    <th>Coef*Note</th>
                                    <th>Note Examen</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {user?.classe.courses.map((course, i) => (
                                    <React.Fragment key={i}>
                                      {course.modules &&
                                      course.modules.length > 0 ? (
                                        course.modules.map((module, j) => (
                                          <tr key={`${i}-${j}`}>
                                            {j === 0 && (
                                              <td
                                                rowSpan={course.modules.length}
                                                className="border"
                                              >
                                                {course.name}
                                              </td>
                                            )}
                                            <td key={j}>{module.name}</td>

                                            <th>
                                              {(() => {
                                                let sum = 0;
                                                let data = notes?.filter(
                                                  (exam_record) =>
                                                    exam_record.exam
                                                      .module_id ===
                                                      module.id &&
                                                    exam_record.exam.type
                                                      .type !== "cff"
                                                );
                                                data?.forEach((element) => {
                                                  sum += element.note;
                                                });
                                                let result = data?.length
                                                  ? sum / data.length
                                                  : 0;
                                                return result
                                                  ? result.toFixed(2)
                                                  : null;
                                              })()}
                                            </th>
                                            <th>
                                              {notes
                                                ? semester?.value1 == 2
                                                  ? module.ceof2
                                                  : module.ceof1
                                                : null}
                                            </th>

                                            <th>
                                              {(() => {
                                                let sum = 0;
                                                let data = notes?.filter(
                                                  (exam_record) =>
                                                    exam_record.exam
                                                      .module_id ===
                                                      module.id &&
                                                    exam_record.exam.type
                                                      .type !== "cff"
                                                );
                                                data?.forEach((element) => {
                                                  sum += element.note;
                                                });
                                                let result = data?.length
                                                  ? sum / data.length
                                                  : 0;
                                                result = result * module.ceof1;
                                                return result
                                                  ? result.toFixed(2)
                                                  : null;
                                              })()}
                                            </th>
                                            <th>
                                              {notes
                                                ?.filter(
                                                  (exam_record) =>
                                                    exam_record.exam
                                                      .module_id == module.id &&
                                                    exam_record.exam.type
                                                      .type === "cff"
                                                )[0]
                                                ?.note.toFixed(2)}
                                            </th>
                                          </tr>
                                        ))
                                      ) : (
                                        <tr key={i}>
                                          <td>{course.name}</td>
                                          {user?.classe.courses.filter(
                                            (cours) => cours.modules.length > 0
                                          ).length > 0 && (
                                            <td className="text-center">-</td>
                                          )}
                                          <th>
                                            {(() => {
                                              let sum = 0;
                                              let data = notes?.filter(
                                                (exam_record) =>
                                                  exam_record.exam.course_id ===
                                                    course.id &&
                                                  exam_record.exam.type.type !==
                                                    "cff"
                                              );
                                              data?.forEach((element) => {
                                                sum += element.note;
                                              });
                                              let result = data?.length
                                                ? sum / data.length
                                                : 0;
                                              return result
                                                ? result.toFixed(2)
                                                : null;
                                            })()}
                                          </th>
                                          <th>
                                            {notes
                                              ? semester?.value1 == 2
                                                ? course.ceof2
                                                : course.ceof1
                                              : null}
                                          </th>

                                          <th>
                                            {(() => {
                                              let sum = 0;
                                              let data = notes?.filter(
                                                (exam_record) =>
                                                  exam_record.exam.course_id ===
                                                    course.id &&
                                                  exam_record.exam.type.type !==
                                                    "cff"
                                              );
                                              data?.forEach((element) => {
                                                sum += element.note;
                                              });
                                              let result = data?.length
                                                ? sum / data.length
                                                : 0;
                                              result = result * course.ceof1;
                                              return result
                                                ? result.toFixed(2)
                                                : null;
                                            })()}
                                          </th>
                                          <th>
                                            {notes
                                              ?.filter(
                                                (exam_record) =>
                                                  exam_record.exam.course_id ==
                                                    course.id &&
                                                  exam_record.exam.type.type ===
                                                    "cff"
                                              )[0]
                                              ?.note.toFixed(2)}
                                          </th>
                                        </tr>
                                      )}
                                    </React.Fragment>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowMarks;
