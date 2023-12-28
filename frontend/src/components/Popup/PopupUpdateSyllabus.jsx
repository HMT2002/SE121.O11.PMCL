import Popup from 'reactjs-popup';
import React, { useState, useRef, useContext, useEffect } from 'react';
import './Popup.css';
import SyllabusInputForm from '../SyllabusInputForm/SyllabusInputForm';
export default ({ saveSyllabus, syllabusCourse, submit, syllabus }) => {
  const [inputSyllabusData, setInputSyllabusData] = useState('');
  const handlerChangeInputSyllabusData = (e) => {
    console.log(e.target.value);
    let data = e.target.value;
    setInputSyllabusData(data);
  };
  useEffect(() => {
    if (syllabus) {
      console.log(syllabus);
    }
  }, []);

  return (
    <Popup trigger={<button className="button"> Cập nhật </button>} modal nested>
      {(close) => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">{syllabusCourse !== null ? syllabusCourse.courseNameVN : null}</div>
          <div className="content">Nhập dữ liệu theo chuẩn JSON</div>
          <SyllabusInputForm />

          <div className="actions">
            <button
              className="button-add-new"
              onClick={async () => {
                const response = await submit(inputSyllabusData);
                if (response.success) {
                  setInputSyllabusData('');
                  close();
                }
              }}
            >
              Cập nhật đề cương
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
};
