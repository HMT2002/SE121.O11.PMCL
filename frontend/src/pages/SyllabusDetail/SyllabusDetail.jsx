import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { convertToPDF } from '../../APIs/convert-pdf-apis';

import './SyllabusDetail.css';

import { Link, useParams } from 'react-router-dom';

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

  const handleConvertPDF = (event) => {
    event.preventDefault();
    const pdfHTMLElement = document.getElementById('syllabus-detail'); // HTML element to be converted to PDF
    const convert = convertToPDF(pdfHTMLElement);
    console.log(convert);
  };

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

  const handlerChangeDes = (e) => {};

  return (
    <div className={`bg-modal modal-active bg-modal-service`}>
      <div id="service-section" className="service-detail-section">
        <div className="html2canvas-container" id="syllabus-detail">
          {course !== null ? (
            <div>
              <div className="addpet-title">Thông tin chung</div>
              <div className="course-info">
                <p>Tên môn học (tiếng Việt): {course.courseNameVN}</p>
                <p>Tên môn học (tiếng Anh): {course.courseNameEN}</p>
                <p>Mã môn học: {course.code}</p>
                <p>Khối kiến thức: {course.type}</p>
                <p>Khoa: {department.name}</p>
                <p>
                  Số tín chỉ:
                  {course.numberOfPracticeCredits + course.numberOfSelfLearnCredits + course.numberOfTheoryCredits}
                </p>
                <p>Lý thuyết: {course.numberOfTheoryCredits}</p>
                <p>Thực hành: {course.numberOfPracticeCredits}</p>
                <p>Tự học: {course.numberOfSelfLearnCredits}</p>
                <p>
                  Môn học trước:{' '}
                  {preCourse.length > 0
                    ? preCourse
                        .map((course, index) => {
                          return course.code;
                        })
                        .join(', ')
                    : null}
                </p>
                <p>
                  Môn học tiên quyết:
                  {prerequisiteCourse.length > 0
                    ? prerequisiteCourse
                        .map((course, index) => {
                          return 'G' + course.code;
                        })
                        .join(', ')
                    : null}
                </p>
              </div>
              <div className="addpet-title">Mô tả môn học</div>
              <p className="course-description">{course.description}</p>

              <div className="addpet-title">
                Nội dung môn học
                {courseSchedules.map((courseScheduleItem, index) => {
                  return (
                    <div>
                      <p>{courseScheduleItem.activities}</p>
                      <div>
                        <table>
                          <tr>
                            <th>Thành phần đánh giá</th>
                            <th>Tiêu chuẩn</th>
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
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="addpet-title">
                Đánh giá môn học
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
              </div>
            </div>
          ) : null}
        </div>

        <div className="form-footer">
          <button className="form-add-btn" onClick={handleConvertPDF}>
            Xuất pdf
          </button>
          <button className="form-add-btn" onClick={fetchData}>
            lấy dữ liệu
          </button>
          <button
            className="form-exit-btn"
            onClick={() => {
              window.history.go(-1);
            }}
          >
            Thoát
          </button>
        </div>
      </div>
    </div>
  );
}

export default SyllabusDetail;