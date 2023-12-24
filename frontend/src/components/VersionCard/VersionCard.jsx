import React from 'react';
import './VersionCard.css';

export default function VersionCard(props) {
  const syllabus = props.syllabus;
  let course = props.course;

  let author = syllabus.author;
  let coursenameVN = course.courseNameVN;
  let id = syllabus._id;
  const addToCartHandle = (idProduct) => {
    // axios.put('http://localhost:8000/v1/account/addProduct/64461d96abb7f27194574b94', {
    //   product: idProduct,
    // });
    alert('Thêm vào giỏ hàng thành công');
  };

  const editSyllabus = (idSyllabus) => {
    console.log(idSyllabus);
  };
  const previewSyllabus = (idSyllabus) => {
    console.log(idSyllabus);
  };
  function VersionCardType() {}

  VersionCardType();
  setVersionCard();

  function isUndefined() {
    if (props.petI === undefined) return true;
    return false;
  }

  function setVersionCard() {
    let cardTitle = props.course !== undefined ? course.courseNameVN : 'Golden Treiver';
  }

  return (
    <div className="card-content">
      <h2 className="card-title">{coursenameVN}</h2>
      <p className="card-description">{author.username}</p>
      <p className="card-description">{syllabus.createdDate}</p>

      <button id="edit" onClick={() => editSyllabus(id)}>
        Chỉnh sửa
      </button>
      <button id="preview" onClick={() => previewSyllabus(id)}>
        Xem trước
      </button>
    </div>
  );
}
