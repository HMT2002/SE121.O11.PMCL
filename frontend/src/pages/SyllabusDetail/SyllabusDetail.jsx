import React, { useEffect, useState, useCallback, useContext } from 'react';
import axios from 'axios';
import { convertToPDF } from '../../APIs/convert-pdf-apis';
import { POST_ApproveSyllabus } from '../../APIs/SyllabusAPI';
import { Toaster, toast } from 'sonner';

import './SyllabusDetail.css';

import { Link, useParams } from 'react-router-dom';
import AuthContext from '../../contexts/auth-context';
import { Table, TableCell, TableContent, TableTitle } from '../../components/Table';

function SyllabusDetail(props) {
  const { id } = useParams();
  const [syllabus, setSyllabus] = useState({});
  const [course, setCourse] = useState({});
  const [department, setDepartment] = useState({});
  const [preCourse, setPreCourse] = useState({});
  const [prerequisiteCourse, setPrerequisiteCourse] = useState({});

  const [courseAssessments, setCourseAssesments] = useState([]);
  const [courseOutcomes, setCourseOutcomes] = useState([]);
  const [courseSchedules, setCourseSchedules] = useState([]);
  const authCtx = useContext(AuthContext);
  const handleConvertPDF = (event) => {
    event.preventDefault();
    const pdfHTMLElement = document.getElementById('syllabus-detail'); // HTML element to be converted to PDF
    const convert = convertToPDF(pdfHTMLElement);
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

  const handleCloneSyllabus = useCallback(async () => {
    // const { data } = await axios({
    //   method: 'post',
    //   url: '/api/v1/syllabus/reject/' + id,
    //   data: {},
    //   validateStatus: () => true,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     authorization: authCtx.token,
    //   },
    // });
    // if (data.status !== 200) return;
    // console.log(data);
    console.log(id);
    toast.info(id, {
      duration: 2000,
    });
  }, []);

  const fetchData = useCallback(async () => {
    axios.get('http://localhost:7000/api/v1/syllabus/id/' + id).then((res) => {
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
                              return 'G' + course.code;
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
                    {courseSchedules.map((courseScheduleItem, index) => {
                      return (
                        <li key={index}>
                          <p style={{ fontWeight: 'bold' }}>{courseScheduleItem.activities}</p>

                          <table width={'100%'}>
                            <tr>
                              <th style={{ width: 100 }}>Thành phần đánh giá</th>
                              <th style={{ width: 80 }}>Tiêu chuẩn</th>
                            </tr>
                            {courseScheduleItem.courseOutcomes !== null
                              ? courseScheduleItem.courseOutcomes.map((courseOutcomeItem, index) => {
                                  return (
                                    <tr>
                                      <td>{courseOutcomeItem.description}</td>
                                      <td>{courseOutcomeItem.level}</td>
                                    </tr>
                                  );
                                })
                              : null}
                          </table>
                        </li>
                      );
                    })}
                  </ol>
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
                                        return 'G' + courseOutcome.level;
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
          {/* <button className="form-clone-btn-detail" onClick={handleCloneSyllabus}>
            Sao chép bản mới từ bản này
          </button> */}
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
