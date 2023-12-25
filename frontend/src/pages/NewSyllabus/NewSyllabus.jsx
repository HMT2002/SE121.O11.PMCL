import React, { useState, useRef, useContext, useEffect } from 'react';
import './NewSyllabus.css';
import axios from 'axios';
import AuthContext from '../../contexts/auth-context';

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

  const authCtx = useContext(AuthContext);

  const url = 'http://localhost:7000/v1/pet/add';

  const handleSubmit = async (event) => {
    event.preventDefault();

    // const formD = new FormData();
    // formD.append('height', pet.petHeight);
    // formD.append('weight', pet.petWeight);
    // formD.append('origin', pet.petOrigin);
    // formD.append('characteristic', pet.petCharacter);
    // formD.append('breed', pet.petBreed);
    // formD.append('aboutBreed', pet.petDescription);
    // formD.append('description', pet.petDescription);
    // formD.append('product_type', 'Pet');
    // formD.append('price', pet.petPrice);
    // formD.append('name', pet.petName);
    // formD.append('gender', pet.petGender);
    // formD.append('age', pet.petAge);
    // formD.append('color_id', '648c44711bd8c3e10049c93e');
    // formD.append('image_url', img);
    // axios.post(url, formD).then(
    //   (response) => {
    //     alert('Thêm thành công');
    //     window.location.href = 'http://localhost:3000/petpage';
    //     console.log(response);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );

    const formData = axios.toFormData({
      course: '6565967b27ed5431b0294c13',
      courseOutcomes: [
        {
          courseGoal: {
            description: '',
            programOutcomes: [
              {
                programOutcome: '',
                outcomeLevel: '',
                outcomeAssessment: '',
                assessmentLevel: '',
                description: '',
              },
            ],
          },
          level: 0,
          description: 'nothing new other syllabus',
          levelOfTeaching: '',
        },
        {
          courseGoal: {
            description: '',
            programOutcomes: [
              {
                programOutcome: '',
                outcomeLevel: '',
                outcomeAssessment: '',
                assessmentLevel: '',
                description: '',
              },
            ],
          },
          level: 2,
          description: 'nothing new 2 other syllabus',
          levelOfTeaching: '',
        },
      ],
      courseAssessments: [
        {
          assessElement: {
            description: ' Quá trình (Kiểm tra trên lớp, bài tập) ',
            label: 'A1',
          },
          assessLevel: '0',
          description: '',
          courseOutcomes: [
            {
              courseGoal: {
                description: '',
                programOutcomes: [
                  {
                    programOutcome: '',
                    outcomeLevel: '',
                    outcomeAssessment: '',
                    assessmentLevel: '',
                    description: '',
                  },
                ],
              },
              level: 0,
              description: 'nothing new other syllabus',
              levelOfTeaching: '',
            },
          ],
          percentage: '30',
          rubrics: [
            {
              courseOutcome: [
                {
                  courseGoal: {
                    description: '',
                    programOutcomes: [
                      {
                        programOutcome: '',
                        outcomeLevel: '',
                        outcomeAssessment: '',
                        assessmentLevel: '',
                        description: '',
                      },
                    ],
                  },
                  level: 0,
                  description: 'nothing new other syllabus',
                  levelOfTeaching: '',
                },
              ],
            },
          ],
          details: [
            {
              level: '1',
              requirements: {
                academicPerformance: 'Trung bình',
                minScore: '0',
                maxScore: '10',
                requirement: '',
              },
            },
          ],
        },
        {
          assessElement: {
            description: ' Báo cáo cuối kỳ ',
            label: 'A3',
          },
          assessLevel: '0',
          description: '',
          courseOutcomes: [
            {
              courseGoal: {
                description: '',
                programOutcomes: [
                  {
                    programOutcome: '',
                    outcomeLevel: '',
                    outcomeAssessment: '',
                    assessmentLevel: '',
                    description: '',
                  },
                ],
              },
              level: 0,
              description: 'nothing new other syllabus',
              levelOfTeaching: '',
            },
          ],
          percentage: '50',
          rubrics: [
            {
              courseOutcome: [
                {
                  courseGoal: {
                    description: '',
                    programOutcomes: [
                      {
                        programOutcome: '',
                        outcomeLevel: '',
                        outcomeAssessment: '',
                        assessmentLevel: '',
                        description: '',
                      },
                    ],
                  },
                  level: 0,
                  description: 'nothing new other syllabus',
                  levelOfTeaching: '',
                },
              ],
            },
          ],
          details: [
            {
              level: '1',
              requirements: {
                academicPerformance: 'Trung bình',
                minScore: '0',
                maxScore: '10',
                requirement: '',
              },
            },
          ],
        },
        {
          assessElement: {
            description: ' Serminar',
            label: 'A2',
          },
          assessLevel: '0',
          description: '',
          courseOutcomes: [
            {
              courseGoal: {
                description: '',
                programOutcomes: [
                  {
                    programOutcome: '',
                    outcomeLevel: '',
                    outcomeAssessment: '',
                    assessmentLevel: '',
                    description: '',
                  },
                ],
              },
              level: 0,
              description: 'nothing new other syllabus',
              levelOfTeaching: '',
            },
          ],
          percentage: '20',
          rubrics: [
            {
              courseOutcome: [
                {
                  courseGoal: {
                    description: '',
                    programOutcomes: [
                      {
                        programOutcome: '',
                        outcomeLevel: '',
                        outcomeAssessment: '',
                        assessmentLevel: '',
                        description: '',
                      },
                    ],
                  },
                  level: 0,
                  description: 'nothing new other syllabus',
                  levelOfTeaching: '',
                },
              ],
            },
          ],
          details: [
            {
              level: '1',
              requirements: {
                academicPerformance: 'Trung bình',
                minScore: '0',
                maxScore: '10',
                requirement: '',
              },
            },
          ],
        },
      ],
      courseSchedules: [
        {
          class: '',
          description: '',
          courseOutcomes: [
            {
              courseGoal: {
                description: '',
                programOutcomes: [
                  {
                    programOutcome: '',
                    outcomeLevel: '',
                    outcomeAssessment: '',
                    assessmentLevel: '',
                    description: '',
                  },
                ],
              },
              level: 0,
              description: 'nothing new other syllabus',
              levelOfTeaching: '',
            },
          ],
          activities: '',
          courseAssessElements: [
            {
              description: '',
              label: '',
            },
          ],
        },
      ],
    });
    const url = 'http://localhost:7000/api/v1/syllabus/';
    const { data } = await axios.post(url, formData, {
      validateStatus: () => true,
    });
    console.log(data);
  };
  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = axios.toFormData({
      courseOutcomes: [
        {
          courseGoal: {
            description: '',
            programOutcomes: [
              {
                programOutcome: '',
                outcomeLevel: '',
                outcomeAssessment: '',
                assessmentLevel: '',
                description: '',
              },
            ],
          },
          level: 0,
          description: 'nothing new other syllabus',
          levelOfTeaching: '',
        },
        {
          courseGoal: {
            description: '',
            programOutcomes: [
              {
                programOutcome: '',
                outcomeLevel: '',
                outcomeAssessment: '',
                assessmentLevel: '',
                description: '',
              },
            ],
          },
          level: 2,
          description: 'nothing new 2 other syllabus',
          levelOfTeaching: '',
        },
      ],
      courseAssessments: [
        {
          assessElement: {
            description: ' Quá trình (Kiểm tra trên lớp, bài tập) ',
            label: 'A1',
          },
          assessLevel: '0',
          description: '',
          courseOutcomes: [
            {
              courseGoal: {
                description: '',
                programOutcomes: [
                  {
                    programOutcome: '',
                    outcomeLevel: '',
                    outcomeAssessment: '',
                    assessmentLevel: '',
                    description: '',
                  },
                ],
              },
              level: 0,
              description: 'nothing new other syllabus',
              levelOfTeaching: '',
            },
          ],
          percentage: '30',
          rubrics: [
            {
              courseOutcome: [
                {
                  courseGoal: {
                    description: '',
                    programOutcomes: [
                      {
                        programOutcome: '',
                        outcomeLevel: '',
                        outcomeAssessment: '',
                        assessmentLevel: '',
                        description: '',
                      },
                    ],
                  },
                  level: 0,
                  description: 'nothing new other syllabus',
                  levelOfTeaching: '',
                },
              ],
            },
          ],
          details: [
            {
              level: '1',
              requirements: {
                academicPerformance: 'Trung bình',
                minScore: '0',
                maxScore: '10',
                requirement: '',
              },
            },
          ],
        },
        {
          assessElement: {
            description: ' Báo cáo cuối kỳ ',
            label: 'A3',
          },
          assessLevel: '0',
          description: '',
          courseOutcomes: [
            {
              courseGoal: {
                description: '',
                programOutcomes: [
                  {
                    programOutcome: '',
                    outcomeLevel: '',
                    outcomeAssessment: '',
                    assessmentLevel: '',
                    description: '',
                  },
                ],
              },
              level: 0,
              description: 'nothing new other syllabus',
              levelOfTeaching: '',
            },
          ],
          percentage: '50',
          rubrics: [
            {
              courseOutcome: [
                {
                  courseGoal: {
                    description: '',
                    programOutcomes: [
                      {
                        programOutcome: '',
                        outcomeLevel: '',
                        outcomeAssessment: '',
                        assessmentLevel: '',
                        description: '',
                      },
                    ],
                  },
                  level: 0,
                  description: 'nothing new other syllabus',
                  levelOfTeaching: '',
                },
              ],
            },
          ],
          details: [
            {
              level: '1',
              requirements: {
                academicPerformance: 'Trung bình',
                minScore: '0',
                maxScore: '10',
                requirement: '',
              },
            },
          ],
        },
        {
          assessElement: {
            description: ' Serminar',
            label: 'A2',
          },
          assessLevel: '0',
          description: '',
          courseOutcomes: [
            {
              courseGoal: {
                description: '',
                programOutcomes: [
                  {
                    programOutcome: '',
                    outcomeLevel: '',
                    outcomeAssessment: '',
                    assessmentLevel: '',
                    description: '',
                  },
                ],
              },
              level: 0,
              description: 'nothing new other syllabus',
              levelOfTeaching: '',
            },
          ],
          percentage: '20',
          rubrics: [
            {
              courseOutcome: [
                {
                  courseGoal: {
                    description: '',
                    programOutcomes: [
                      {
                        programOutcome: '',
                        outcomeLevel: '',
                        outcomeAssessment: '',
                        assessmentLevel: '',
                        description: '',
                      },
                    ],
                  },
                  level: 0,
                  description: 'nothing new other syllabus',
                  levelOfTeaching: '',
                },
              ],
            },
          ],
          details: [
            {
              level: '1',
              requirements: {
                academicPerformance: 'Trung bình',
                minScore: '0',
                maxScore: '10',
                requirement: '',
              },
            },
          ],
        },
      ],
      courseSchedules: [
        {
          class: '',
          description: '',
          courseOutcomes: [
            {
              courseGoal: {
                description: '',
                programOutcomes: [
                  {
                    programOutcome: '',
                    outcomeLevel: '',
                    outcomeAssessment: '',
                    assessmentLevel: '',
                    description: '',
                  },
                ],
              },
              level: 0,
              description: 'nothing new other syllabus',
              levelOfTeaching: '',
            },
          ],
          activities: '',
          courseAssessElements: [
            {
              description: '',
              label: '',
            },
          ],
        },
      ],
    });
    const url = 'http://localhost:7000/api/v1/syllabus/course/6565967b27ed5431b0294c13';
    const { data } = await axios.patch(url, formData, {
      validateStatus: () => true,
      headers: {
        authorization: authCtx.token,
      },
    });
    console.log(data);
  };

  const onSyllabusCourseChangeHandler = async (event) => {
    console.log(event.target.value);
    setSyllabusCourseID(event.target.value);
    const { data: syllabusData } = await axios.get(
      'http://localhost:7000/api/v1/syllabus/course/' + event.target.value,
      {
        validateStatus: () => true,
      }
    );
    console.log(syllabusData);
    return;
    setCourse(syllabusData.course);
    setDepartment(syllabusData.course.department);
    setCourseAssesments(syllabusData.courseAssessments);
    setCourseOutcomes(syllabusData.courseOutcomes);
    setCourseSchedules(syllabusData.courseSchedules);
  };

  const Init = async () => {
    const { data } = await axios.get('/api/v1/course');
    console.log(data);
    setCourses(data.data);
    setCourse(data.data[0]);
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
    <div id="addpet-section">
      <form>
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
            </div>{' '}
          </div>
        </div>
        <div className="form-footer">
          <button className="form-add-btn" onClick={handleSubmit}>
            Tạo mới đề cương
          </button>
          <button className="form-add-btn" onClick={handleUpdate}>
            Cập nhật đề cương
          </button>
        </div>
        <div></div>
      </form>
    </div>
  );
}

export default NewSyllabus;
