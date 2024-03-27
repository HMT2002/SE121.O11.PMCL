import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';
import { toast } from 'sonner';
import SyllabusAPI from '../../APIs/SyllabusAPI';
import AuthContext from '../../contexts/auth-context';
import './SyllabusInput.css';
const OUT_COME_KEY = 'courseOutcomes';
const ASSESSMENT_KEY = 'courseAssessments';
const SCHEDULE_KEY = 'courseSchedules';

const randomId = () => Math.floor(Math.random() * 10000);

const generateProgramOutCome = (parentId) => ({
  id: randomId(),
  programOutcome: '',
  outcomeLevel: '',
  outcomeAssessment: '',
  assessmentLevel: '',
  description: '',
  parentId,
});

const generateOutcomes = () => {
  const id = randomId();

  return {
    id,
    courseGoal: {
      code: '',
      description: '',
      programOutcomes: [generateProgramOutCome(id)],
    },
    level: 0,
    description: '',
    levelOfTeaching: '',
  };
};

const generateRubric = () => ({
  id: randomId(),
  courseOutcome: [generateOutcomes()],
});

const generateAssessElement = () => ({
  id: randomId(),
  description: '',
  label: '',
});

const generateSchedules = () => {
  const scheduleId = randomId();

  return {
    id: scheduleId,
    class: '',
    description: '',
    // courseOutcomes: [generateOutcomes()],
    courseOutcomes: [],

    activities: '',
    // courseAssessElements: [generateAssessElement()],
    courseAssessElements: [],
  };
};

const generateDetail = () => ({
  id: randomId(),
  level: '0',
  requirements: {
    academicPerformance: '',
    minScore: '0',
    maxScore: '0',
    requirement: '',
  },
});

const generateAssessments = () => {
  const assessmentId = randomId();

  return {
    id: assessmentId,
    assessElement: {
      description: '',
      label: '',
    },
    assessLevel: '0',
    description: '',
    courseOutcomes: [generateOutcomes()],
    percentage: '0',
    rubrics: [generateRubric()],
    details: [generateDetail()],
  };
};

