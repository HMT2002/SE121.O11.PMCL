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
    courseOutcomes: [generateOutcomes()],
    activities: '',
    courseAssessElements: [generateAssessElement()],
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
  onAddAssessmentCourseOurCome,
  onAddAssessmentProgramOutCome,
  onAddCourseAssessElement,
  onChangeValueCourseAssessElement,
  onChangeValueOutComeWithAssessment,
  onChangeValueOutComeChildWithAssessment,
  onDeleteOutCome,
  onDeleteOutComeChild,
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
                      // setSelectCourseOutcome(e.target.value);
                      const index = e.target.value * 1;
                      console.log(courseOutcomes[index]);
                      setSelectCourseOutcome(courseOutcomes[index]);
                      onChangeValueSchedule(e, item.id);
                    }}
                  >
                    {courseOutcomes.map((courseOutcome, index) => (
                      <option value={index} key={index}>
                        {courseOutcome.id}
                      </option>
                    ))}
                  </select>
                ) : null}
                <button type="button" className="small" onClick={() => onAddAssessmentCourseOurCome?.(item.id)}>
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
                          onClick={() => onDeleteAsset(item.id, courseOutcome.id)}
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
                      // onChangeValueSchedule(e, item.id);
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
                <button type="button" className="small" onClick={() => onAddCourseAssessElement?.(item.id)}>
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
                    Mô tả{' '}
                    {/* <input
                      type="text"
                      name="description"
                      id=""
                      value={courseAssessElement.description}
                      onChange={(e) => onChangeValueCourseAssessElement(e, item.id, courseAssessElement.id)}
                    /> */}
                    <div>{courseAssessElement.description}</div>
                    Label{' '}
                    {/* <input
                      type="text"
                      name="label"
                      id=""
                      value={courseAssessElement.label}
                      onChange={(e) => onChangeValueCourseAssessElement(e, item.id, courseAssessElement.id)}
                    /> */}
                    <div>{courseAssessElement.label}</div>
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
  data,
  onAddRubric,
  onAddSchedule,
  onAddDetail,
  onAddOutCome,
  onAddProgramOutCome,
  onChangeValueOutCome,
  onChangeValueDetail,
  onChangeValueOutComeChild,
  onAddAssessment,
  onChangeValueAssessment,
  onAddAssessmentCourseOurCome,
  onAddAssessmentProgramOutCome,
  onChangeValueOutComeWithAssessment,
  onAddAssessmentProgramOutComeRubric,
  onChangeValueOutComeChildWithAssessment,
  onAddAssessmentCourseOurComeWithRubric,
  onChangeValueOutComeWithAssessmentInRubric,
  onChangeValueOutComeChildWithAssessmentRubric,
  onAddCourseAssessElement,
  onChangeValueCourseAssessElement,
  onChangeValueSchedule,
  onDeleteOutCome,
  onDeleteOutComeChild,
  onDeleteDetail,
  onDeleteAssessment,
  onDeleteRubric,
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
          onAddAssessmentCourseOurCome={onAddAssessmentCourseOurCome}
          onAddAssessmentProgramOutCome={onAddAssessmentProgramOutCome}
          onAddCourseAssessElement={onAddCourseAssessElement}
          onChangeValueCourseAssessElement={onChangeValueCourseAssessElement}
          onChangeValueOutComeWithAssessment={onChangeValueOutComeWithAssessment}
          onChangeValueOutComeChildWithAssessment={onChangeValueOutComeChildWithAssessment}
          onChangeValueSchedule={onChangeValueSchedule}
          onDeleteOutCome={onDeleteOutCome}
          onDeleteOutComeChild={onDeleteOutComeChild}
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
        return { ...clone, [key]: data };
      }

      delete clone[key];
      return clone;
    });
  };

  const handleChoseOptions = (option) => {
    if (option === OUT_COME_KEY) {
      const data = [generateOutcomes()];
      handleSetSelected(OUT_COME_KEY, data);
      return;
    }

    if (option === ASSESSMENT_KEY) {
      const data = [generateAssessments()];
      handleSetSelected(ASSESSMENT_KEY, data);
      return;
    }

    const data = [generateSchedules()];
    handleSetSelected(SCHEDULE_KEY, data);
  };

  const handleAddOutCome = ({ isAssessment = false, assessmentId = 0, rubricId = 0, scheduleId = 0 }) => {
    const KEY = assessmentId ? ASSESSMENT_KEY : scheduleId ? SCHEDULE_KEY : OUT_COME_KEY;

    if (!selectedOption?.[KEY]?.length) return;

    const cloneData = [...selectedOption[KEY]];

    const data = generateOutcomes();

    if (isAssessment || scheduleId) {
      const idSearch = assessmentId || scheduleId;

      const index = cloneData.findIndex((t) => t.id === idSearch);

      if (index === -1) return;

      if (rubricId) {
        const rubricIdx = [...cloneData[index].rubrics].findIndex((t) => t.id === rubricId);

        if (rubricIdx === -1) return;

        cloneData[index].rubrics[rubricIdx].courseOutcome.push(data);
      } else {
        cloneData[index].courseOutcomes.push(data);
      }
    } else {
      cloneData.push(data);
    }

    setSelectedOption((prev) => ({ ...prev, [KEY]: cloneData }));
  };

  const handleOnDeleteOutCome = (outcomeId, assessmentId = 0, rubricId = 0, scheduleId = 0) => {
    const KEY = assessmentId ? ASSESSMENT_KEY : scheduleId ? SCHEDULE_KEY : OUT_COME_KEY;

    if (!selectedOption?.[KEY]?.length) return;

    let cloneData = [...selectedOption[KEY]];

    if (assessmentId || scheduleId || rubricId) {
      const idSearch = assessmentId || scheduleId;

      const index = cloneData.findIndex((t) => t.id === idSearch);

      if (index === -1) return;

      if (rubricId) {
        const rubricIdx = [...cloneData[index].rubrics].findIndex((t) => t.id === rubricId);

        if (rubricIdx === -1) return;

        cloneData[index].rubrics[rubricIdx].courseOutcome = [
          ...cloneData[index].rubrics[rubricIdx].courseOutcome.filter((t) => t.id !== outcomeId),
        ];
      } else {
        cloneData[index].courseOutcomes = [...cloneData[index].courseOutcomes.filter((t) => t.id !== outcomeId)];
      }
    } else {
      cloneData = [...cloneData.filter((t) => t.id !== outcomeId)];
    }

    setSelectedOption((prev) => ({ ...prev, [KEY]: cloneData }));
  };

  const handleOnDeleteOutComeChild = (progId, outcomeId, assessmentId = 0, rubricId = 0, scheduleId = 0) => {
    // console.log({ outcomeId, assessmentId, rubricId, scheduleId });
    const KEY = assessmentId ? ASSESSMENT_KEY : scheduleId ? SCHEDULE_KEY : OUT_COME_KEY;

    if (!outcomeId || !selectedOption?.[KEY]?.length) return;

    let cloneData = [...selectedOption[KEY]];

    if (!assessmentId && !scheduleId && !rubricId) {
      const index = cloneData.findIndex((t) => t.id === outcomeId);

      if (index === -1) return;

      cloneData[index].courseGoal.programOutcomes = [
        ...cloneData[index].courseGoal.programOutcomes.filter((t) => t.id !== progId),
      ];
    } else {
      const idSearch = assessmentId || scheduleId;

      const index = cloneData.findIndex((t) => t.id === idSearch);

      if (index === -1) return;

      let courseOutcomes = rubricId ? [...cloneData[index].rubrics] : [...cloneData[index].courseOutcomes];

      if (rubricId) {
        const rubricIdx = courseOutcomes.findIndex((t) => t.id === rubricId);

        if (rubricIdx === -1) return;

        courseOutcomes = [...cloneData[index].rubrics[rubricIdx].courseOutcome];

        const courseOutcomeIdx = courseOutcomes.findIndex((t) => t.id === outcomeId);

        if (courseOutcomeIdx === -1) return;

        cloneData[index].rubrics[rubricIdx].courseOutcome[courseOutcomeIdx].courseGoal.programOutcomes = [
          ...cloneData[index].rubrics[rubricIdx].courseOutcome[courseOutcomeIdx].courseGoal.programOutcomes.filter(
            (t) => t.id !== progId
          ),
        ];
      } else {
        const courseOutcomeIdx = courseOutcomes.findIndex((t) => t.id === outcomeId);

        if (courseOutcomeIdx === -1) return;

        cloneData[index].courseOutcomes[courseOutcomeIdx].courseGoal.programOutcomes = [
          ...cloneData[index].courseOutcomes[courseOutcomeIdx].courseGoal.programOutcomes.filter(
            (t) => t.id !== progId
          ),
        ];
      }
    }

    setSelectedOption((prev) => ({ ...prev, [KEY]: cloneData }));
  };

  const handleOnAddProgramOutCome = (outcomeId, assessmentId = 0, rubricId = 0, scheduleId = 0) => {
    const KEY = assessmentId ? ASSESSMENT_KEY : scheduleId ? SCHEDULE_KEY : OUT_COME_KEY;

    if (!outcomeId || !selectedOption?.[KEY]?.length) return;

    const cloneData = [...selectedOption[KEY]];

    const dataGenerate = generateProgramOutCome(outcomeId);

    if (assessmentId === 0 && !scheduleId) {
      const index = cloneData.findIndex((t) => t.id === outcomeId);

      if (index === -1) return;

      cloneData[index].courseGoal.programOutcomes.push(dataGenerate);
    } else {
      const idSearch = assessmentId || scheduleId;

      const index = cloneData.findIndex((t) => t.id === idSearch);

      // console.log(index);

      if (index === -1) return;

      let courseOutcomes = rubricId ? [...cloneData[index].rubrics] : [...cloneData[index].courseOutcomes];

      if (rubricId) {
        const rubricIdx = courseOutcomes.findIndex((t) => t.id === rubricId);

        if (rubricIdx === -1) return;

        courseOutcomes = [...cloneData[index].rubrics[rubricIdx].courseOutcome];

        const courseOutcomeIdx = courseOutcomes.findIndex((t) => t.id === outcomeId);

        if (courseOutcomeIdx === -1) return;

        cloneData[index].rubrics[rubricIdx].courseOutcome[courseOutcomeIdx].courseGoal.programOutcomes.push(
          dataGenerate
        );
      } else {
        const courseOutcomeIdx = courseOutcomes.findIndex((t) => t.id === outcomeId);

        if (courseOutcomeIdx === -1) return;

        cloneData[index].courseOutcomes[courseOutcomeIdx].courseGoal.programOutcomes.push(dataGenerate);
      }
    }

    setSelectedOption((prev) => ({ ...prev, [KEY]: cloneData }));
  };

  const handleOnChangeValueOutCome = (event, outcomeId, assessmentId = 0, rubricId = 0, scheduleId = 0) => {
    const {
      target: { value, name },
    } = event;

    const KEY = assessmentId ? ASSESSMENT_KEY : scheduleId ? SCHEDULE_KEY : OUT_COME_KEY;

    if (!outcomeId || !selectedOption?.[KEY]?.length) return;

    const cloneData = [...selectedOption[KEY]];

    if (!assessmentId && !rubricId && !scheduleId) {
      const index = cloneData.findIndex((t) => t.id === outcomeId);

      // console.log({ outcomeId, assessmentId, rubricId, scheduleId, index });

      if (index === -1) return;

      if (name === 'courseGoal.description') {
        cloneData[index].courseGoal.description = value;
      } else if (name === 'courseGoal.code') {
        cloneData[index].courseGoal.code = value;
      } else {
        cloneData[index][name] = value;
      }
    } else {
      const idSearch = assessmentId || scheduleId;

      const index = cloneData.findIndex((t) => t.id === idSearch);

      if (index === -1) return;

      let courseOutcomes = rubricId ? [...cloneData[index].rubrics] : [...cloneData[index].courseOutcomes];

      if (rubricId) {
        const rubricIdx = courseOutcomes.findIndex((t) => t.id === rubricId);

        if (rubricIdx === -1) return;

        courseOutcomes = [...cloneData[index].rubrics[rubricIdx].courseOutcome];

        const courseOutcomeIdx = courseOutcomes.findIndex((t) => t.id === outcomeId);

        if (courseOutcomeIdx === -1) return;

        if (name === 'courseGoal.description') {
          cloneData[index].rubrics[rubricIdx].courseOutcome[courseOutcomeIdx].courseGoal.description = value;
        } else if (name === 'courseGoal.code') {
          cloneData[index].rubrics[rubricIdx].courseOutcome[courseOutcomeIdx].courseGoal.code = value;
        } else {
          cloneData[index].rubrics[rubricIdx].courseOutcome[courseOutcomeIdx][name] = value;
        }
      } else {
        const courseOutcomeIdx = courseOutcomes.findIndex((t) => t.id === outcomeId);

        if (courseOutcomeIdx === -1) return;

        if (name === 'courseGoal.description') {
          cloneData[index].courseOutcomes[courseOutcomeIdx].courseGoal.description = value;
        } else if (name === 'courseGoal.code') {
          cloneData[index].courseOutcomes[courseOutcomeIdx].courseGoal.code = value;
        } else {
          cloneData[index].courseOutcomes[courseOutcomeIdx][name] = value;
        }
      }
    }

    setSelectedOption((prev) => ({ ...prev, [KEY]: cloneData }));

    console.log(value);
  };

  const handleOnChangeValueOutComeChild = (
    event,
    outcomeId,
    childId,
    assessmentId = 0,
    rubricId = 0,
    scheduleId = 0
  ) => {
    const {
      target: { value, name },
    } = event;

    const KEY = assessmentId ? ASSESSMENT_KEY : scheduleId ? SCHEDULE_KEY : OUT_COME_KEY;

    if (!outcomeId || !selectedOption?.[KEY]?.length) return;

    const cloneData = [...selectedOption[KEY]];

    if (!assessmentId && !rubricId && !scheduleId) {
      const index = cloneData.findIndex((t) => t.id === outcomeId);

      if (index === -1) return;

      const programOutcomes = [...cloneData[index].courseGoal.programOutcomes];

      const indexChild = programOutcomes.findIndex((t) => t.id === childId);

      if (indexChild === -1) return;

      cloneData[index].courseGoal.programOutcomes[indexChild][name] = value;
    } else {
      const idSearch = assessmentId || scheduleId;

      const index = cloneData.findIndex((t) => t.id === idSearch);

      if (index === -1) return;

      let courseOutcomes = rubricId ? [...cloneData[index].rubrics] : [...cloneData[index].courseOutcomes];

      if (rubricId) {
        const rubricIdx = courseOutcomes.findIndex((t) => t.id === rubricId);

        if (rubricIdx === -1) return;

        courseOutcomes = [...cloneData[index].rubrics[rubricIdx].courseOutcome];

        const courseOutcomeIdx = courseOutcomes.findIndex((t) => t.id === outcomeId);

        if (courseOutcomeIdx === -1) return;

        const programOutcomes = [
          ...cloneData[index].rubrics[rubricIdx].courseOutcome[courseOutcomeIdx].courseGoal.programOutcomes,
        ];

        const indexChild = programOutcomes.findIndex((t) => t.id === childId);

        if (indexChild === -1) return;

        cloneData[index].rubrics[rubricIdx].courseOutcome[courseOutcomeIdx].courseGoal.programOutcomes[indexChild][
          name
        ] = value;
      } else {
        const courseOutcomeIdx = courseOutcomes.findIndex((t) => t.id === outcomeId);

        if (courseOutcomeIdx === -1) return;

        const programOutcomes = [...cloneData[index].courseOutcomes[courseOutcomeIdx].courseGoal.programOutcomes];

        const indexChild = programOutcomes.findIndex((t) => t.id === childId);

        if (indexChild === -1) return;

        cloneData[index].courseOutcomes[courseOutcomeIdx].courseGoal.programOutcomes[indexChild][name] = value;
      }
    }

    setSelectedOption((prev) => ({ ...prev, [KEY]: cloneData }));
  };

  const handleOnAddAssessment = () => {
    if (!selectedOption?.[ASSESSMENT_KEY]?.length) return;

    const cloneData = [...selectedOption[ASSESSMENT_KEY]];

    const data = generateAssessments();
    cloneData.push(data);

    setSelectedOption((prev) => ({ ...prev, [ASSESSMENT_KEY]: cloneData }));
  };

  const handleOnDeleteAssessment = (assessmentId) => {
    if (!selectedOption?.[ASSESSMENT_KEY]?.length) return;

    let cloneData = [...selectedOption[ASSESSMENT_KEY]];

    cloneData = [...cloneData.filter((t) => t.id !== assessmentId)];

    setSelectedOption((prev) => ({ ...prev, [ASSESSMENT_KEY]: cloneData }));
  };

  const handleOnChangeValueAssessment = (event, outcomeId) => {
    const {
      target: { value, name },
    } = event;

    if (!outcomeId || !selectedOption?.[ASSESSMENT_KEY]?.length) return;

    const cloneData = [...selectedOption[ASSESSMENT_KEY]];

    const index = cloneData.findIndex((t) => t.id === outcomeId);

    if (index === -1) return;

    if (name === 'assessElement.description') {
      cloneData[index].assessElement.description = value;
    } else if (name === 'assessElement.label') {
      cloneData[index].assessElement.label = value;
    } else {
      cloneData[index][name] = value;
    }

    setSelectedOption((prev) => ({ ...prev, [ASSESSMENT_KEY]: cloneData }));
  };

  const handleOnAddRubric = (assessmentId) => {
    if (!selectedOption?.[ASSESSMENT_KEY]?.length) return;

    const cloneData = [...selectedOption[ASSESSMENT_KEY]];

    const data = generateRubric();

    const index = cloneData.findIndex((t) => t.id === assessmentId);

    if (index === -1) return;

    cloneData[index].rubrics.push(data);

    setSelectedOption((prev) => ({ ...prev, [ASSESSMENT_KEY]: cloneData }));
  };

  const handleOnDeleteRubric = (assessmentId, rubricId) => {
    if (!selectedOption?.[ASSESSMENT_KEY]?.length) return;

    const cloneData = [...selectedOption[ASSESSMENT_KEY]];

    const data = generateRubric();

    const index = cloneData.findIndex((t) => t.id === assessmentId);

    if (index === -1) return;

    cloneData[index].rubrics = [...cloneData[index].rubrics.filter((t) => t.id !== rubricId)];

    setSelectedOption((prev) => ({ ...prev, [ASSESSMENT_KEY]: cloneData }));
  };

  const handleOnAddDetails = (assessmentId) => {
    if (!selectedOption?.[ASSESSMENT_KEY]?.length) return;

    const cloneData = [...selectedOption[ASSESSMENT_KEY]];

    const index = cloneData.findIndex((t) => t.id === assessmentId);

    if (index === -1) return;

    const data = generateDetail();

    cloneData[index].details.push(data);

    setSelectedOption((prev) => ({ ...prev, [ASSESSMENT_KEY]: cloneData }));
  };

  const handleOnDeleteDetail = (assessmentId, detailId) => {
    if (!selectedOption?.[ASSESSMENT_KEY]?.length) return;

    const cloneData = [...selectedOption[ASSESSMENT_KEY]];

    const index = cloneData.findIndex((t) => t.id === assessmentId);

    if (index === -1) return;

    cloneData[index].details = [...cloneData[index].details.filter((t) => t.id !== detailId)];

    setSelectedOption((prev) => ({ ...prev, [ASSESSMENT_KEY]: cloneData }));
  };

  const handleOnChangeValueDetail = (event, assessmentId, detailId) => {
    const {
      target: { value, name },
    } = event;

    if (!assessmentId || !selectedOption?.[ASSESSMENT_KEY]?.length) return;

    const cloneData = [...selectedOption[ASSESSMENT_KEY]];

    const index = cloneData.findIndex((t) => t.id === assessmentId);

    if (index === -1) return;

    let details = [...cloneData[index].details];

    const detailIdx = details.findIndex((t) => t.id === detailId);

    if (detailIdx === -1) return;

    if (name === 'level') {
      cloneData[index].details[detailIdx][name] = value;
    } else {
      cloneData[index].details[detailIdx].requirements[name] = value;
    }

    setSelectedOption((prev) => ({ ...prev, [ASSESSMENT_KEY]: cloneData }));
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

  const handleOnChangeValueCourseAssessElement = (event, scheduleId, courseAssessElementId) => {
    const {
      target: { value, name },
    } = event;

    if (!scheduleId || !selectedOption?.[SCHEDULE_KEY]?.length) return;

    const cloneData = [...selectedOption[SCHEDULE_KEY]];

    const index = cloneData.findIndex((t) => t.id === scheduleId);

    if (index === -1) return;

    const courseAssessElements = [...cloneData[index].courseAssessElements];

    const courseAssessElementIdx = courseAssessElements.findIndex((t) => t.id === courseAssessElementId);

    if (courseAssessElementIdx === -1) return;

    cloneData[index].courseAssessElements[courseAssessElementIdx][name] = value;

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
    console.log(`data`, selectedOption);
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
            onAddOutCome={() => handleAddOutCome({ isAssessment: false })}
            onAddProgramOutCome={handleOnAddProgramOutCome}
            onChangeValueOutCome={handleOnChangeValueOutCome}
            onChangeValueOutComeChild={handleOnChangeValueOutComeChild}
            data={selectedOption}
            onAddAssessment={handleOnAddAssessment}
            onChangeValueAssessment={handleOnChangeValueAssessment}
            onAddAssessmentCourseOurCome={(assessmentId, scheduleId) => {
              handleAddOutCome({
                isAssessment: true,
                assessmentId,
                rubricId: 0,
                scheduleId,
              });
            }}
            onAddAssessmentProgramOutCome={handleOnAddProgramOutCome}
            onChangeValueOutComeWithAssessment={handleOnChangeValueOutCome}
            onChangeValueOutComeChildWithAssessment={handleOnChangeValueOutComeChild}
            onAddRubric={handleOnAddRubric}
            onAddAssessmentCourseOurComeWithRubric={(assessmentId, rubricId) =>
              handleAddOutCome({
                isAssessment: true,
                assessmentId,
                rubricId,
                scheduleId: 0,
              })
            }
            onChangeValueOutComeWithAssessmentInRubric={handleOnChangeValueOutCome}
            onChangeValueOutComeChildWithAssessmentRubric={handleOnChangeValueOutComeChild}
            onAddAssessmentProgramOutComeRubric={handleOnAddProgramOutCome}
            onAddDetail={handleOnAddDetails}
            onChangeValueDetail={handleOnChangeValueDetail}
            onAddSchedule={handleOnAddSchedule}
            onAddCourseAssessElement={handleOnAddCourseAssessElement}
            onChangeValueCourseAssessElement={handleOnChangeValueCourseAssessElement}
            onChangeValueSchedule={handleOnChangeValueSchedule}
            onDeleteOutCome={handleOnDeleteOutCome}
            onDeleteOutComeChild={handleOnDeleteOutComeChild}
            onDeleteDetail={handleOnDeleteDetail}
            onDeleteAssessment={handleOnDeleteAssessment}
            onDeleteRubric={handleOnDeleteRubric}
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
