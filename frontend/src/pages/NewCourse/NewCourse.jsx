import React, { useState, useRef, useContext, useEffect } from 'react';
import './NewCourse.css';
import axios from 'axios';
import AuthContext from '../../contexts/auth-context';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

import 'reactjs-popup/dist/index.css';
import SyllabusAPI from '../../APIs/SyllabusAPI';
import CourseAPI from '../../APIs/CourseAPI';

function NewCourse(props) {
  const navigate = useNavigate();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [inputCourse, setInputCourse] = useState({
    code: '',
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

  const [departmentID, setDepartmentID] = useState('');
  const [departmentOptions, setDepartmentOptions] = useState('');

  const authCtx = useContext(AuthContext);
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
    inputData.department = departmentID;
    console.log(inputData);
    try {
      const response = await CourseAPI.POST_CreateNewCourse(authCtx.token, inputData);
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

  const onDepartmentChangeHandler = async (event) => {
    console.log(event.target.value);
    setDepartmentID(event.target.value);
  };

  const Init = async () => {
    if (!authCtx.token) {
      return;
    }
    const { data: departments } = await axios.get('/api/v1/department');
    console.log(departments);
    setDepartmentOptions(
      departments.data.map((department, index) => {
        return (
          <option key={index} value={department._id}>
            {department.name}
          </option>
        );
      })
    );
    setDepartmentID(departments.data[0]._id);
  };
  useEffect(() => {
    console.log(authCtx);

    Init();
  }, [authCtx]);
  return (
    <React.Fragment>
      <Toaster />
      <div className="home-container">
        <div className="form-section">
          <div>
            <div className="addpet-title"></div>
            <div>
              <div>
                <div className="addpet-title">Thông tin chung</div>

                <div className="input-group">
                  <div className="col">
                    <label for="first-name">Tên môn học (tiếng Việt):</label>
                    <input
                      type="text"
                      name="courseNameVN"
                      value={inputCourse.courseNameVN}
                      onChange={updateCourse}
                      className="form-control"
                    />
                  </div>
                  <div className="col">
                    <label for="last-name">Tên môn học (tiếng Anh)</label>
                    <input
                      type="text"
                      name="courseNameEN"
                      value={inputCourse.courseNameEN}
                      onChange={updateCourse}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <div className="col">
                    <label for="first-name">Mã môn học:</label>
                    <input
                      type="text"
                      name="code"
                      value={inputCourse.code}
                      onChange={updateCourse}
                      className="form-control"
                    />
                  </div>
                  <div className="col">
                    <label for="last-name">Khối kiến thức</label>
                    <input
                      type="text"
                      name="type"
                      value={inputCourse.type}
                      onChange={updateCourse}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <div className="col">
                    <label for="first-name">Khoa:</label>
                    <select value={departmentID} onChange={onDepartmentChangeHandler} className="form-control">
                      {departmentOptions}
                    </select>
                  </div>
                  <div className="col">
                    <label for="last-name">Số tín chỉ lý thuyết</label>
                    <input
                      type="text"
                      name="numberOfTheoryCredits"
                      value={inputCourse.numberOfTheoryCredits}
                      onChange={updateCourse}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="input-group">
                  <div className="col">
                    <label for="first-name">Số tín chỉ thực hành:</label>
                    <input
                      type="text"
                      name="numberOfPracticeCredits"
                      value={inputCourse.numberOfPracticeCredits}
                      onChange={updateCourse}
                      className="form-control"
                    />
                  </div>
                  <div className="col">
                    <label for="last-name">Số tín chỉ tự học</label>
                    <input
                      type="text"
                      name="numberOfSelfLearnCredits"
                      value={inputCourse.numberOfSelfLearnCredits}
                      onChange={updateCourse}
                      className="form-control"
                    />
                  </div>
                </div>

                <div>
                  <p>Mô tả môn học:</p>

                  <div className="textarea-wrapper">
                    <textarea
                      name="description"
                      value={inputCourse.description}
                      onChange={updateCourse}
                      placeholder="Nhập nội dung của bạn"
                      rows={8}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
            {isError ? <div>{errorMessage}</div> : null}
          </div>
        </div>
        <div>
          <button
            className="btn-bs btn-bs-primary"
            onClick={() => {
              handleSubmit(inputCourse);
              navigate('/');
            }}
          >
            Tạo mới môn học
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

export default NewCourse;
