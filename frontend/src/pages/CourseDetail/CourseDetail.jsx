import React, { useEffect, useState } from 'react';
import './CourseDetail.css';
import dogimage from '../../images/golden.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import VersionCard from '../../components/VersionCard/VersionCard';

export default function CourseDetail() {
  const { id } = useParams();

  // const [petBreed, setPetBreed] = useState([]);
  // const [petName, setPetName] = useState([]);
  // const [petHeight, setPetHeight] = useState([]);
  // const [petWeight, setPetWeight] = useState([]);
  // const [petOrigin, setPetOrigin] = useState([]);
  // const [petCharacter, setPetCharacter] = useState([]);
  // const [petDescription, setPetDescription] = useState([]);
  // const [petImage, setPetImage] = useState([]);
  // const [petAge, setPetAge] = useState([]);
  // const [petPrice, setPetPrice] = useState([]);
  // const [petGender, setPetGender] = useState([]);

  const [courseHistory, setCourseHistory] = useState([]);
  const [course, setCourse] = useState();
  const [syllabusList, setSyllabusList] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:7000/api/v1/syllabus/course/' + id).then((res) => {
      let courseData = res.data.data;
      console.log(courseData);
      // setPetBreed(petdata.Pet.breed);
      // setPetName(petdata.Product.name);
      // setPetDescription(petdata.Product.description);
      // setPetHeight(petdata.Pet.height);
      // setPetWeight(petdata.Pet.weight);
      // setPetImage(petdata.Product.image_url);
      // setPetCharacter(petdata.Pet.characteristic);
      // setPetOrigin(petdata.Pet.origin);
      // setPetAge(petdata.Pet.age);
      // setPetPrice(petdata.Pet.price);
      // setPetGender(petdata.Pet.gender);
      setCourseHistory(courseData);
      setCourse(courseData.course);
      setSyllabusList(courseData.syllabuses);
    });
  }, []);

  const deletePet = (event) => {
    event.preventDefault();
    // axios.delete('http://localhost:7000/v1/pet/deletePet/' + id).then(
    //   (res) => {
    //     window.location.href = 'http://localhost:3000/petpage';
    //     console.log(res);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  };

  const updatePet = (event) => {
    event.preventDefault();
    // axios
    //   .put('http://localhost:7000/v1/pet/updatePet/' + id, {
    //     pet: {
    //       price: document.getElementById('petPrice').value,
    //       breed: document.getElementById('petBreed').value,
    //       age: document.getElementById('petAge').value,
    //       aboutBreed: document.getElementById('petDescription').value,
    //       characteristic: document.getElementById('petCharacter').value,
    //       origin: document.getElementById('petOrigin').value,
    //       weight: document.getElementById('petWeight').value,
    //       height: document.getElementById('petHeight').value,
    //       gender: document.getElementById('petGender').value,
    //     },
    //     product: {
    //       name: document.getElementById('petName').value,
    //       description: document.getElementById('petDescription').value,
    //     },
    //   })
    //   .then(
    //     (res) => {
    //       alert('Chỉnh sửa thành công');
    //       window.location.href = 'http://localhost:3000/petpage';
    //       console.log(res);
    //     },
    //     (error) => {
    //       console.log(error);
    //     }
    //   );
  };

  return (
    <div className="dog-bg-modal">
      <div className="modal-content">
        <div className="scrollmenu">
          {syllabusList.map((syllabusItem, key) => {
            return (
              <div className="scrollitem">
                <VersionCard syllabus={syllabusItem} course={course} />
              </div>
            );
          })}
        </div>
        <div className="content-footer">
          {/* <button id="btn-modify" onClick={enablePet}>Chỉnh sửa</button> */}
          <button id="btn-save" onClick={updatePet}>
            Lưu
          </button>
          <button id="btn-delete" onClick={deletePet}>
            Xóa
          </button>
          <button
            id="btn-close"
            onClick={() => {
              window.history.go(-1);
            }}
          >
            Thoát
          </button>
        </div>
      </div>
    </div>
  );
}
