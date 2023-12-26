import React, { useState, useRef, useContext, useEffect } from 'react';
import './NewSyllabus.css';
import axios from 'axios';
import AuthContext from '../../contexts/auth-context';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';

import CustomPopupCreateNew from '../../components/Popup/PopupCreateNewSyllabus';
import CustomPopupUpdate from '../../components/Popup/PopupUpdateSyllabus';

import 'reactjs-popup/dist/index.css';

const CourseForm = () => {
  const initialData = {
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
        description: 'mô tả test',
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
        description: 'mô tả test lv2',
        levelOfTeaching: '',
      },
    ],
    //còn thêm đc
  };

  const [courseData, setCourseData] = useState(initialData);

  const handleAddOutcome = () => {
    const newOutcome = {
      courseGoal: {
        description: '',
        programOutcomes: [], //khởi tạo cha default
      },
      level: 0,
      description: 'nothing new other syllabus',
      levelOfTeaching: '',
    };

    setCourseData({
      ...courseData,
      courseOutcomes: [...courseData.courseOutcomes, newOutcome],
    });
  };

  const handleRemoveOutcome = (indexToRemove) => {
    const updatedOutcomes = courseData.courseOutcomes.filter((_, index) => index !== indexToRemove);

    setCourseData({
      ...courseData,
      courseOutcomes: updatedOutcomes,
    });
  };

  const handleAddProgramOutcome = (outcomeIndex) => {
    const newProgramOutcome = {
      programOutcome: '',
      outcomeLevel: '',
      outcomeAssessment: '',
      assessmentLevel: '',
      description: '',
    };

    const updatedOutcomes = [...courseData.courseOutcomes];
    updatedOutcomes[outcomeIndex].courseGoal.programOutcomes.push(newProgramOutcome);

    setCourseData({
      ...courseData,
      courseOutcomes: updatedOutcomes,
    });
  };

  const handleRemoveProgramOutcome = (outcomeIndex, programOutcomeIndex) => {
    const updatedOutcomes = [...courseData.courseOutcomes];
    updatedOutcomes[outcomeIndex].courseGoal.programOutcomes.splice(programOutcomeIndex, 1);

    setCourseData({
      ...courseData,
      courseOutcomes: updatedOutcomes,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted data:', courseData);
    //nơi gửi dữ liệu
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {courseData.courseOutcomes.map((outcome, index) => (
          <div key={index}>
            {/* cha chính */}
            <form key={index}>
              <input
                type="text"
                value={outcome.courseGoal.description}
                onChange={(e) => {
                  const updatedOutcomes = [...courseData.courseOutcomes];
                  updatedOutcomes[index].courseGoal.description = e.target.value;
                  setCourseData({ ...courseData, courseOutcomes: updatedOutcomes });
                }}
                placeholder="mô tả cha"
              />
              {/* input của cha  */}
              <button type="button" onClick={() => handleRemoveOutcome(index)}>
                Xóa cha
              </button>
            </form>

            {/* con */}
            {outcome.courseGoal &&
              outcome.courseGoal.programOutcomes &&
              outcome.courseGoal.programOutcomes.map((programOutcome, idx) => (
                <form key={idx}>
                  <input
                    type="text"
                    value={programOutcome.programOutcome}
                    onChange={(e) => {
                      const updatedOutcomes = [...courseData.courseOutcomes];
                      updatedOutcomes[index].courseGoal.programOutcomes[idx].programOutcome = e.target.value;
                      setCourseData({
                        ...courseData,
                        courseOutcomes: updatedOutcomes,
                      });
                    }}
                    placeholder="mô tả con"
                  />
                  {/* input con */}
                  <button type="button" onClick={() => handleRemoveProgramOutcome(index, idx)}>
                    Xóa con
                  </button>
                </form>
              ))}
            <button onClick={() => handleAddProgramOutcome(index)}>Thêm con</button>
          </div>
        ))}
        <button onClick={handleAddOutcome}>Thêm cha</button>
        <button type="submit">Gửi dữ liệu</button>
      </form>
    </div>
  );
};

export default CourseForm;
