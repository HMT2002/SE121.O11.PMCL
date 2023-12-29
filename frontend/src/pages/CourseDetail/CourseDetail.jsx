import React, { useContext, useEffect, useState } from 'react';
import './CourseDetail.css';
import dogimage from '../../images/golden.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import VersionCard from '../../components/VersionCard/VersionCard';
import AuthContext from '../../contexts/auth-context';
import { IoMdCreate } from 'react-icons/io';

export default function CourseDetail() {
  const { id } = useParams();
  const authCtx = useContext(AuthContext);

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

  useEffect(() => {
    axios.get('http://localhost:7000/api/v1/syllabus/course/' + id).then((res) => {
      let courseData = res.data.data;
      console.log(courseData);
      // setPetBreed(petdata.Pet.breed);
      // setPetName(petdata.Product.name);
      // setPetDescription(petdata.Product.description);
      // setPetHeight(petdata.Pet.height);
      // setPetWeight(petdata.Pet.weight);
      // setPetImage(petdata.Product.image_url);
      // setPetCharacter(petdata.Pet.characteristic);
      // setPetOrigin(petdata.Pet.origin);
      // setPetAge(petdata.Pet.age);
      // setPetPrice(petdata.Pet.price);
      // setPetGender(petdata.Pet.gender);
      setCourseHistory(courseData);
      setCourse(courseData.course);
      setSyllabusList(courseData.syllabuses);
    });
  }, []);

  return (
    <div className="main-course-info">
      <div className="course-info">
        <div>
          <p>Tên môn học (tiếng Việt): {course.courseNameVN}</p>
          <p>Tên môn học (tiếng Anh): {course.courseNameEN}</p>
          <p>Mã môn học: {course.code}</p>
          <p>Khối kiến thức: {course.type}</p>
          <p>Khoa: {course.department.name}</p>
          <p>
            Số tín chỉ:
            {course.numberOfPracticeCredits + course.numberOfSelfLearnCredits + course.numberOfTheoryCredits}
          </p>
          <p>Lý thuyết: {course.numberOfTheoryCredits}</p>
          <p>Thực hành: {course.numberOfPracticeCredits}</p>
          <p>Tự học: {course.numberOfSelfLearnCredits}</p>
          <p>
            Môn học trước:{' '}
            {course.preCourse.length > 0
              ? course.preCourse
                  .map((course, index) => {
                    return course.code;
                  })
                  .join(', ')
              : null}
          </p>
          <p>
            Môn học tiên quyết:
            {course.prerequisiteCourse.length > 0
              ? course.prerequisiteCourse
                  .map((course, index) => {
                    return course.code;
                  })
                  .join(', ')
              : null}
          </p>
        </div>
        <div className="course-info-edit">
          {' '}
          <Link to={'/edit/course/' + course._id}>
            <button className="btn-info-edit">
              <IoMdCreate />
              Edit info
            </button>
          </Link>{' '}
        </div>
      </div>

      <div className="wrapper">
        <div className="scrollmenu">
          {syllabusList.map((syllabusItem, index) => {
            return (
              <div className="scrollitem" key={index}>
                <VersionCard
                  syllabus={syllabusItem}
                  course={course}
                  isAdmin={authCtx.role === 'admin' ? true : false}
                />
              </div>
            );
          })}
        </div>
      </div>
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
  );
}
