import React, { useState, useRef, useContext, useEffect } from 'react';
import './NewSyllabus.css';
import axios from 'axios';
import AuthContext from '../../contexts/auth-context';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

import CustomPopupCreateNew from '../../components/Popup/PopupCreateNewSyllabus';
import CustomPopupUpdate from '../../components/Popup/PopupUpdateSyllabus';

import 'reactjs-popup/dist/index.css';

function NewSyllabus(props) {
  const [img, setImg] = useState();
  const [inputCourse, serInputCourse] = useState();
  const [syllabusCourseID, setSyllabusCourseID] = useState('');
  const [coursesOptions, setCoursesOptions] = useState('');
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [department, setDepartment] = useState({});
  const [courseAssessments, setCourseAssesments] = useState([]);
  const [courseOutcomes, setCourseOutcomes] = useState([]);
  const [courseSchedules, setCourseSchedules] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [syllabus, setSyllabus] = useState();

  const [additioncourseOutcomeItem, setAdditioncourseOutcomeItem] = useState('');

  const authCtx = useContext(AuthContext);

  const handleSubmit = async (inputData) => {
    if (!syllabusCourseID) {
      alert('Xin hãy chọn lại đề cương');
      return;
    }
    console.log(inputData);
    try {
      const obj = JSON.parse(inputData);
      obj.course = syllabusCourseID;
      console.log(obj);

      const url = '/api/v1/syllabus/';

      const { data } = await axios.post(url, obj, {
        validateStatus: () => true,
        headers: {
          authorization: authCtx.token,
          'Content-Type': 'application/json',
        },
      });

      console.log(data);
      if (data.status === 'success') {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.log(error);
      alert('Kiểm tra định dạng JSON đã nhập');
      return { success: false };
    }
  };
  const handleUpdate = async (inputData) => {
    try {
      const obj = JSON.parse(inputData);
      obj.course = syllabusCourseID;
      console.log(obj);
      const url = '/api/v1/syllabus/course/' + syllabusCourseID;
      const { data } = await axios.patch(url, obj, {
        validateStatus: () => true,
        headers: {
          authorization: authCtx.token,
        },
      });

      console.log(data);
      if (data.status === 'success create new syllabus version') {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.log(error);
      alert('Kiểm tra định dạng JSON đã nhập');
      return { success: false };
    }
  };

  const handleAddNewCourseOutcomeItem = () => {};

  const onSyllabusCourseChangeHandler = async (event) => {
    setIsError(false);
    setErrorMessage('');
    console.log(event.target.value);
    setSyllabusCourseID(event.target.value);
    const { data: syllabusData } = await axios.get(
      'http://localhost:7000/api/v1/syllabus/course/' + event.target.value,
      {
        validateStatus: () => true,
      }
    );
    console.log(syllabusData);
    if (syllabusData.data === null) {
      console.log('Môn học chưa có đề cương, tạo mới?');
      setIsError(true);
      setErrorMessage('Môn học chưa có đề cương, tạo mới?');
      return;
    }
    console.log(syllabusData.data.syllabuses[syllabusData.data.syllabuses.length - 1]);
    console.log(syllabusData.data.syllabuses[syllabusData.data.syllabuses.length - 1].courseSchedules);
    setCourseSchedules(syllabusData.data.syllabuses[syllabusData.data.syllabuses.length - 1].courseSchedules);
    setCourse(syllabusData.data.course);
    setSyllabus((prevState) => {
      return syllabusData.data.syllabuses[syllabusData.data.syllabuses.length - 1];
    });

    return;

    setDepartment(syllabusData.course.department);
    setCourseAssesments(syllabusData.courseAssessments);
    setCourseOutcomes(syllabusData.courseOutcomes);
  };

  const Init = async () => {
    const { data } = await axios.get('/api/v1/course');
    console.log(data);
    setCourses(data.data);
    setCourse(data.data[0]);
    setSyllabusCourseID(data.data[0]._id);
    setDepartment(data.data[0].department);

    setCourseAssesments([]);
    setCourseOutcomes([]);
    setCourseSchedules([]);
    setCoursesOptions(
      data.data.map((course, index) => {
        return <option value={course._id}>{course.courseNameVN}</option>;
      })
    );
  };
  useEffect(() => {
    console.log(authCtx);

    Init();
  }, []);
  return (
    <React.Fragment>
      {' '}
      <div id="addpet-section">
        <div className="form-section">
          <div>
            <div className="addpet-title">
              Môn:{' '}
              <select value={syllabusCourseID} onChange={onSyllabusCourseChangeHandler}>
                {coursesOptions}
              </select>
            </div>
            {course !== null ? (
              <div>
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
                  </div>
                </div>
              </div>
            ) : null}
            {isError ? (
              <div>{errorMessage}</div>
            ) : (
              <React.Fragment>
                <div className="addpet-title">
                  Nội dung môn học:
                  {courseSchedules.length > 0
                    ? courseSchedules.map((courseScheduleItem, index) => {
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
                                        <React.Fragment>
                                          <tr>
                                            <td>{courseOutcomeItem.description}</td>
                                            <td>{courseOutcomeItem.level}</td>
                                          </tr>
                                        </React.Fragment>
                                      );
                                    })
                                  : null}
                              </table>
                            </div>
                          </div>
                        );
                      })
                    : null}{' '}
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
              </React.Fragment>
            )}
          </div>
        </div>
        <div className="form-footer">
          {isError ? (
            <CustomPopupCreateNew syllabusCourse={course} submit={handleSubmit} />
          ) : (
            <CustomPopupUpdate syllabusCourse={course} submit={handleUpdate} />
          )}
        </div>
        <div></div>
      </div>
    </React.Fragment>
  );
}

export default NewSyllabus;
