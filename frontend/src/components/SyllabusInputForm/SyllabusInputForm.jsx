import { useState } from 'react';
import './SyllabusInputForm.css';
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

function ShowOutComeCourse({
  data = [],
  title,
  titleColor = 'text-red',
  onAddOutCome,
  onAddProgramOutCome,
  onChangeValueOutCome,
  onChangeValueOutComeChild,
  onDeleteOutCome,
  onDeleteOutComeChild,
  activeDeleteRubrics,
  onDeleteRubric,
}) {
  return (
    <div className="border mt-2 p-2 radius-1">
      <div className="flex align-center gap-3">
        <h3 className={titleColor}>{title || 'Form Out Come'}</h3>
        <div>
          <button type="button" className="small text-red" onClick={onAddOutCome}>
            <AddIcon />
          </button>
        </div>
        {activeDeleteRubrics ? (
          <div>
            <button type="button" className="text-yellow" onClick={onDeleteRubric}>
              <RemoveIcon />
            </button>
          </div>
        ) : null}
      </div>

      {data.map((item, index) => (
        <div className="mt-2 border p-2 radius-1 border-red" key={index}>
          <div className="flex gap-3 align-center">
            <h3 className="text-red">Form {index + 1}</h3>
            {index === 0 ? null : (
              <div>
                <button type="button" className="text-red" onClick={() => onDeleteOutCome(item.id)}>
                  <RemoveIcon />
                </button>
              </div>
            )}
          </div>
          <div className="flex gap-3 border-bottom pb-2">
            Level{' '}
            <input
              type="number"
              name="level"
              id=""
              value={item.level}
              onChange={(e) => onChangeValueOutCome(e, item.id)}
            />
            Description{' '}
            <input
              type="text"
              name="description"
              id=""
              value={item.description}
              onChange={(e) => onChangeValueOutCome(e, item.id)}
            />
            Level Of Teaching{' '}
            <input
              type="text"
              name="levelOfTeaching"
              id=""
              value={item.levelOfTeaching}
              onChange={(e) => onChangeValueOutCome(e, item.id)}
            />
          </div>

          <div className="w-full ">
            <div className="flex align-center gap-3">
              <p>Course Goal</p>
            </div>

            <div className="flex align-center gap-3">
              Description{' '}
              <input
                type="text"
                name="courseGoal.description"
                onChange={(e) => onChangeValueOutCome(e, item.id)}
                id=""
                value={item.courseGoal.description}
              />
              <div>
                <button type="button" className="small" onClick={() => onAddProgramOutCome?.(item.id)}>
                  <AddIcon />
                </button>
              </div>
            </div>

            {item?.courseGoal?.programOutcomes?.map((child, i) => (
              <div className="border p-2 mt-2 radius-1 border-yellow" key={i}>
                <div className="flex gap-3 align-center">
                  <h3 className="text-yellow">Form Course Goal {i + 1}</h3>
                  {i === 0 ? null : (
                    <div>
                      <button
                        type="button"
                        className="text-yellow"
                        onClick={() => onDeleteOutComeChild(child.id, item.id)}
                      >
                        <RemoveIcon />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 flex-wrap ">
                  <div>
                    Program Out come{' '}
                    <input
                      type="text"
                      name="programOutcome"
                      id=""
                      value={child.programOutcome}
                      onChange={(e) => onChangeValueOutComeChild?.(e, item.id, child.id)}
                    />
                  </div>
                  <div>
                    Outcome Level{' '}
                    <input
                      type="text"
                      name="outcomeLevel"
                      id=""
                      value={child.outcomeLevel}
                      onChange={(e) => onChangeValueOutComeChild?.(e, item.id, child.id)}
                    />
                  </div>
                  <div>
                    Outcome Assessment{' '}
                    <input
                      type="text"
                      name="outcomeAssessment"
                      id=""
                      value={child.outcomeAssessment}
                      onChange={(e) => onChangeValueOutComeChild?.(e, item.id, child.id)}
                    />
                  </div>
                  <div>
                    Assessment Level{' '}
                    <input
                      type="text"
                      name="assessmentLevel"
                      id=""
                      value={child.assessmentLevel}
                      onChange={(e) => onChangeValueOutComeChild?.(e, item.id, child.id)}
                    />
                  </div>

                  <div>
                    Description{' '}
                    <input
                      type="text"
                      name="description"
                      id=""
                      value={child.description}
                      onChange={(e) => onChangeValueOutComeChild(e, item.id, child.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ShowAssessmentCourse({
  onAddAssessment,
  onAddRubric,
  onAddDetail,
  data,
  onChangeValueAssessment,
  onChangeValueDetail,
  onAddAssessmentCourseOurCome,
  onAddAssessmentProgramOutCome,
  onChangeValueOutComeWithAssessment,
  onChangeValueOutComeChildWithAssessment,
  onAddAssessmentCourseOurComeWithRubric,
  onChangeValueOutComeWithAssessmentInRubric,
  onChangeValueOutComeChildWithAssessmentRubric,
  onAddAssessmentProgramOutComeRubric,
  onDeleteOutCome,
  onDeleteOutComeChild,
  onDeleteDetail,
  onDeleteAssessment,
  onDeleteRubric,
}) {
  return (
    <div className="border mt-2 p-2 radius-1">
      <div className="flex align-center gap-3">
        <h3 className="text-yellow">Form Assessment</h3>
        <div>
          <button type="button" className="small text-yellow" onClick={onAddAssessment}>
            <AddIcon />
          </button>
        </div>
      </div>

      {data.map((item, index) => (
        <div className="mt-2 border p-2 radius-1 border-yellow" key={index}>
          <div className="flex gap-3 align-center">
            <h3 className="text-yellow">Form {index + 1}</h3>

            {index === 0 ? null : (
              <div>
                <button type="button" className="text-yellow" onClick={() => onDeleteAssessment(item.id)}>
                  <RemoveIcon />
                </button>
              </div>
            )}
          </div>

          <div className="flex gap-3 border-bottom pb-2">
            Assess Level{' '}
            <input
              type="number"
              name="assessLevel"
              id=""
              value={item.assessLevel}
              onChange={(e) => onChangeValueAssessment(e, item.id)}
            />
            Description{' '}
            <input
              type="text"
              name="description"
              id=""
              value={item.description}
              onChange={(e) => onChangeValueAssessment(e, item.id)}
            />
            Percentage{' '}
            <input
              type="number"
              name="percentage"
              id=""
              value={item.percentage}
              onChange={(e) => onChangeValueAssessment(e, item.id)}
            />
          </div>

          <div>
            <div className="flex align-center gap-3">
              <p>Assess Element</p>
            </div>

            <div className="flex align-center gap-3">
              Description{' '}
              <input
                type="text"
                name="assessElement.description"
                id=""
                value={item.assessElement.description}
                onChange={(e) => onChangeValueAssessment(e, item.id)}
              />
              Label{' '}
              <input
                type="text"
                name="assessElement.label"
                id=""
                value={item.assessElement.label}
                onChange={(e) => onChangeValueAssessment(e, item.id)}
              />
            </div>
          </div>

          <ShowOutComeCourse
            title={`Course Outcomes`}
            onAddOutCome={() => onAddAssessmentCourseOurCome?.(item.id, 0)}
            onAddProgramOutCome={(outcomeId) => onAddAssessmentProgramOutCome?.(outcomeId, item.id)}
            onChangeValueOutCome={(e, outcomeId) => onChangeValueOutComeWithAssessment(e, outcomeId, item.id)}
            onChangeValueOutComeChild={(e, outcomeId, childId) =>
              onChangeValueOutComeChildWithAssessment(e, outcomeId, childId, item.id)
            }
            data={item.courseOutcomes}
            onDeleteOutCome={(outcomeId) => onDeleteOutCome?.(outcomeId, item.id, 0, 0)}
            onDeleteOutComeChild={(childId, outcomeId) => onDeleteOutComeChild?.(childId, outcomeId, item.id, 0, 0)}
          />

          <div>
            <div className="flex align-center gap-3">
              <p>Rubrics (Course Outcome)</p>

              <div>
                <button type="button" className="small" onClick={() => onAddRubric?.(item.id)}>
                  <AddIcon />
                </button>
              </div>
            </div>

            {item.rubrics.map((rubric, idxRubric) => (
              <ShowOutComeCourse
                key={idxRubric}
                data={rubric.courseOutcome}
                title={`Form Rubrics ${idxRubric + 1} (Course Outcome)`}
                onAddOutCome={() => onAddAssessmentCourseOurComeWithRubric?.(item.id, rubric.id)}
                onAddProgramOutCome={(outcomeId) =>
                  onAddAssessmentProgramOutComeRubric?.(outcomeId, item.id, rubric.id)
                }
                onChangeValueOutCome={(e, outcomeId) =>
                  onChangeValueOutComeWithAssessmentInRubric(e, outcomeId, item.id, rubric.id)
                }
                onChangeValueOutComeChild={(e, outcomeId, childId) =>
                  onChangeValueOutComeChildWithAssessmentRubric(e, outcomeId, childId, item.id, rubric.id)
                }
                onDeleteOutCome={(outcomeId) => onDeleteOutCome?.(outcomeId, item.id, rubric.id, 0)}
                onDeleteOutComeChild={(childId, outcomeId) =>
                  onDeleteOutComeChild?.(childId, outcomeId, item.id, rubric.id, 0)
                }
                activeDeleteRubrics={idxRubric !== 0}
                onDeleteRubric={() => onDeleteRubric(item.id, rubric.id)}
              />
            ))}
          </div>

          <div>
            <div className="flex align-center gap-3">
              <p>Details</p>

              <div>
                <button type="button" className="small" onClick={() => onAddDetail?.(item.id)}>
                  <AddIcon />
                </button>
              </div>
            </div>

            {item.details.map((detail, idxDetail) => (
              <div className="border p-2 mt-2 radius-1 border-yellow" key={idxDetail}>
                <div className="flex gap-3 flex-wrap ">
                  <div className="flex gap-3 align-center">
                    <h3 className="text-red">Form Detail {idxDetail + 1}</h3>
                    {idxDetail === 0 ? null : (
                      <div>
                        <button type="button" className="text-red" onClick={() => onDeleteDetail(item.id, detail.id)}>
                          <RemoveIcon />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3 border-bottom pb-2 w-full">
                    Level{' '}
                    <input
                      type="number"
                      name="level"
                      id=""
                      value={detail.level}
                      onChange={(e) => onChangeValueDetail(e, item.id, detail.id)}
                    />
                  </div>

                  <div className="w-full border-bottom pb-2">
                    <p>Requirements</p>
                  </div>

                  <div>
                    AcademicPerformance{' '}
                    <input
                      type="text"
                      name="academicPerformance"
                      id=""
                      value={detail.requirements.academicPerformance}
                      onChange={(e) => onChangeValueDetail(e, item.id, detail.id)}
                    />
                  </div>
                  <div>
                    MinScore{' '}
                    <input
                      type="number"
                      name="minScore"
                      id=""
                      min={0}
                      value={detail.requirements.minScore}
                      onChange={(e) => onChangeValueDetail(e, item.id, detail.id)}
                    />
                  </div>
                  <div>
                    MaxScore{' '}
                    <input
                      type="number"
                      name="maxScore"
                      id=""
                      min={0}
                      value={detail.requirements.maxScore}
                      onChange={(e) => onChangeValueDetail(e, item.id, detail.id)}
                    />
                  </div>

                  <div>
                    Requirement{' '}
                    <input
                      type="text"
                      name="requirement"
                      id=""
                      value={detail.requirements.requirement}
                      onChange={(e) => onChangeValueDetail(e, item.id, detail.id)}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

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
            <h3 className="text-blue">Form {index + 1}</h3>
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
              Description{' '}
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

            <ShowOutComeCourse
              title={`Course Outcomes`}
              onAddOutCome={() => onAddAssessmentCourseOurCome?.(0, item.id)}
              onAddProgramOutCome={(outcomeId) => onAddAssessmentProgramOutCome?.(outcomeId, 0, 0, item.id)}
              onChangeValueOutCome={(e, outcomeId) => onChangeValueOutComeWithAssessment(e, outcomeId, 0, 0, item.id)}
              onChangeValueOutComeChild={(e, outcomeId, childId) =>
                onChangeValueOutComeChildWithAssessment(e, outcomeId, childId, 0, 0, item.id)
              }
              data={item.courseOutcomes}
              onDeleteOutCome={(outcomeId) => onDeleteOutCome?.(outcomeId, 0, 0, item.id)}
              onDeleteOutComeChild={(childId, outcomeId) => onDeleteOutComeChild?.(childId, outcomeId, 0, 0, item.id)}
            />

            <div className="flex align-center gap-3">
              <p>Course Assess Elements</p>

              <div>
                <button type="button" className="small" onClick={() => onAddCourseAssessElement?.(item.id)}>
                  <AddIcon />
                </button>
              </div>
            </div>

            <div className="w-full">
              {item.courseAssessElements.map((courseAssessElement, idxDetail) => (
                <div className=" border p-2 mt-2 radius-1 border-yellow" key={idxDetail}>
                  <div className="w-full flex gap-3 align-center">
                    <h3 className="text-yellow">Course Assess Elements Form {idxDetail + 1}</h3>

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
                    Description{' '}
                    <input
                      type="text"
                      name="description"
                      id=""
                      value={courseAssessElement.description}
                      onChange={(e) => onChangeValueCourseAssessElement(e, item.id, courseAssessElement.id)}
                    />
                    Label{' '}
                    <input
                      type="text"
                      name="label"
                      id=""
                      value={courseAssessElement.label}
                      onChange={(e) => onChangeValueCourseAssessElement(e, item.id, courseAssessElement.id)}
                    />
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
      {data?.hasOwnProperty(OUT_COME_KEY) ? (
        <ShowOutComeCourse
          onAddOutCome={onAddOutCome}
          onAddProgramOutCome={onAddProgramOutCome}
          onChangeValueOutCome={onChangeValueOutCome}
          onChangeValueOutComeChild={onChangeValueOutComeChild}
          data={data[OUT_COME_KEY]}
          onDeleteOutCome={onDeleteOutCome}
          onDeleteOutComeChild={onDeleteOutComeChild}
        />
      ) : null}

      {data?.hasOwnProperty(ASSESSMENT_KEY) ? (
        <ShowAssessmentCourse
          data={data[ASSESSMENT_KEY]}
          onAddAssessment={onAddAssessment}
          onAddRubric={onAddRubric}
          onAddDetail={onAddDetail}
          onChangeValueAssessment={onChangeValueAssessment}
          onAddAssessmentCourseOurCome={onAddAssessmentCourseOurCome}
          onAddAssessmentProgramOutCome={onAddAssessmentProgramOutCome}
          onChangeValueOutComeWithAssessment={onChangeValueOutComeWithAssessment}
          onChangeValueOutComeChildWithAssessment={onChangeValueOutComeChildWithAssessment}
          onAddAssessmentCourseOurComeWithRubric={onAddAssessmentCourseOurComeWithRubric}
          onChangeValueOutComeWithAssessmentInRubric={onChangeValueOutComeWithAssessmentInRubric}
          onChangeValueOutComeChildWithAssessmentRubric={onChangeValueOutComeChildWithAssessmentRubric}
          onAddAssessmentProgramOutComeRubric={onAddAssessmentProgramOutComeRubric}
          onChangeValueDetail={onChangeValueDetail}
          onDeleteOutCome={onDeleteOutCome}
          onDeleteOutComeChild={onDeleteOutComeChild}
          onDeleteDetail={onDeleteDetail}
          onDeleteAssessment={onDeleteAssessment}
          onDeleteRubric={onDeleteRubric}
        />
      ) : null}

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
      <h3>Chose course options, plz.</h3>

      <div className="flex gap-3 align-center justify-center">
        <button
          type="button"
          className={selectedOption && selectedOption[OUT_COME_KEY] ? `active` : ``}
          onClick={() => onSelected(OUT_COME_KEY)}
        >
          Out comes
        </button>

        <button
          type="button"
          className={selectedOption && selectedOption[ASSESSMENT_KEY] ? `active` : ``}
          onClick={() => onSelected(ASSESSMENT_KEY)}
        >
          Assessments
        </button>

        <button
          type="button"
          className={selectedOption && selectedOption[SCHEDULE_KEY] ? `active` : ``}
          onClick={() => onSelected(SCHEDULE_KEY)}
        >
          Schedules
        </button>
      </div>
    </>
  );
}

function SyllabusInputForm(props) {
  const [start, setStart] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

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
        } else {
          cloneData[index].rubrics[rubricIdx].courseOutcome[courseOutcomeIdx][name] = value;
        }
      } else {
        const courseOutcomeIdx = courseOutcomes.findIndex((t) => t.id === outcomeId);

        if (courseOutcomeIdx === -1) return;

        if (name === 'courseGoal.description') {
          cloneData[index].courseOutcomes[courseOutcomeIdx].courseGoal.description = value;
        } else {
          cloneData[index].courseOutcomes[courseOutcomeIdx][name] = value;
        }
      }
    }

    setSelectedOption((prev) => ({ ...prev, [KEY]: cloneData }));
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
    props.onSubmit(selectedOption);
  };

  return (
    <div>
      {/* <h1>Form Data JSON</h1> */}

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
          Save
        </button>
      ) : null}
    </div>
  );
}

export default SyllabusInputForm;
