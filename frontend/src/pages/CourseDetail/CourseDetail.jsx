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
    <React.Fragment>
      <Toaster />
      <div className="main-course-info">
        <div className="course-info">
          <Table>
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
          </Table>
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
                <td colSpan={6}>Chưa có thông tin</td>
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
