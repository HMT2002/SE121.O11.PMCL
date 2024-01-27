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
  const [isAssigned, setIsAssigned] = useState(false);
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

  const fetchData = useCallback(() => {
    axios.get('/api/v1/syllabus/id/' + id, { validateStatus: () => true }).then((res) => {
      if (res.data.data === null) return;
      let syllabusData = res.data.data;
      console.log(res.data);
      setSyllabus(syllabusData);
      setCourseAssesments(syllabusData.courseAssessments);
      setCourseOutcomes(syllabusData.courseOutcomes);
      setCourseSchedules(syllabusData.courseSchedules);
      setCourse(syllabusData.course);
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
              <div className="course-description">
                <div>
                  <b>2. MÔ TẢ MÔN HỌC</b>
                </div>
                <div className="course-description-detail">{course.description}</div>
              </div>
              <div className="course-goals">
                <div>
                  <b>3. CHUẨN ĐẦU RA MÔN HỌC</b>
                </div>
                <table width={'100%'}>
                  <tr>
                    <th style={{ width: 60 }}>CĐRMH</th>
                    <th style={{ width: 300 }}>Mô tả CĐMH</th>
                    <th style={{ width: 80 }}>Ánh xạ CĐR, CTĐT</th>
                    <th style={{ width: 300 }}>Cấp độ CĐRMH về NT, KN, TĐ</th>
                  </tr>
                  {courseOutcomes.map((courseOutcomeItem, index) => {
                    return (
                      <tr>
                        <td>{courseOutcomeItem.code ? courseOutcomeItem.code : ''}</td>
                        <td>{courseOutcomeItem.description}</td>
                        <td>
                          {courseOutcomeItem.courseGoal.programOutcomes
                            ? courseOutcomeItem.courseGoal.programOutcomes.map((programOutcomeItem, index) => {
                                if (index === courseOutcomeItem.courseGoal.programOutcomes.length) {
                                  return programOutcomeItem.programOutcomeCode;
                                }
                                return programOutcomeItem.programOutcomeCode + ', ';
                              })
                            : null}
                        </td>
                        <td>
                          {courseOutcomeItem.level ? courseOutcomeItem.levelOfTeaching + courseOutcomeItem.level : null}
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
              <div className="course-schedule">
                <div>
                  <b>4. NỘI DUNG MÔN HỌC, KẾ HOẠCH GIẢNG DẠY</b>
                </div>
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
                                return courseOutcomeItem.id ? courseOutcomeItem.id : '';
                              })
                            : null}
                        </td>
                        <td>{courseScheduleItem.activities}</td>
                        <td>
                          {courseScheduleItem.courseAssessElements !== null
                            ? courseScheduleItem.courseAssessElements.map((courseAssessElementItem, index) => {
                                return courseAssessElementItem.label ? courseAssessElementItem.label + ', ' : null;
                              })
                            : null}
                        </td>
                      </tr>
                    );
                  })}
                </table>
              </div>
              <div className="course-assessments">
                <div>
                  <b>5. ĐÁNH GIÁ MÔN HỌC</b>
                </div>
                <table>
                  <tr>
                    <th style={{ width: 150 }}>Thành phần đánh giá</th>
                    <th style={{ width: 80 }}>CĐRMH</th>
                    <th style={{ width: 120 }}>Tỷ lệ</th>
                  </tr>
                  {courseAssessments.length > 0
                    ? courseAssessments.map((courseAssesmentItem, index) => {
                        return (
                          <tr>
                            <td>{courseAssesmentItem.label + '. ' + courseAssesmentItem.description}</td>
                            <td>
                              {courseAssesmentItem.rubrics.length > 0
                                ? courseAssesmentItem.rubrics.map((rubric, rubric_index) => {
                                    return rubric.courseOutcomes
                                      .map((outcome, outcome_index) => {
                                        return outcome.id;
                                      })
                                      .join(', ');
                                  })
                                : null}
                            </td>
                            <td>{courseAssesmentItem.percentage}%</td>
                          </tr>
                        );
                      })
                    : null}
                </table>
                <div>
                  <b>a. Rubric của thành phần đánh giá</b>
                </div>
                <table>
                  <tr>
                    <th style={{ width: 150 }}>CĐRMH</th>
                    <th style={{ width: 80 }}>{`Giỏi (>8đ)`}</th>
                    <th style={{ width: 80 }}>{`Khá (>7đ)`}</th>
                    <th style={{ width: 80 }}>{`Tb (5-6đ)`}</th>
                  </tr>
                  {courseAssessments.length > 0
                    ? courseAssessments.map((courseAssesmentItem, index) => {
                        return (
                          <tr>
                            {courseAssesmentItem.rubrics.length > 0
                              ? courseAssesmentItem.rubrics.map((rubrics, index) => {
                                  return (
                                    <>
                                      <td>{rubrics.rubricExRequirement}</td>
                                      <td>{rubrics.rubricGoRequirement}</td>
                                      <td>{rubrics.rubricMidRequirement}</td>
                                    </>
                                  );
                                })
                              : null}

                            <td>{courseAssesmentItem.percentage}%</td>
                          </tr>
                        );
                      })
                    : null}
                </table>
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
