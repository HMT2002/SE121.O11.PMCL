import React, { useContext, useState } from 'react';
import './VersionCard.css';
import { Link } from 'react-router-dom';
import { POST_ApproveSyllabus } from '../../APIs/SyllabusAPI';
import AuthContext from '../../contexts/auth-context';
import greentick from '../../images/green-tick.png';
import redcross from '../../images/red-cross.png';
import threedot from '../../images/three-dot.png';

export default function VersionCard(props) {
  const syllabus = props.syllabus;
  let course = props.course;
  let isAdmin = props.isAdmin;
  const [syllabusStatus, setSyllabusStatus] = useState(syllabus.status);
  console.log(syllabus);
  let author = syllabus.author;
  let coursenameVN = course.courseNameVN;
  let id = syllabus._id;
  const authCtx = useContext(AuthContext);

  const createdDate = new Date(syllabus.createdDate);
  const str =
    createdDate.getUTCFullYear() +
    '/' +
    (createdDate.getUTCMonth() + 1) +
    '/' +
    createdDate.getUTCDate() +
    ' ' +
    createdDate.getUTCHours() +
    ':' +
    createdDate.getUTCMinutes();

  const addToCartHandle = (idProduct) => {
    // axios.put('http://localhost:8000/v1/account/addProduct/64461d96abb7f27194574b94', {
    //   product: idProduct,
    // });
    alert('Thêm vào giỏ hàng thành công');
  };
  const acceptSyllabus = async (idSyllabus) => {
    console.log(idSyllabus);
    const response = await POST_ApproveSyllabus(authCtx.token, idSyllabus);
    console.log(response);
    if (response.status === 200) {
      setSyllabusStatus((prevState) => {
        return 'Đã xét duyệt';
      });
    }
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

  const statusClassname = (param) => {
    console.log(param);
    switch (param) {
      case 'Đã được xét duyệt':
        console.log('approved');
        return 'card-content-approve';
      case 'Từ chối':
        console.log('rejected');
        return 'card-content-reject';
      default:
        console.log('normal pending');
        return 'card-content';
    }
  };

  return (
    <div className={statusClassname(syllabusStatus)}>
      <h2 className="card-title">{coursenameVN}</h2>
      <p className="card-description">{author.username}</p>
      <p className="card-description">{str}</p>
      <div className="div-logo">
        <img src={greentick} className="logo" />
      </div>

      {isAdmin && syllabusStatus === false ? (
        <button className="card-button-edit" id="edit" onClick={() => acceptSyllabus(id)}>
          Xét duyệt
        </button>
      ) : null}

      <Link id="link" params={{ id: id }} to={'/syllabus/' + id}>
        <button className="card-button-preview" id="preview">
          Xem trước
        </button>
      </Link>
    </div>
  );
}
