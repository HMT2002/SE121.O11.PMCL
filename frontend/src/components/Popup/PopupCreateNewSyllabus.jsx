import Popup from 'reactjs-popup';
import React, { useState, useRef, useContext, useEffect } from 'react';
import './Popup.css';
import SyllabusInputForm from '../SyllabusInputForm/SyllabusInputForm';

export default ({ saveSyllabus, syllabusCourse, submit }) => {
  const [inputSyllabusData, setInputSyllabusData] = useState('');

  const handlerChangeInputSyllabusData = (e) => {
    console.log(e.target.value);
    let data = e.target.value;
    setInputSyllabusData(data);
  };
  const onCreateSubmit = async (data) => {
    console.log('Data is up here');
    console.log(data);
    const response = await submit(data);
    if (response.success) {
      setInputSyllabusData('');
      return true;
    }
    return false;
  };
  return (
    <Popup trigger={<button className="button"> Đăng mới </button>} modal nested>
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">{syllabusCourse !== null ? syllabusCourse.courseNameVN : null}</div>
          <SyllabusInputForm
            onSubmit={async (inputData) => {
              const result = await onCreateSubmit(inputData);
              if (result === true) {
                close();
              }
            }}
          />
          <div className="actions">
            <button
              className="button-add-new"
              onClick={async () => {
                close();
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