function ShowScheduleCourse({
  onAddSchedule,
  onChangeValueSchedule,
  data,
  onAddOutCome,
  onDeleteOutcome,
  onAddCourseAssessElement,

  onDeleteSchedule,
  onDeleteAssessElement,
  onDeleteAssess,
  onAddCourseAssess,
}) {
  const [courseOutcomes, setCourseOutcomes] = useState([]);
  const [selectCourseOutcome, setSelectCourseOutcome] = useState(null);
  const [courseAssesses, setCourseAssesses] = useState([]);
  const [allCourseAssesses, setAllCourseAssesses] = useState([]);
  const [selectCourseAssess, setSelectCourseAssess] = useState(null);
  const [selectCourseAssessElement, setSelectCourseAssessElement] = useState(null);
  const [selectCourseAssessPercentage, setSelectCourseAssessPercentage] = useState(0);

  const Init = async () => {
    const { data: courseOutcomeResponse } = await axios.get('/api/v1/outcome/', {
      validateStatus: () => true,
    });
    console.log(courseOutcomeResponse);
    setCourseOutcomes((prevState) => {
      return courseOutcomeResponse.data;
    });
    setSelectCourseOutcome((prevState) => {
      return courseOutcomeResponse.data[0];
    });
    const { data: allCourseAssesses } = await axios.get('/api/v1/courseassesselement/', {
      validateStatus: () => true,
    });
    console.log(allCourseAssesses);

    // setCourseAssesses((prevState) => {
    //   return courseAssesses.data;
    // });
    // setSelectCourseAssessElement((prevState) => {
    //   return courseAssesses.data[0];
    // });

    setAllCourseAssesses((prevState) => {
      return allCourseAssesses.data;
    });
    setSelectCourseAssess((prevState) => {
      return allCourseAssesses.data[0];
    });
  };
  useEffect(() => {
    Init();
  }, []);

  return (
    <div className="border mt-2 radius-1">
      <div className="flex align-center gap-3">
        <h3 className="text-blue">Form Schedules</h3>
        <div>
          <button type="button" className="small text-blue" onClick={onAddSchedule}>
            <AddIcon />
          </button>
        </div>
      </div>

      <div className="flex gap-3 align-center w-30">
        {allCourseAssesses.length > 0 ? (
          <select
            className="form-control"
            onChange={(e) => {
              console.log(e);
              const index = e.target.value * 1;
              console.log(allCourseAssesses[index]);
              setSelectCourseAssess(allCourseAssesses[index]);
            }}
          >
            {allCourseAssesses?.map((courseAssess, index) => (
              <option value={index} key={index}>
                {courseAssess?.label}
              </option>
            ))}
          </select>
        ) : null}{' '}
        <input
          type="text"
          name="percentage"
          className="form-control"
          id=""
          value={selectCourseAssessPercentage}
          onChange={(e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value * 1;
            console.log(value);
            setSelectCourseAssessPercentage((prevState) => value);
          }}
        />
        <button
          type="button"
          className="small"
          onClick={(e) => {
            onAddCourseAssess(selectCourseAssessPercentage, selectCourseAssess);
            setCourseAssesses((prevState) => [...prevState, selectCourseAssess]);
            setSelectCourseAssess((prevState) => null);
            setSelectCourseAssessPercentage((prevState) => 0);
          }}
        >
          <AddIcon />
        </button>
      </div>

      <div className="flex gap-3 flex-wrap mt-2">
        {data.map((item, index) => (
          <div className=" border p-2 radius-1 border-blue" key={index}>
            <div className="flex gap-3 align-center">
              <h3 className="text-blue">Mục {index + 1}</h3>
              {index === 0 ? null : (
                <div>
                  <button type="button" className="text-blue" onClick={() => onDeleteSchedule(item.id)}>
                    <RemoveIcon />
                  </button>
                </div>
              )}
            </div>

            <div className="mt-2 radius-1 ">
              <div className="gap-3 border-bottom pb-2">
                <div className="input-group">
                  <div class="col">
                    <label for="first-name">Class</label>
                    <input
                      type="text"
                      name="class"
                      value={item?.class}
                      onChange={(e) => onChangeValueSchedule(e, item?.id)}
                      className="form-control"
                    />
                  </div>
                  <div class="col">
                    <label for="first-name">Activities</label>
                    <input
                      type="text"
                      name="activities"
                      id=""
                      value={item?.activities}
                      onChange={(e) => onChangeValueSchedule(e, item?.id)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div>
                  <p className="reset">Mô tả môn học:</p>

                  <div className="textarea-wrapper">
                    <textarea
                      type="text"
                      name="description"
                      id=""
                      value={item?.description}
                      onChange={(e) => onChangeValueSchedule(e, item?.id)}
                    ></textarea>
                  </div>
                </div>
              </div>

              <div className="flex align-center gap-3 ">
                <p>Yêu cầu đầu ra: </p>
                <div className="flex align-center justify-between gap-3 flex-2">
                  <div className="flex flex-2 align-center gap-3">
                    <p className="reset">Chọn mức yêu cầu đầu ra</p>
                    <div className="w-30">
                      {courseOutcomes.length > 0 ? (
                        <select
                          className="form-control"
                          onChange={(e) => {
                            const index = e.target.value * 1;
                            // console.log(courseOutcomes[index]);
                            setSelectCourseOutcome(courseOutcomes[index]);
                          }}
                        >
                          {courseOutcomes.map((courseOutcome, index) => (
                            <option value={index} key={index}>
                              {courseOutcome.id}
                            </option>
                          ))}
                        </select>
                      ) : null}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="small"
                    onClick={() => {
                      onAddOutCome(selectCourseOutcome, index);
                      setSelectCourseOutcome((prevState) => null);
                    }}
                  >
                    <AddIcon />
                  </button>
                </div>
              </div>

              <div className="w-full">
                {item?.courseOutcomes.map((courseOutcome, idxDetail) => (
                  <div className=" border p-2 mt-2 radius-1 border-yellow" key={idxDetail}>
                    <div className="w-full flex gap-3 align-center">
                      <h3 className="text-yellow">Yêu cầu đầu ra {courseOutcome.id}</h3>
                      <div>
                        <button
                          type="button"
                          className="text-red small"
                          onClick={() => {
                            console.log('click delete');
                            onDeleteOutcome(index, courseOutcome);
                          }}
                        >
                          <RemoveIcon />
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      Mô tả <div>{courseOutcome.description}</div>
                      Label <div>{courseOutcome.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex align-center gap-3 justify-between">
                <p>Thành phần đánh giá</p>
                <div className="flex align-center justify-between gap-3 flex-2">
                  <div className="flex flex-2 gap-3 align-center">
                    <p className="reset">Chọn thành phần đánh giá</p>

                    <div className="w-30">
                      {courseAssesses.length > 0 ? (
                        <select
                          className="form-control"
                          onChange={(e) => {
                            console.log(e.target.value);
                            const index = e.target.value * 1;
                            console.log(courseAssesses[index]);
                            setSelectCourseAssessElement(courseAssesses[index]);
                          }}
                        >
                          {courseAssesses.map((courseAssess, index) => (
                            <option value={index} key={index}>
                              {courseAssess?.label}
                            </option>
                          ))}
                        </select>
                      ) : null}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="small"
                    onClick={(e) => {
                      onAddCourseAssessElement(index, selectCourseAssessElement);
                      setSelectCourseAssessElement((prevState) => null);
                    }}
                  >
                    <AddIcon />
                  </button>
                </div>
              </div>

              <div className="w-full">
                {item?.courseAssessElements.map((courseAssessElement, idxDetail) => (
                  <div className=" border p-2 mt-2 radius-1 border-yellow" key={idxDetail}>
                    <div className="w-full flex gap-3 align-center">
                      <h3 className="text-yellow">Thành phần đánh giá {courseAssessElement.label}</h3>
                      <div>
                        <button
                          type="button"
                          className="text-red small"
                          onClick={() => onDeleteAssessElement(index, courseAssessElement)}
                        >
                          <RemoveIcon />
                        </button>
                      </div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      Mô tả <div>{courseAssessElement.description}</div>
                      Label <div>{courseAssessElement.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ShowData({
  onAddSchedule,
  onChangeValueSchedule,
  data,
  onAddOutCome,
  onDeleteOutcome,
  onAddCourseAssessElement,
  onDeleteSchedule,
  onDeleteAssessElement,
  onDeleteAssess,
  onAddCourseAssess,
}) {
  if (!data) return null;

  return (
    <div>
      {data?.hasOwnProperty(SCHEDULE_KEY) ? (
        <ShowScheduleCourse
          data={data[SCHEDULE_KEY]}
          onAddSchedule={onAddSchedule}
          onAddOutCome={onAddOutCome}
          onDeleteOutcome={onDeleteOutcome}
          onAddCourseAssessElement={onAddCourseAssessElement}
          onChangeValueSchedule={onChangeValueSchedule}
          onDeleteSchedule={onDeleteSchedule}
          onDeleteAssessElement={onDeleteAssessElement}
          onDeleteAssess={onDeleteAssess}
          onAddCourseAssess={onAddCourseAssess}
        />
      ) : null}
    </div>
  );
}

function ChoseOptions({ onSelected, selectedOption }) {
  return (
    <>
      <div className="flex gap-3">
        <button
          type="button"
          className={selectedOption && selectedOption[SCHEDULE_KEY] ? `active` : ``}
          onClick={() => onSelected(SCHEDULE_KEY)}
        >
          Nội dung môn học
        </button>
      </div>
    </>
  );
}

function SyllabusInput(props) {
  const [start, setStart] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checkarrOutcome, setCheckarrOutcome] = useState(0);
  const { courseId } = useParams();
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    if (props.cloneSyllabusData !== undefined) {
      setSelectedOption((prevState) => {
        return props.cloneSyllabusData;
      });
    }
  }, [props.cloneSyllabusData]);

  const handleSetSelected = (key, data) => {
    setSelectedOption((prev) => {
      const clone = { ...prev };

      if (!clone || !clone?.hasOwnProperty(key)) {
        console.log({ ...clone, [key]: data });
        return { ...clone, [key]: data };
      }

      delete clone[key];
      return clone;
    });
  };

  const handleChoseOptions = (option) => {
    const data = [generateSchedules()];

    handleSetSelected(SCHEDULE_KEY, data);
    handleSetSelected(ASSESSMENT_KEY, []);
    handleSetSelected(OUT_COME_KEY, []);
  };

  const handleAddOutCome = (newOutcome, index) => {
    if (!newOutcome) {
      return;
    }
    console.log(selectedOption);
    console.log(selectedOption.courseOutcomes);
    let newOutcomeArr = selectedOption.courseSchedules[index].courseOutcomes || [];
    let newmainoutcomeArr = selectedOption.courseOutcomes || [];
    if (selectedOption.courseSchedules[index].courseOutcomes) {
      if (
        selectedOption.courseSchedules[index].courseOutcomes.find((courseOutcome) => {
          return courseOutcome.id === newOutcome.id;
        }) === undefined
      ) {
        newOutcomeArr = [...newOutcomeArr, newOutcome];
        setCheckarrOutcome((prevState) => prevState++);
        if (
          newmainoutcomeArr.find((courseoutcome) => {
            return courseoutcome.id === newOutcome.id;
          }) === undefined
        ) {
          newmainoutcomeArr = [...newmainoutcomeArr, newOutcome];
        }
      }
    } else {
    }
    let newCourseSchedulesArr = [...selectedOption.courseSchedules];
    newCourseSchedulesArr[index].courseOutcomes = newOutcomeArr;
    console.log(newOutcome);

    setSelectedOption((prev) => ({
      ...prev,
      courseSchedules: newCourseSchedulesArr,
      courseOutcomes: newmainoutcomeArr,
    }));
    console.log(selectedOption);
  };
  const handleDeleteOutcome = (index, courseOutcome) => {
    console.log({ index, courseOutcome });
    if (!courseOutcome) {
      return;
    }
    console.log('Delete outcome');
    let newOutcomeArr = [];
    let newoutcomeArr = selectedOption.courseOutcomes;
    if (!selectedOption.courseSchedules[index].courseOutcomes) {
    } else {
      newOutcomeArr = [
        ...selectedOption.courseSchedules[index].courseOutcomes.filter((t) => t.id !== courseOutcome.id),
      ];
      setCheckarrOutcome((prevState) => prevState--);
      if (checkarrOutcome <= 0) {
        newoutcomeArr = newoutcomeArr.filter((outcome) => outcome.id !== courseOutcome.id);
      }
    }
    let newCourseSchedulesArr = [...selectedOption.courseSchedules];
    newCourseSchedulesArr[index].courseOutcomes = newOutcomeArr;

    setSelectedOption((prev) => ({ ...prev, courseSchedules: newCourseSchedulesArr, courseOutcomes: newoutcomeArr }));
    console.log(selectedOption);
  };
  const handleOnAddSchedule = () => {
    if (!selectedOption?.[SCHEDULE_KEY]?.length) return;

    const cloneData = [...selectedOption[SCHEDULE_KEY]];

    const data = generateSchedules();
    cloneData.push(data);

    setSelectedOption((prev) => ({ ...prev, [SCHEDULE_KEY]: cloneData }));
  };

  const handleOnDeleteSchedule = (scheduleId) => {
    if (!selectedOption?.[SCHEDULE_KEY]?.length) return;

    let cloneData = [...selectedOption[SCHEDULE_KEY]];

    const data = generateSchedules();

    cloneData = [...cloneData.filter((t) => t.id !== scheduleId)];

    setSelectedOption((prev) => ({ ...prev, [SCHEDULE_KEY]: cloneData }));
  };

  const handleOnAddCourseAssessElement = (index, newAssess) => {
    console.log({ index, newAssess });

    if (!newAssess) {
      return;
    }
    console.log(selectedOption);
    let newAssessArr = selectedOption.courseSchedules[index].courseAssessElements || [];
    let newcourseassessElements = selectedOption.courseAssessments || [];
    if (selectedOption.courseSchedules[index].courseAssessElements) {
      if (
        selectedOption.courseSchedules[index].courseAssessElements.find((courseAssess) => {
          return courseAssess.label === newAssess.label;
        }) === undefined
      ) {
        newAssessArr = [...newAssessArr, newAssess];
      }
    } else {
    }
    let newCourseSchedulesArr = [...selectedOption.courseSchedules];
    newCourseSchedulesArr[index].courseAssessElements = newAssessArr;
    console.log(newAssess);

    setSelectedOption((prev) => ({
      ...prev,
      courseSchedules: newCourseSchedulesArr,
      // courseAssessments: newcourseassessElements,
    }));
    console.log(selectedOption);
  };

  const handleOnDeleteAssessElement = (index, courseAssess) => {
    console.log({ index, courseAssess });
    if (!courseAssess) {
      return;
    }
    console.log('Delete assess');
    let newAssessArr = selectedOption.courseSchedules[index].courseAssessElements || [];
    let newcourseAssessArr = selectedOption.courseAssessments;
    if (!selectedOption.courseSchedules[index].courseAssessElements) {
    } else {
      newAssessArr = [...newAssessArr.filter((t) => t.label !== courseAssess.label)];
    }
    let newCourseSchedulesArr = [...selectedOption.courseSchedules];
    newCourseSchedulesArr[index].courseAssessElements = newAssessArr;

    setSelectedOption((prev) => ({
      ...prev,
      courseSchedules: newCourseSchedulesArr,
      // courseAssessments: newcourseAssessArr,
    }));
    console.log(selectedOption);
  };

  const handleOnAddCourseAssess = (percentage, newAssess) => {
    console.log({ percentage, newAssess });

    if (!newAssess) {
      return;
    }
    console.log(selectedOption);
    let newcourseassess = selectedOption.courseAssessments || [];
    if (selectedOption.courseAssessments) {
      if (
        newcourseassess.find((courseAssess) => {
          return courseAssess.courseAssessment.label === newAssess.label;
        }) === undefined
      ) {
        newcourseassess = [...newcourseassess, { courseAssessment: newAssess, percentage }];
      }
    } else {
    }
    console.log(newAssess);

    setSelectedOption((prev) => ({
      ...prev,
      courseAssessments: newcourseassess,
    }));
    console.log(selectedOption);
  };

  const handleOnDeleteAssess = (index, courseAssess) => {
    console.log({ index, courseAssess });
    if (!courseAssess) {
      return;
    }
    console.log('Delete assess');
    let newcourseAssessArr = selectedOption.courseAssessments;
    if (!newcourseAssessArr) {
    } else {
      newcourseAssessArr = newcourseAssessArr.filter((t) => t.label !== courseAssess.label);
    }
    setSelectedOption((prev) => ({
      ...prev,
      courseAssessments: newcourseAssessArr,
    }));
    console.log(selectedOption);
  };

  const handleOnChangeValueSchedule = (event, scheduleId) => {
    const {
      target: { value, name },
    } = event;

    if (!scheduleId || !selectedOption?.[SCHEDULE_KEY]?.length) return;

    const cloneData = [...selectedOption[SCHEDULE_KEY]];

    const index = cloneData.findIndex((t) => t.id === scheduleId);

    if (index === -1) return;

    cloneData[index][name] = value;

    setSelectedOption((prev) => ({ ...prev, [SCHEDULE_KEY]: cloneData }));
  };

  const handleSubmit = async () => {
    try {
      console.log(selectedOption);
      selectedOption.course = courseId;
      console.log(courseId);
      console.log(selectedOption);
      const response = await SyllabusAPI.POST_CreateNewSyllabus(authCtx.token, selectedOption);

      console.log(response);
      if (response.status === 200) {
        toast.success('Tạo mới đề cương thành công', {
          duration: 2000,
        });
      } else {
        toast.error('Lỗi không thể tạo mới đề cương', {
          duration: 2000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error('Lỗi không thể tạo mới đề cương', {
        duration: 2000,
      });
    }
  };

  return (
    <div className="main__syllabus">
      {start ? <ChoseOptions onSelected={handleChoseOptions} selectedOption={selectedOption} /> : null}

      <div>
        {selectedOption ? (
          <ShowData
            onAddOutCome={handleAddOutCome}
            onDeleteOutcome={handleDeleteOutcome}
            data={selectedOption}
            onAddSchedule={handleOnAddSchedule}
            onAddCourseAssessElement={handleOnAddCourseAssessElement}
            onChangeValueSchedule={handleOnChangeValueSchedule}
            onDeleteSchedule={handleOnDeleteSchedule}
            onDeleteAssessElement={handleOnDeleteAssessElement}
            onDeleteAssess={handleOnDeleteAssess}
            onAddCourseAssess={handleOnAddCourseAssess}
          />
        ) : null}
      </div>

      {start && selectedOption && Object.keys(selectedOption).length ? (
        <button type="button" className="mt-2 btn-success" onClick={handleSubmit}>
          Hoàn thành
        </button>
      ) : null}
    </div>
  );
}

export default SyllabusInput;