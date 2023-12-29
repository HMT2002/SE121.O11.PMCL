import React, { useState, useRef, useContext, useEffect } from 'react';
import './CourseEdit.css';
import axios from 'axios';
import AuthContext from '../../contexts/auth-context';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useParams } from 'react-router-dom';

import 'reactjs-popup/dist/index.css';
import SyllabusAPI from '../../APIs/SyllabusAPI';
import CourseAPI from '../../APIs/CourseAPI';

function CourseEdit(props) {
  const { id } = useParams();
  const [img, setImg] = useState();
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
  const [inputCourse, setInputCourse] = useState({
    courseNameVN: '',
    courseNameEN: '',
    code: '',
    type: '',
    department: { name: '' },
    description: '',
    numberOfPracticeCredits: 0,
    numberOfSelfLearnCredits: 0,
    numberOfTheoryCredits: 0,
    preCourse: [],
    prerequisiteCourse: [],
    assistants: [],
  });

  const [additioncourseOutcomeItem, setAdditioncourseOutcomeItem] = useState('');

  const [departmentID, setDepartmentID] = useState('');
  const [departmentOptions, setDepartmentOptions] = useState('');

  const authCtx = useContext(AuthContext);
  function validateNumbric(event) {}
  const updateCourse = (e) => {
    const fieldName = e.target.name;
    var value = e.target.value;
    if (
      fieldName === 'numberOfTheoryCredits' ||
      fieldName === 'numberOfPracticeCredits' ||
      fieldName === 'numberOfSelfLearnCredits'
    ) {
      value = e.target.value.replace(/\D/g, '');
    }
    setInputCourse((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (inputData) => {
    if (!syllabusCourseID) {
      alert('Xin hãy chọn lại đề cương');
      return;
    }
    inputData.department = departmentID;

    console.log(inputData);
    try {
      const response = await CourseAPI.POST_UpdateCourseById(authCtx.token, course._id, inputData);

      console.log(response);
      if (response.status === 200) {
        console.log('Update success');
      }
    } catch (error) {
      console.log(error);
      alert('Kiểm tra định dạng JSON đã nhập');
    }
  };

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
    if (syllabusData.data.syllabuses.length === 0) {
      console.log('Môn học chưa có đề cương, tạo mới?');
      setIsError(true);
      setErrorMessage('Môn học chưa có đề cương, tạo mới?');
      return;
    }
    console.log(syllabusData.data.syllabuses[syllabusData.data.syllabuses.length - 1]);
    console.log(syllabusData.data.syllabuses[syllabusData.data.syllabuses.length - 1].courseSchedules);
    setCourseSchedules(syllabusData.data.syllabuses[syllabusData.data.syllabuses.length - 1].courseSchedules);
    setCourse(syllabusData.data.course);
    setInputCourse(syllabusData.data.course);
    setSyllabus((prevState) => {
      return syllabusData.data.syllabuses[syllabusData.data.syllabuses.length - 1];
    });

    return;
  };

  const onDepartmentChangeHandler = async (event) => {
    console.log(event.target.value);
    setDepartmentID(event.target.value);
  };

  const Init = async () => {
    // const { data } = await axios.get('/api/v1/course');
    // console.log(data);
    // setCourses(data.data);
    // setCourse(data.data[0]);
    // setSyllabusCourseID(data.data[0]._id);
    // setDepartment(data.data[0].department);
    // setCoursesOptions(
    //   data.data.map((course, index) => {
    //     return (
    //       <option value={course._id} key={index}>
    //         {course.courseNameVN}
    //       </option>
    //     );
    //   })
    // );

    if (!authCtx.token) {
      return;
    }

    const { data: courseResponse } = await axios.get('http://localhost:7000/api/v1/syllabus/course/' + id);
    const courseData = courseResponse.data.course;
    console.log(courseData);

    const { data: assignments } = await axios.get('/api/v1/course/assign/user', {
      headers: {
        authorization: authCtx.token,
      },
      validateStatus: () => true,
    });
    const assignmentData = assignments.data;
    if (assignmentData.length > 0) {
      const assignedCourses = assignmentData.map((assignment) => assignment.course);
      setCourses(assignedCourses);
      setCourse(courseData);
      setInputCourse(courseData);
      setSyllabusCourseID(courseData._id);
      setDepartment(courseData.department);
      setCoursesOptions(
        assignedCourses.map((course, index) => {
          return (
            <option value={course._id} key={index}>
              {course.courseNameVN}
            </option>
          );
        })
      );
    }

    const { data: departments } = await axios.get('/api/v1/department');
    console.log(departments);
    setDepartmentOptions(
      departments.data
        .sort((a, b) => {
          if (a.name === courseData.department.name) {
            return 1;
          }
        })
        .map((department, index) => {
          return <option value={department._id}>{department.name}</option>;
        })
    );
    setDepartmentID(courseData.department._id);
  };
  useEffect(() => {
    console.log(authCtx);

    Init();
  }, [authCtx]);
  return (
    <React.Fragment>
      {' '}
      <div id="addpet-section">
        <div className="form-section">
          <div>
            <div className="addpet-title"></div>
            {course !== null ? (
              <div>
                <div>
                  <div className="addpet-title">Thông tin chung</div>
                  <div>
                    <p>Tên môn học (tiếng Việt): {course.courseNameVN}</p>
                    <input
                      type="text"
                      name="courseNameVN"
                      value={inputCourse.courseNameVN}
                      onChange={updateCourse}
                      defaultValue={course.courseNameVN}
                      className="addpet-input"
                    ></input>
                    <p>Tên môn học (tiếng Anh): {course.courseNameEN}</p>{' '}
                    <input
                      type="text"
                      name="courseNameEN"
                      value={inputCourse.courseNameEN}
                      onChange={updateCourse}
                      defaultValue={course.courseNameEN}
                      className="addpet-input"
                    ></input>
                    <p>Mã môn học: {course.code}</p>{' '}
                    <input
                      type="text"
                      name="code"
                      value={inputCourse.code}
                      onChange={updateCourse}
                      defaultValue={course.code}
                      className="addpet-input"
                    ></input>
                    <p>Khối kiến thức: {course.type}</p>{' '}
                    <input
                      type="text"
                      name="type"
                      value={inputCourse.type}
                      onChange={updateCourse}
                      defaultValue={course.type}
                      className="addpet-input"
                    ></input>
                    <p>
                      Khoa:{' '}
                      <select value={departmentID} onChange={onDepartmentChangeHandler}>
                        {departmentOptions}
                      </select>
                    </p>
                    <p>Số tín chỉ lý thuyết:</p>{' '}
                    <input
                      type="text"
                      name="numberOfTheoryCredits"
                      value={inputCourse.numberOfTheoryCredits}
                      onChange={updateCourse}
                      defaultValue={course.numberOfTheoryCredits}
                      className="addpet-input"
                    ></input>
                    <p>Số tín chỉ thực hành:</p>{' '}
                    <input
                      type="text"
                      name="numberOfPracticeCredits"
                      value={inputCourse.numberOfPracticeCredits}
                      onChange={updateCourse}
                      defaultValue={course.numberOfPracticeCredits}
                      className="addpet-input"
                    ></input>
                    <p>Số tín chỉ tự học:</p>{' '}
                    <input
                      type="text"
                      name="numberOfSelfLearnCredits"
                      value={inputCourse.numberOfSelfLearnCredits}
                      onChange={updateCourse}
                      defaultValue={course.numberOfSelfLearnCredits}
                      className="addpet-input"
                    ></input>
                    <p>Mô tả môn học:</p>
                    <textarea
                      name="description"
                      value={inputCourse.description}
                      onChange={updateCourse}
                      defaultValue={course.description}
                      className="description-textarea"
                    ></textarea>
                  </div>
                </div>
              </div>
            ) : null}
            {isError ? <div>{errorMessage}</div> : null}
          </div>
        </div>
        <div className="form-footer">
          <button onClick={() => handleSubmit(inputCourse)}>Cập nhật nội dung môn học</button>{' '}
        </div>
        <div className="form-footer">
          <button
            className="btn-exit-edit"
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

export default CourseEdit;
