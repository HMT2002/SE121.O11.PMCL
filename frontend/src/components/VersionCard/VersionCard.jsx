import React, { useContext, useState } from 'react';
import './VersionCard.css';
import { Link } from 'react-router-dom';
import { POST_ApproveSyllabus } from '../../APIs/SyllabusAPI';
import AuthContext from '../../contexts/auth-context';

export default function VersionCard(props) {
  const syllabus = props.syllabus;
  let course = props.course;
  let isAdmin = props.isAdmin;
  const [isApprove, setIsApprove] = useState(syllabus.validated);
  let author = syllabus.author;
  let coursenameVN = course.courseNameVN;
  let id = syllabus._id;
  const authCtx = useContext(AuthContext);
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
      setIsApprove((prevState) => {
        return true;
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

  return (
    <div className={isApprove ? 'card-content-approve' : 'card-content'}>
      <h2 className="card-title">{coursenameVN}</h2>
      <p className="card-description">{author.username}</p>
      <p className="card-description">{syllabus.createdDate}</p>

      {isAdmin && isApprove === false ? (
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
