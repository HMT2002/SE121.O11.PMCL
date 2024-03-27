import React, { useContext, useEffect, useState } from 'react';
import './CourseDetail.css';
import dogimage from '../../images/golden.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import VersionCard from '../../components/VersionCard/VersionCard';
import AuthContext from '../../contexts/auth-context';
import { IoMdCreate } from 'react-icons/io';
import { Toaster } from 'sonner';
import { Table, TableCell, TableContent, TableRow, TableTitle } from '../../components/Table';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import logo from '../../images/uit.png';

import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';

export default function CourseDetail() {
  const { id } = useParams();
  const authCtx = useContext(AuthContext);
  console.log(authCtx);

  const [courseHistory, setCourseHistory] = useState([]);
  const [course, setCourse] = useState({
    courseNameVN: '',
    courseNameEN: '',
    instructors: [],
    assistants: [],
    description: '',
    type: '',
    prerequisiteCourse: [],
    preCourse: [],
    numberOfTheoryCredits: 0,
    numberOfPracticeCredits: 0,
    numberOfSelfLearnCredits: 0,
    courseGoals: [],
    department: { name: '' },
  });
  const [syllabusList, setSyllabusList] = useState([]);
  const [syllabus, setSyllabus] = useState({});
  const [courseAssessments, setCourseAssesments] = useState([]);
  const [courseOutcomes, setCourseOutcomes] = useState([]);
  const [syllabusVersions, setSyllabusVersions] = useState([]);

  const [courseSchedules, setCourseSchedules] = useState([]);
  const [department, setDepartment] = useState({});

  const handleClickVersion = async (index) => {
    try {
      let syllabusData = syllabusVersions[index].syllabus;
      setSyllabus(syllabusData);
      setCourseAssesments(syllabusData.courseAssessments);
      setCourseOutcomes(syllabusData.courseOutcomes);
      setCourseSchedules(syllabusData.courseSchedules);
      setDepartment(syllabusData.course.department);
      console.log(syllabusVersions[index].syllabus);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    axios.get('/api/v1/syllabus/course/' + id).then((res) => {
      let courseData = res.data.data;
      console.log(courseData);
      setCourseHistory(courseData);
      setSyllabusList(
        courseData.versions.map((version) => {
          return version.syllabus;
        })
      );
      console.log(courseData.versions);
      setSyllabusVersions((prevState) => courseData.versions);

      if (courseData.versions.length === 0) {
        setSyllabus(null);
        return;
      }
      axios
        .get('/api/v1/syllabus/id/' + courseData.versions[0].syllabus._id, { validateStatus: () => true })
        .then((res) => {
          if (res.data.data === null) return;
          let syllabusData = res.data.data;
          console.log(res.data);
          setSyllabus(syllabusData);
          setCourseAssesments(syllabusData.courseAssessments);
          setCourseOutcomes(syllabusData.courseOutcomes);
          setCourseSchedules(syllabusData.courseSchedules);
          setCourse(syllabusData.course);
          setDepartment(syllabusData.course.department);
        });
    });
  }, []);

  return (
    <React.Fragment>
      <Toaster />
      <div className="main-course-info">
        <div className="course-info">
          {/* <Table>
            <TableTitle title={`Thông Tin Chi tiết Môn học`} />

            <TableContent>
              <TableCell label={`Tên môn học (tiếng Việt)`} value={course.courseNameVN} isBold={true} />
              <TableCell label={`Tên môn học (tiếng Anh)`} value={course.courseNameEN} isBold={true} />
              <TableCell label={`Mã môn học`} value={course.code} isBold />
              <TableCell label={`Khối kiến thức`} value={course.type} />
              <TableCell label={`Khoa`} value={course.department.name} />
              <TableCell
                label={`Số tín chỉ`}
                value={course.numberOfPracticeCredits + course.numberOfSelfLearnCredits + course.numberOfTheoryCredits}
              />
              <TableCell label={`Lý thuyết`} value={course.numberOfTheoryCredits} />
              <TableCell label={`Thực hành`} value={course.numberOfPracticeCredits} />
              <TableCell label={`Tự học`} value={course.numberOfSelfLearnCredits} />
              <TableCell
                label={`Môn học trước`}
                value={
                  course.preCourse.length > 0
                    ? course.preCourse
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
                  course.prerequisiteCourse.length > 0
                    ? course.prerequisiteCourse
                        .map((course, index) => {
                          return course.code;
                        })
                        .join(', ')
                    : null
                }
              />
            </TableContent>
          </Table> */}

          {authCtx.role === 'admin' || authCtx.role === 'chairman' ? (
            <div className="course-info-edit">
              <Link to={'/edit/course/' + course._id}>
                <button className="btn-info-edit">
                  <IoMdCreate />
                  Chỉnh sửa thông tin môn học
                </button>
              </Link>{' '}
            </div>
          ) : null}
        </div>
        <div className="split">
          <div className="selected-course-syllabus">
            <div className="main-detail">
              <div id="service-section" className="service-detail-section">
                <div className="html2canvas-container" id="syllabus-detail">
                  {course !== null && syllabus !== null ? (
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
                              {course.numberOfPracticeCredits +
                                course.numberOfSelfLearnCredits +
                                course.numberOfTheoryCredits}
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
                      <div>
                        <div className="course-goals">
                          <div>
                            <b>3. CHUẨN ĐẦU RA MÔN HỌC</b>
                          </div>
                          <table width={'100%'}>
                            <tr>
                              <th style={{ width: 60 }}>CĐRMH</th>
                              <th style={{ width: 300 }}>Mô tả CĐMH (Mục tiêu môn học)</th>
                              <th style={{ width: 80 }}>Ánh xạ CĐR, CTĐT</th>
                              <th style={{ width: 300 }}>Cấp độ CĐRMH về NT, KN, TĐ</th>
                            </tr>
                            {courseOutcomes.length > 0
                              ? courseOutcomes.map((courseOutcomeItem, index) => {
                                  return (
                                    <tr>
                                      <td>{courseOutcomeItem.id ? courseOutcomeItem.id : ''}</td>
                                      <td>{courseOutcomeItem.description}</td>
                                      <td>
                                        {courseOutcomeItem.courseGoal.programOutcomes
                                          ? courseOutcomeItem.courseGoal.programOutcomes.map(
                                              (programOutcomeItem, index) => {
                                                if (index === courseOutcomeItem.courseGoal.programOutcomes.length) {
                                                  return programOutcomeItem.programOutcomeCode;
                                                }
                                                return programOutcomeItem.programOutcomeCode + ', ';
                                              }
                                            )
                                          : null}
                                      </td>
                                      <td>
                                        {courseOutcomeItem.levelOfTeaching
                                          ? courseOutcomeItem.levelOfTeaching + courseOutcomeItem.level
                                          : null}
                                      </td>
                                    </tr>
                                  );
                                })
                              : null}
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
                                      ? courseScheduleItem.courseAssessElements.map(
                                          (courseAssessElementItem, index) => {
                                            return courseAssessElementItem.label
                                              ? courseAssessElementItem.label + ', '
                                              : null;
                                          }
                                        )
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
                                      <td>
                                        {courseAssesmentItem.courseAssessment.label +
                                          '. ' +
                                          courseAssesmentItem.courseAssessment.description}
                                      </td>
                                      <td>
                                        {courseAssesmentItem.courseAssessment.rubrics.length > 0
                                          ? courseAssesmentItem.courseAssessment.rubrics.map((rubric, rubric_index) => {
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

                          {courseAssessments.length > 0
                            ? courseAssessments.map((courseAssesmentItem, index) => {
                                return (
                                  <>
                                    {' '}
                                    <div>
                                      <b>
                                        a. Rubric của thành phần đánh giá {courseAssesmentItem.courseAssessment.label}
                                      </b>
                                    </div>
                                    <table>
                                      <tr>
                                        <th style={{ width: 150 }}>CĐRMH</th>
                                        <th style={{ width: 80 }}>{`Giỏi (>8đ)`}</th>
                                        <th style={{ width: 80 }}>{`Khá (>7đ)`}</th>
                                        <th style={{ width: 80 }}>{`Tb (5-6đ)`}</th>
                                      </tr>

                                      <tr>
                                        {courseAssesmentItem.courseAssessment.rubrics.length > 0
                                          ? courseAssesmentItem.courseAssessment.rubrics.map((rubric, index) => {
                                              return (
                                                <>
                                                  <td>
                                                    {rubric.courseOutcomes.length > 0
                                                      ? rubric.courseOutcomes.map((outcome, index) => {
                                                          return outcome.id;
                                                        })
                                                      : null}
                                                    : {rubric.description}
                                                  </td>

                                                  <td>{rubric.rubricExRequirement}</td>
                                                  <td>{rubric.rubricGoRequirement}</td>
                                                  <td>{rubric.rubricMidRequirement}</td>
                                                </>
                                              );
                                            })
                                          : null}
                                      </tr>
                                    </table>
                                  </>
                                );
                              })
                            : null}
                        </div>

                        <div className="course-requirements">
                          <div>
                            <b>6. QUY ĐỊNH MÔN HỌC</b>
                          </div>
                          {course.courseRequirements
                            ? course.courseRequirements.length > 0
                              ? course.courseRequirements.map((courseRequirement) => <div>- {courseRequirement}</div>)
                              : null
                            : null}
                        </div>
                      </div>
                      <div className="course-documents">
                        <div>
                          <b>7. TÀI LIỆU HỌC TẬP, THAM KHẢO</b>
                        </div>
                        {course.courseDocuments
                          ? course.courseDocuments.length > 0
                            ? course.courseDocuments.map((courseDocument, index) => (
                                <div>
                                  {index}. {courseDocument}
                                </div>
                              ))
                            : null
                          : null}
                      </div>

                      <div className="course-tools">
                        <div>
                          <b>8. PHẦN MỀM, CÔNG CỤ HỖ TRỢ THỰC HÀNH</b>
                        </div>
                        {course.courseDocuments
                          ? course.courseDocuments.length > 0
                            ? course.courseDocuments.map((courseDocument, index) => (
                                <div>
                                  {index}. {courseDocument}
                                </div>
                              ))
                            : null
                          : null}
                      </div>

                      <div className="syllabus-info">
                        <div>
                          <b>Trưởng khoa, bộ môn</b>
                        </div>
                        {department ? (
                          <>
                            <div>Chữ ký:</div>
                            <div>{department.chairman ? department.chairman.username : null}</div>
                          </>
                        ) : null}{' '}
                        <div>
                          <b>Giảng viên biên soạn</b>
                        </div>
                        {syllabus ? (
                          <>
                            {' '}
                            <div>Chữ ký:</div>
                            <div>{syllabus.author ? syllabus.author.username : null}</div>
                          </>
                        ) : null}
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="timeline-version">
            {syllabusVersions.length > 0 ? (
              <Timeline>
                {syllabusVersions.map((version, index) => {
                  const updatedDate = new Date(version.date);
                  console.log(version);
                  const str =
                    updatedDate.getUTCFullYear() +
                    '/' +
                    (updatedDate.getUTCMonth() + 1) +
                    '/' +
                    updatedDate.getUTCDate() +
                    ' ' +
                    updatedDate.getUTCHours() +
                    ':' +
                    updatedDate.getUTCMinutes();

                  return (
                    <>
                      <div onClick={() => handleClickVersion(index)}>
                        <TimelineItem position="left">
                          <TimelineSeparator>
                            <TimelineDot
                              sx={{
                                backgroundColor: '#00FF00',
                              }}
                            />
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            {str} {version.syllabus.author.fullname}
                          </TimelineContent>
                        </TimelineItem>
                      </div>
                    </>
                  );
                })}
              </Timeline>
            ) : null}
          </div>
        </div>
        <table>
          <thead>
            <TableRow>
              <th style={{ width: 180 }}>Tiêu đề</th>
              <th style={{ width: 100 }}>Giảng viên</th>
              <th style={{ width: 80 }}>Thời gian tạo</th>
              <th style={{ width: 80 }}>Trạng thái</th>
              <th style={{ width: 80 }}>Thao tác</th>
            </TableRow>
          </thead>
          <tbody>
            {syllabusList.length ? (
              syllabusList.map((syllabusItem, index) => {
                return (
                  <VersionCard
                    syllabus={syllabusItem}
                    course={course}
                    isAdmin={
                      authCtx.role === 'admin' ||
                      (authCtx.role === 'chairman' && authCtx.department.name === course.department.name)
                        ? true
                        : false
                    }
                  />
                );
              })
            ) : (
              <TableRow>
                <td colSpan={6}>Chưa có thông tin đề cương môn học</td>
              </TableRow>
            )}
          </tbody>
        </table>
        <div className="content-footer">
          {/* <button id="btn-modify" onClick={enablePet}>Chỉnh sửa</button> */}
          <button
            id="btn-exit"
            onClick={() => {
              window.history.go(-1);
            }}
          >
            Thoát
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
