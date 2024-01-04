import Popup from 'reactjs-popup';
import React, { useState, useRef, useContext, useEffect } from 'react';
import './Popup.css';
import SyllabusInputForm from '../SyllabusInputForm/SyllabusInputForm';
export default ({ saveSyllabus, syllabusCourse, submit, syllabus }) => {
  const [inputSyllabusData, setInputSyllabusData] = useState('');
  const onCloneSubmit = async (data) => {
    console.log('Data is up here');
    console.log(data);
    const response = await submit(data);
    if (response.success) {
      setInputSyllabusData('');
    }
  };
  useEffect(() => {
    if (syllabus) {
      console.log(syllabus);
    }
  }, []);

  return (
    <Popup trigger={<button className="button-open-clone">Sao chép bản mới từ bản này</button>} modal nested>
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">{syllabusCourse !== null ? syllabusCourse.courseNameVN : null}</div>
          <SyllabusInputForm
            onSubmit={(inputData) => {
              onCloneSubmit(inputData);
              close();
            }}
            cloneSyllabusData={syllabus}
          />

          <div className="actions">
            <button
              className="button-add-new"
              onClick={async () => {
                close();
                return;
              }}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};
