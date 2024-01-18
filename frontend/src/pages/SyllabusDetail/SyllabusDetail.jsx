import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { convertToPDF } from '../../APIs/convert-pdf-apis';
import SyllabusAPI, { POST_ApproveSyllabus } from '../../APIs/SyllabusAPI';
import { Toaster, toast } from 'sonner';
import CustomPopupClone from '../../components/Popup/PopupCloneSyllabus';
import logo from '../../images/uit.png';

import './SyllabusDetail.css';

import { Link, useParams } from 'react-router-dom';
import AuthContext from '../../contexts/auth-context';
import { Table, TableCell, TableContent, TableTitle } from '../../components/Table';

function SyllabusDetail(props) {
  const { id } = useParams();
  const [syllabus, setSyllabus] = useState({});
  const [course, setCourse] = useState({});
  const [department, setDepartment] = useState({});
  const [isAssigned, setIsAssigned] = useState(false);

  const [preCourse, setPreCourse] = useState({});
  const [prerequisiteCourse, setPrerequisiteCourse] = useState({});
  const [courseAssessments, setCourseAssesments] = useState([]);
  const [courseOutcomes, setCourseOutcomes] = useState([]);
  const [courseSchedules, setCourseSchedules] = useState([]);

  const authCtx = useContext(AuthContext);
  const handleConvertPDF = (event) => {
    event.preventDefault();
    const pdfHTMLElement = document.getElementById('syllabus-detail'); // HTML element to be converted to PDF
    const convert = convertToPDF(pdfHTMLElement, course.courseNameVN);
    console.log(convert);
    toast.success('Xuất file pdf thành công', {
      duration: 2000,
    });
  };
  const acceptSyllabus = async () => {
    const response = await POST_ApproveSyllabus(authCtx.token, id);
    console.log(response);

    if (response.status === 200) {
      toast.success('Xét duyệt thành công', {
        duration: 2000,
      });
      window.history.go(-1);
    } else {
      toast.error('Lỗi không thể xét duyệt', {
        duration: 2000,
      });
    }
  };
  const handleRejectSyllabus = useCallback(async () => {
    const { data } = await axios({
      method: 'post',
      url: '/api/v1/syllabus/reject/' + id,
      data: {},
      validateStatus: () => true,
      headers: {
        'Content-Type': 'application/json',
        authorization: authCtx.token,
      },
    });
    console.log(data);

    if (data.status === 200) {
      toast.success('Đã từ chối', {
        duration: 2000,
      });
      window.history.go(-1);
    } else {
      toast.error('Lỗi không thể từ chối', {
        duration: 2000,
      });
    }
    return;
  }, []);
  const handleClone = async (inputData) => {
    try {
      console.log(inputData);
      inputData._id = undefined;
      inputData.createdDate = undefined;
      inputData.updatedDate = undefined;
      inputData.status = 'Đang chờ xét duyệt';
      inputData.validated = false;

      const response = await SyllabusAPI.PATCH_UpdateSyllabusByCourseId(authCtx.token, course._id, inputData);
      console.log(response);
      if (response.status === 'success create new syllabus version') {
        toast.success('Cập nhật đề cương thành công', {
          duration: 2000,
        });
        return { success: true };
      } else {
        toast.error('Lỗi cập nhật đề cương', {
          duration: 2000,
        });
        return { success: false };
      }
    } catch (error) {
      console.log(error);
      toast.error('Lỗi cập nhật đề cương', {
        duration: 2000,
      });
      return { success: false };
    }
  };

  const fetchData = useCallback(async () => {
    axios.get('/api/v1/syllabus/id/' + id).then((res) => {
      if (res.data.data === null) return;
      let syllabusData = res.data.data;
      console.log(syllabusData);
      setSyllabus(syllabusData);
      setCourseAssesments(syllabusData.courseAssessments);
      setCourseOutcomes(syllabusData.courseOutcomes);
      setCourseSchedules(syllabusData.courseSchedules);
      setCourse(syllabusData.course);
      setDepartment(syllabusData.course.department);
      setPreCourse(syllabusData.course.preCourse);
      setPrerequisiteCourse(syllabusData.course.prerequisiteCourse);
      axios
        .get('/api/v1/course/is-user-assign/course-id/' + syllabusData.course._id, {
          headers: {
            authorization: authCtx.token,
          },
          validateStatus: () => true,
        })
        .then((res_check) => {
          if (res_check.data === null) return;
          console.log(res_check.data);

          setIsAssigned(res_check.data.isAssigned);
        });
    });
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="main-detail">
      <div id="service-section" className="service-detail-section">
        <div className="html2canvas-container" id="syllabus-detail">
          {course !== null ? (
            <>
              <div className="header-info">
                <div className="logo-and-school">
                  <img className="logo" src={logo} />
                  <div className="school">
                    {' '}
                    VIETNAM NATIONAL UNIVERSITY, HO CHI MINH CITY
                    <br />
                    <b>{'                '}UNIVERSITY OF INFORMATION TECHNOLOGY</b>
                  </div>
                </div>
                ------------------------------------------------------------------------------------------------
              </div>
              <div className="syllabus-title">
                <b>
                  SYLLABUS
                  <br />
                  {course.code} - {course.courseNameVN}
                </b>
              </div>
              <div className="general-info">
                <div>
                  <b>1. THÔNG TIN CHUNG</b>
                </div>
                <div className="course-info-detail">
                  <div className="course-info-detail-holder">
                    <p>Tên môn học:</p>
                    <p>Mã môn:</p>
                    <p>Loại:</p>
                    <p>Giảng viên:</p>
                    <p>Số tín chỉ:</p>
                    <p> Lý thuyết:</p>
                    <p> Thực hành:</p>
                    <p> Tự học: </p>
                  </div>
                  <div className="course-info-detail-data">
                    <p>{course.courseNameVN}</p>
                    <p>{course.code}</p>
                    <p>{course.type}</p>
                    <p>
                      {course.instructors !== undefined
                        ? course.instructors[0]
                          ? course.instructors[0].fullname
                          : 'Not assigned yet'
                        : 'Not assigned yet'}
                    </p>
                    <p>
                      {course.numberOfPracticeCredits + course.numberOfSelfLearnCredits + course.numberOfTheoryCredits}
                    </p>
                    <p>{course.numberOfTheoryCredits}</p>
                    <p>{course.numberOfPracticeCredits}</p>
                    <p>{course.numberOfSelfLearnCredits}</p>
                  </div>
                </div>
              </div>
              <div>
                <Table>
                  <TableTitle title={`Thông Tin Chi tiết Môn học`} />

                  <TableContent>
                    <TableCell label={`Tên môn học (tiếng Việt)`} value={course.courseNameVN} isBold={true} />
                    <TableCell label={`Tên môn học (tiếng Anh)`} value={course.courseNameEN} isBold={true} />
                    <TableCell label={`Mã môn học`} value={course.code} isBold />
                    <TableCell label={`Khối kiến thức`} value={course.type} />
                    <TableCell label={`Khoa`} value={department.name} />
                    <TableCell
                      label={`Số tín chỉ`}
                      value={
                        course.numberOfPracticeCredits + course.numberOfSelfLearnCredits + course.numberOfTheoryCredits
                      }
                    />
                    <TableCell label={`Lý thuyết`} value={course.numberOfTheoryCredits} />
                    <TableCell label={`Thực hành`} value={course.numberOfPracticeCredits} />
                    <TableCell label={`Tự học`} value={course.numberOfSelfLearnCredits} />
                    <TableCell
                      label={`Môn học trước`}
                      value={
                        preCourse.length > 0
                          ? preCourse
                              .map((course, index) => {
                                return course.code;
                              })
                              .join(', ')
                          : null
                      }
                    />
                    <TableCell
                      label={`Môn học tiên quyết`}
                      value={
                        prerequisiteCourse.length > 0
                          ? prerequisiteCourse
                              .map((course, index) => {
                                return course.code;
                              })
                              .join(', ')
                          : null
                      }
                    />
                  </TableContent>
                </Table>
                <ol type="1">
                  <li>
                    <h3>Mô tả môn học</h3>
                    <p className="course-description">{course.description}</p>
                  </li>
                  <li>
                    <h3>Nội dung môn học</h3>
                    <ol type="I">
                      <table width={'100%'}>
                        <tr>
                          <th style={{ width: 120 }}>Buổi học</th>
                          <th style={{ width: 300 }}>Nội dung</th>
                          <th style={{ width: 80 }}>CĐRMH</th>
                          <th style={{ width: 300 }}>Hoạt động dạy và học</th>
                          <th style={{ width: 100 }}>Thành phần đánh giá</th>
                        </tr>
                        {courseSchedules.map((courseScheduleItem, index) => {
                          return (
                            <tr>
                              <td>{courseScheduleItem.class}</td>
                              <td>{courseScheduleItem.description}</td>
                              <td>
                                {courseScheduleItem.courseOutcomes !== null
                                  ? courseScheduleItem.courseOutcomes.map((courseOutcomeItem, index) => {
                                      return courseOutcomeItem.levelOfTeaching
                                        ? courseOutcomeItem.levelOfTeaching + '.' + courseOutcomeItem.level + ', '
                                        : '';
                                    })
                                  : null}
                              </td>
                              <td>{courseScheduleItem.activities}</td>
                              <td>
                                {courseScheduleItem.courseAssessElements !== null
                                  ? courseScheduleItem.courseAssessElements.map((courseAssessElementItem, index) => {
                                      return courseAssessElementItem.label
                                        ? courseAssessElementItem.label + ', '
                                        : null;
                                    })
                                  : null}
                              </td>
                            </tr>
                          );
                        })}
                      </table>
                    </ol>
                  </li>
                  <li>
                    <h3>Chuẩn đầu ra môn học</h3>
                    <table>
                      <tr>
                        <th>CĐRMH</th>
                        <th>Mô tả CĐRMH</th>
                        <th>Ánh xạ CĐR CTĐT</th>
                        <th>Cấp độ CĐRMH về NT, KN, TĐ</th>
                      </tr>
                      {courseOutcomes.length > 0
                        ? courseOutcomes.map((courseOutcome, index) => {
                            return (
                              <tr>
                                <td>
                                  {courseOutcome.levelOfTeaching
                                    ? courseOutcome.levelOfTeaching + '.' + courseOutcome.level + ', '
                                    : ''}
                                </td>
                                <td>{courseOutcome.courseGoal.description}</td>
                                <td>
                                  {courseOutcome.courseGoal.programOutcomes.map((programOutcome) => {
                                    return programOutcome.outcomeLevel + '; ';
                                  })}
                                </td>
                                <td>
                                  {courseOutcome.courseGoal.programOutcomes.map((programOutcome) => {
                                    return programOutcome.programOutcome + '; ';
                                  })}
                                </td>
                              </tr>
                            );
                          })
                        : null}
                    </table>
                  </li>
                  <li>
                    <h3>Đánh giá môn học</h3>
                    <table>
                      <tr>
                        <th>Thành phần đánh giá</th>
                        <th>CĐRMH</th>
                        <th>Tỷ lệ</th>
                      </tr>
                      {courseAssessments.length > 0
                        ? courseAssessments.map((courseAssesmentItem, index) => {
                            return (
                              <tr>
                                <td>
                                  {courseAssesmentItem.assessElement.label +
                                    '. ' +
                                    courseAssesmentItem.assessElement.description}
                                </td>
                                <td>
                                  {courseAssesmentItem.courseOutcomes.length > 0
                                    ? courseAssesmentItem.courseOutcomes
                                        .map((courseOutcome, index) => {
                                          return courseOutcome.level;
                                        })
                                        .join(', ')
                                    : null}
                                </td>
                                <td>{courseAssesmentItem.percentage}%</td>
                              </tr>
                            );
                          })
                        : null}
                    </table>
                  </li>
                </ol>
              </div>
            </>
          ) : null}
        </div>

        <div className="syllabus-detail-btn">
          {syllabus.status === 'Đã được xét duyệt' ? (
            <button className="form-add-btn-detail" onClick={handleConvertPDF}>
              Xuất pdf
            </button>
          ) : null}
          {syllabus.status === 'Đang chờ xét duyệt' && (authCtx.role === 'admin' || authCtx.role === 'chairman') ? (
            <React.Fragment>
              <button className="form-approve-btn-detail" id="edit" onClick={() => acceptSyllabus()}>
                Xét duyệt
              </button>
              <button className="form-reject-btn-detail" onClick={handleRejectSyllabus}>
                Từ chối xét duyệt
              </button>
            </React.Fragment>
          ) : null}
          {isAssigned ? <CustomPopupClone syllabusCourse={course} submit={handleClone} syllabus={syllabus} /> : null}

          <button
            className="form-exit-btn-detail"
            onClick={() => {
              window.history.go(-1);
            }}
          >
            Thoát
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default SyllabusDetail;
