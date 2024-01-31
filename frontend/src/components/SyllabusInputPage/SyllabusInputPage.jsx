import { useEffect, useState } from 'react';
import axios from 'axios';
import './SyllabusInputPage.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
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
  onDeleteAsset,
}) {
  const [courseOutcomes, setCourseOutcomes] = useState([]);
  const [selectCourseOutcome, setSelectCourseOutcome] = useState(null);
  const [courseAssesses, setCourseAssesses] = useState([]);
  const [selectCourseAssess, setSelectCourseAssess] = useState(null);
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
    const { data: courseAssesses } = await axios.get('/api/v1/courseassesselement/', {
      validateStatus: () => true,
    });
    console.log(courseAssesses);
    setCourseAssesses((prevState) => {
      return courseAssesses.data;
    });
    setSelectCourseAssess((prevState) => {
      return courseAssesses.data[0];
    });
  };
  useEffect(() => {
    Init();
  }, []);

  return (
    <div className="border mt-2 p-2 radius-1">
      <div className="flex align-center gap-3">
        <h3 className="text-blue">Form Schedules</h3>
        <div>
          <button type="button" className="small text-blue" onClick={onAddSchedule}>
            <AddIcon />
          </button>
        </div>
      </div>

      {data.map((item, index) => (
        <div className="mt-2 border p-2 radius-1 border-blue" key={index}>
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
            <div className="flex gap-3 border-bottom pb-2">
              Class{' '}
              <input
                type="text"
                name="class"
                id=""
                value={item.class}
                onChange={(e) => onChangeValueSchedule(e, item.id)}
              />
              Mô tả{' '}
              <input
                type="text"
                name="description"
                id=""
                value={item.description}
                onChange={(e) => onChangeValueSchedule(e, item.id)}
              />
              Activities{' '}
              <input
                type="text"
                name="activities"
                id=""
                value={item.activities}
                onChange={(e) => onChangeValueSchedule(e, item.id)}
              />
            </div>
            <div className="flex align-center gap-3">
              <p>Yêu cầu đầu ra</p>
              <div>
                Chọn mức yêu cầu đầu ra
                {courseOutcomes.length > 0 ? (
                  <select
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
              {item.courseOutcomes.map((courseOutcome, idxDetail) => (
                <div className=" border p-2 mt-2 radius-1 border-yellow" key={idxDetail}>
                  <div className="w-full flex gap-3 align-center">
                    <h3 className="text-yellow">Yêu cầu đầu ra {idxDetail + 1}</h3>

                    {idxDetail === 0 ? null : (
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
                    )}
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    Mô tả <div>{courseOutcome.description}</div>
                    Label <div>{courseOutcome.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex align-center gap-3">
              <p>Thành phần đánh giá</p>
              <div>
                Chọn thành phần đánh giá
                {courseAssesses.length > 0 ? (
                  <select
                    onChange={(e) => {
                      console.log(e);
                      const index = e.target.value * 1;
                      console.log(courseAssesses[index]);
                      setSelectCourseAssess(courseAssesses[index]);
                    }}
                  >
                    {courseAssesses.map((courseAssess, index) => (
                      <option value={index} key={index}>
                        {courseAssess.label}
                      </option>
                    ))}
                  </select>
                ) : null}
                <button
                  type="button"
                  className="small"
                  onClick={() => {
                    onAddCourseAssessElement?.(selectCourseAssess);
                    setSelectCourseAssess((prevState) => null);
                  }}
                >
                  <AddIcon />
                </button>
              </div>
            </div>
            <div className="w-full">
              {item.courseAssessElements.map((courseAssessElement, idxDetail) => (
                <div className=" border p-2 mt-2 radius-1 border-yellow" key={idxDetail}>
                  <div className="w-full flex gap-3 align-center">
                    <h3 className="text-yellow">Thành phần đánh giá {idxDetail + 1}</h3>

                    {idxDetail === 0 ? null : (
                      <div>
                        <button
                          type="button"
                          className="text-red small"
                          onClick={() => onDeleteAsset(item.id, courseAssessElement.id)}
                        >
                          <RemoveIcon />
                        </button>
                      </div>
                    )}
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
  onDeleteAsset,
}) {
  if (!data) return null;

  return (
    <>
      {data?.hasOwnProperty(SCHEDULE_KEY) ? (
        <ShowScheduleCourse
          data={data[SCHEDULE_KEY]}
          onAddSchedule={onAddSchedule}
          onAddOutCome={onAddOutCome}
          onDeleteOutcome={onDeleteOutcome}
          onAddCourseAssessElement={onAddCourseAssessElement}
          onChangeValueSchedule={onChangeValueSchedule}
          onDeleteSchedule={onDeleteSchedule}
          onDeleteAsset={onDeleteAsset}
        />
      ) : null}
    </>
  );
}

function ChoseOptions({ onSelected, selectedOption }) {
  return (
    <>
      <div className="flex gap-3 align-center justify-center">
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

function SyllabusInputPage(props) {
  const [start, setStart] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
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
  };

  const handleAddOutCome = (newOutcome, index) => {
    // const KEY = assessmentId ? ASSESSMENT_KEY : scheduleId ? SCHEDULE_KEY : OUT_COME_KEY;

    // if (!selectedOption?.[KEY]?.length) return;

    // const cloneData = [...selectedOption[KEY]];

    // const data = generateOutcomes();

    // if (isAssessment || scheduleId) {
    //   const idSearch = assessmentId || scheduleId;

    //   const index = cloneData.findIndex((t) => t.id === idSearch);

    //   if (index === -1) return;

    //   if (rubricId) {
    //     const rubricIdx = [...cloneData[index].rubrics].findIndex((t) => t.id === rubricId);

    //     if (rubricIdx === -1) return;

    //     cloneData[index].rubrics[rubricIdx].courseOutcome.push(data);
    //   } else {
    //     cloneData[index].courseOutcomes.push(data);
    //   }
    // } else {
    //   cloneData.push(data);
    // }

    // setSelectedOption((prev) => ({ ...prev, [KEY]: cloneData }));
    if (!newOutcome) {
      return;
    }
    console.log(selectedOption);
    console.log(selectedOption.courseOutcomes);
    let newOutcomeArr = [];

    if (!selectedOption.courseSchedules[index].courseOutcomes) {
    } else {
      newOutcomeArr = [...selectedOption.courseSchedules[index].courseOutcomes, newOutcome];
    }
    let newCourseSchedulesArr = [...selectedOption.courseSchedules];
    newCourseSchedulesArr[index].courseOutcomes = newOutcomeArr;
    console.log(newOutcome);

    setSelectedOption((prev) => ({ ...prev, courseSchedules: newCourseSchedulesArr }));
    console.log(selectedOption);
  };
  const handleDeleteOutcome = (index, course) => {
    console.log({ index, course });
    if (!course) {
      return;
    }
    console.log('Delete outcome');
    let newOutcomeArr = [];

    if (!selectedOption.courseSchedules[index].courseOutcomes) {
    } else {
      newOutcomeArr = [...selectedOption.courseSchedules[index].courseOutcomes.filter((t) => t.id !== course.id)];
    }
    let newCourseSchedulesArr = [...selectedOption.courseSchedules];
    newCourseSchedulesArr[index].courseOutcomes = newOutcomeArr;

    setSelectedOption((prev) => ({ ...prev, courseSchedules: newCourseSchedulesArr }));
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

  const handleOnAddCourseAssessElement = (scheduleId) => {
    if (!scheduleId || !selectedOption?.[SCHEDULE_KEY]?.length) return;

    const cloneData = [...selectedOption[SCHEDULE_KEY]];

    const index = cloneData.findIndex((t) => t.id === scheduleId);

    if (index === -1) return;

    const newData = generateAssessElement();

    cloneData[index].courseAssessElements.push(newData);

    setSelectedOption((prev) => ({ ...prev, [SCHEDULE_KEY]: cloneData }));
  };

  const handleOnDeleteAsset = (scheduleId, assetId) => {
    if (!scheduleId || !selectedOption?.[SCHEDULE_KEY]?.length) return;

    const cloneData = [...selectedOption[SCHEDULE_KEY]];

    const index = cloneData.findIndex((t) => t.id === scheduleId);

    if (index === -1) return;

    cloneData[index].courseAssessElements = [...cloneData[index].courseAssessElements.filter((t) => t.id !== assetId)];

    setSelectedOption((prev) => ({ ...prev, [SCHEDULE_KEY]: cloneData }));
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

  const handleSubmit = () => {
    console.log(selectedOption);
    // props.onSubmit(selectedOption);
  };

  return (
    <div>
      {!start ? (
        <button type="button" onClick={() => setStart(true)}>
          Get stared
        </button>
      ) : null}

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
            onDeleteAsset={handleOnDeleteAsset}
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

export default SyllabusInputPage;
