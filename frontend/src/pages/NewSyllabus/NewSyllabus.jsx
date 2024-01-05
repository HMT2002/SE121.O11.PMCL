import React, { useState, useRef, useContext, useEffect } from 'react';
import './NewSyllabus.css';
import axios from 'axios';
import AuthContext from '../../contexts/auth-context';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

import CustomPopupCreateNew from '../../components/Popup/PopupCreateNewSyllabus';
import CustomPopupUpdate from '../../components/Popup/PopupUpdateSyllabus';
import { Toaster, toast } from 'sonner';
import { Table, TableCell, TableContent, TableTitle } from '../../components/Table';

import 'reactjs-popup/dist/index.css';
import SyllabusAPI from '../../APIs/SyllabusAPI';

function NewSyllabus(props) {
  const [img, setImg] = useState();
  const [inputCourse, serInputCourse] = useState();
  const [syllabusCourseID, setSyllabusCourseID] = useState('');
  const [coursesOptions, setCoursesOptions] = useState('');
  const [course, setCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [department, setDepartment] = useState({});

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [syllabus, setSyllabus] = useState();

  const [additioncourseOutcomeItem, setAdditioncourseOutcomeItem] = useState('');

  const authCtx = useContext(AuthContext);

  const handleSubmit = async (inputData) => {
    if (!syllabusCourseID) {
      toast.error('Xin hãy chọn lại môn học', {
        duration: 2000,
      });
      return;
    }
    console.log(inputData);
    try {
      console.log(inputData);
      inputData.course=course._id;
      const response = await SyllabusAPI.POST_CreateNewSyllabus(authCtx.token, inputData);

      console.log(response);
      if (response.status === 'success') {
        toast.success('Tạo mới đề cương thành công', {
          duration: 2000,
        });
        return { success: true };
      } else {
        toast.error('Lỗi không thể tạo mới đề cương', {
          duration: 2000,
        });
        return { success: false };
      }
    } catch (error) {
      console.log(error);
      toast.error('Lỗi không thể tạo mới đề cương', {
        duration: 2000,
      });
      return { success: false };
    }
  };
  const handleUpdate = async (inputData) => {
    try {
      inputData.course = syllabusCourseID;
      console.log(inputData);
      const response = await SyllabusAPI.PATCH_UpdateSyllabusByCourseId(authCtx.token, syllabusCourseID, inputData);
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

  const handleAddNewCourseOutcomeItem = () => {};

  const onSyllabusCourseChangeHandler = async (event) => {
    setIsError(false);
    setErrorMessage('');
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
    setCourse((prevState) => {
      return syllabusData.data.course;
    });
    console.log('pppppppppppppppppppppp');
    console.log(course);
    if (syllabusData.data.syllabuses.length === 0) {
      console.log('Môn học chưa có đề cương, tạo mới?');
      setIsError(true);
      setErrorMessage('Môn học chưa có đề cương, tạo mới?');

      return;
    }

    setSyllabus((prevState) => {
      return syllabusData.data.syllabuses[syllabusData.data.syllabuses.length - 1];
    });

    return;
  };

  const Init = async () => {
    if (!authCtx.token) {
      return;
    }
    const { data: assignments } = await axios.get('/api/v1/course/assign/user', {
      headers: {
        authorization: authCtx.token,
      },
      validateStatus: () => true,
    });
    console.log(assignments);
    const assignmentData = assignments.data;
    const assignedCourses = assignmentData.map((assignment) => assignment.course);
    console.log(assignedCourses);
    setCourses(assignedCourses);
    if (assignedCourses.length === 0) {
      console.log('no assignedCourses');
      return;
    }
    setCourse(assignmentData[0].course);
    setSyllabusCourseID(assignmentData[0].course._id);
    setDepartment(assignmentData[0].course.department);
    setCoursesOptions(
      assignedCourses.map((course, index) => {
        return (
          <option value={course._id} key={index}>
            {course.courseNameVN}
          </option>
        );
      })
    );
  };
  useEffect(() => {
    console.log(authCtx);

    Init();
  }, [authCtx]);
  return (
    <React.Fragment>
      <Toaster />
      {courses.length === 0 ? (
        <div>Bạn chưa được phân công quản lý đề cương môn</div>
      ) : (
        <div id="addpet-section">
          <div className="form-section">
            <div>
              <div className="addpet-title">
                Môn:{' '}
                <select
                  value={syllabusCourseID}
                  onChange={(event) => {
                    onSyllabusCourseChangeHandler(event);
                  }}
                >
                  {coursesOptions}
                </select>
              </div>
              {course !== null ? (
                <Table>
                  <TableTitle title={`Thông Tin chung`} />

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
                  </TableContent>
                </Table>
              ) : null}
              {isError ? <div>{errorMessage}</div> : null}
            </div>
          </div>
          <div className="form-footer">
            {isError ? (
              <CustomPopupCreateNew syllabusCourse={course} submit={handleSubmit} />
            ) : (
              <CustomPopupUpdate syllabusCourse={course} submit={handleUpdate} />
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

export default NewSyllabus;
