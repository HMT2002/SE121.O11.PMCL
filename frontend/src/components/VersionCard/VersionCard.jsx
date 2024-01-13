import React, { useContext, useState } from 'react';
import './VersionCard.css';
import { Link } from 'react-router-dom';
import { POST_ApproveSyllabus } from '../../APIs/SyllabusAPI';
import AuthContext from '../../contexts/auth-context';
import greentick from '../../images/green-tick.png';
import redcross from '../../images/red-cross.png';
import threedot from '../../images/three-dot.png';
import { Toaster, toast } from 'sonner';
import { TableRow } from '../Table';

export default function VersionCard(props) {
  const syllabus = props.syllabus;
  let course = props.course;
  let isAdmin = props.isAdmin;
  const [syllabusStatus, setSyllabusStatus] = useState(syllabus.status);
  console.log(syllabus);
  let author = syllabus.author;
  let [coursenameVN, serCoursenameVN] = useState(course.courseNameVN);
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
      toast.success('Xét duyệt thành công', {
        duration: 2000,
      });
      setSyllabusStatus((prevState) => {
        return 'Đã được xét duyệt';
      });
    } else {
      toast.error('Lỗi xét duyệt', {
        duration: 2000,
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
    switch (param) {
      case 'Đã được xét duyệt':
        return 'card-content-approve';
      case 'Từ chối':
        return 'card-content-reject';
      default:
        return 'card-content-pending';
    }
  };
  const statusImage = (param) => {
    console.log(param);
    switch (param) {
      case 'Đã được xét duyệt':
        return <img src={greentick} className="logo" />;
      case 'Từ chối':
        return <img src={redcross} className="logo" />;
      default:
        return <img src={threedot} className="logo" />;
    }
  };
  return (
    <>
      <TableRow>
        <td>{coursenameVN}</td>
        <td>{`${author.degree ? author.degree : ''} ${author.fullname ? author.fullname : ''}`}</td>
        <td>{str}</td>
        <td className={statusClassname(syllabusStatus)}>{syllabusStatus}</td>
        <td className="tb__td--center">
          {isAdmin && syllabusStatus === 'Đang chờ xét duyệt' ? (
            <button className="btn__approve" id="edit" onClick={() => acceptSyllabus(id)}>
              Xét duyệt
            </button>
          ) : null}
          <Link id="link" params={{ id: id }} to={'/syllabus/' + id}>
            <button className="btn__success">Xem trước</button>
          </Link>
        </td>
      </TableRow>
      <Toaster />
    </>
  );
}
