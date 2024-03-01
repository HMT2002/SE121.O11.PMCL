import React, { useState, useRef, useContext, useEffect } from 'react';
import './CourseEdit.css';
import axios from 'axios';
import AuthContext from '../../contexts/auth-context';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useParams } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

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
      toast.error('Xin hãy chọn lại môn học', {
        duration: 2000,
      });
      return;
    }
    inputData.department = departmentID;

    console.log(inputData);
    try {
      const response = await CourseAPI.POST_UpdateCourseById(authCtx.token, course._id, inputData);

      console.log(response);
      if (response.status === 200) {
        console.log('Update success');
        toast.success('Cập nhật môn học thành công', {
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Lỗi cập nhật môn học', {
        duration: 2000,
      });
    }
  };

  const onSyllabusCourseChangeHandler = async (event) => {
    setIsError(false);
    setErrorMessage('');
    console.log(event.target.value);
    setSyllabusCourseID(event.target.value);
    const { data: syllabusData } = await axios.get('/api/v1/syllabus/course/' + event.target.value, {
      validateStatus: () => true,
    });
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
      <Toaster />
      <div id="addpet-section">
        <div className="form-section">
          <div>
            <div className="addpet-title"></div>
            {course !== null ? (
              <div>
                <div>
                  <div className="addpet-title">Thông tin chung</div>

                  <div class="input-group">
                    <div class="col">
                      <label for="first-name">Tên môn học (tiếng Việt):</label>
                      <input
                        type="text"
                        name="courseNameVN"
                        value={inputCourse.courseNameVN}
                        onChange={updateCourse}
                        defaultValue={course.courseNameVN}
                        className="form-control"
                      />
                    </div>
                    <div class="col">
                      <label for="last-name">Tên môn học (tiếng Anh)</label>
                      <input
                        type="text"
                        name="courseNameEN"
                        value={inputCourse.courseNameEN}
                        onChange={updateCourse}
                        defaultValue={course.courseNameEN}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div class="input-group">
                    <div class="col">
                      <label for="first-name">Mã môn học:</label>
                      <input
                        type="text"
                        name="code"
                        value={inputCourse.code}
                        onChange={updateCourse}
                        defaultValue={course.code}
                        className="form-control"
                      />
                    </div>
                    <div class="col">
                      <label for="last-name">Khối kiến thức</label>
                      <input
                        type="text"
                        name="type"
                        value={inputCourse.type}
                        onChange={updateCourse}
                        defaultValue={course.type}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div class="input-group">
                    <div class="col">
                      <label for="first-name">Khoa:</label>
                      <select value={departmentID} onChange={onDepartmentChangeHandler} className="form-control">
                        {departmentOptions}
                      </select>
                    </div>
                    <div class="col">
                      <label for="last-name">Số tín chỉ lý thuyết</label>
                      <input
                        type="text"
                        name="numberOfTheoryCredits"
                        value={inputCourse.numberOfTheoryCredits}
                        onChange={updateCourse}
                        defaultValue={course.numberOfTheoryCredits}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div class="input-group">
                    <div class="col">
                      <label for="first-name">Số tín chỉ thực hành:</label>
                      <input
                        type="text"
                        name="numberOfPracticeCredits"
                        value={inputCourse.numberOfPracticeCredits}
                        onChange={updateCourse}
                        defaultValue={course.numberOfPracticeCredits}
                        className="form-control"
                      />
                    </div>
                    <div class="col">
                      <label for="last-name">Số tín chỉ tự học</label>
                      <input
                        type="text"
                        name="numberOfSelfLearnCredits"
                        value={inputCourse.numberOfSelfLearnCredits}
                        onChange={updateCourse}
                        defaultValue={course.numberOfSelfLearnCredits}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div>
                    <p>Mô tả môn học:</p>

                    <div class="textarea-wrapper">
                      <textarea
                        name="description"
                        value={inputCourse.description}
                        onChange={updateCourse}
                        defaultValue={course.description}
                        placeholder="Nhập nội dung của bạn"
                        rows={8}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {isError ? <div>{errorMessage}</div> : null}
          </div>
        </div>
        <div>
          <button
            className="btn-bs btn-bs-primary"
            onClick={() => {
              handleSubmit(inputCourse);
              window.history.go(-1);
            }}
          >
            Cập nhật nội dung môn học
          </button>{' '}
        </div>
        <div>
          <button
            className="btn-bs btn-bs-dark mt-15 "
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
