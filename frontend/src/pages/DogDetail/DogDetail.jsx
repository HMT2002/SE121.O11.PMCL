import React, { useEffect, useState } from 'react';
import './DogDetail.css';
import dogimage from '../../images/golden.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function DogDetail(props) {
  const { id } = useParams();
  const [petBreed, setPetBreed] = useState([]);
  const [petName, setPetName] = useState([]);
  const [petHeight, setPetHeight] = useState([]);
  const [petWeight, setPetWeight] = useState([]);
  const [petOrigin, setPetOrigin] = useState([]);
  const [petCharacter, setPetCharacter] = useState([]);
  const [petDescription, setPetDescription] = useState([]);
  const [petImage, setPetImage] = useState([]);
  const [petAge, setPetAge] = useState([]);
  const [petPrice, setPetPrice] = useState([]);
  const [petGender, setPetGender] = useState([]);
  let breedInput = '1';
  // let petColor= ""
  // let petDescription= ""
  // let petHeight= ""
  // let petWeight= ""
  // let petImage= ""
  // let petOrigin= ""
  // let petCharacter= ""
  // let petAge= ""
  // let petPrice= ""

  useEffect(() => {
    axios.get('http://localhost:7000/v1/pet/readPet/' + id).then((res) => {
      let petdata = res.data;
      console.log(res.data);
      setPetBreed(petdata.Pet.breed);
      setPetName(petdata.Product.name);
      setPetDescription(petdata.Product.description);
      setPetHeight(petdata.Pet.height);
      setPetWeight(petdata.Pet.weight);
      setPetImage(petdata.Product.image_url);
      setPetCharacter(petdata.Pet.characteristic);
      setPetOrigin(petdata.Pet.origin);
      setPetAge(petdata.Pet.age);
      setPetPrice(petdata.Pet.price);
      setPetGender(petdata.Pet.gender);
    });
  }, []);

  const deletePet = (event) => {
    event.preventDefault();
    axios.delete('http://localhost:7000/v1/pet/deletePet/' + id).then(
      (res) => {
        window.location.href = 'http://localhost:3000/petpage';
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const updatePet = (event) => {
    event.preventDefault();
    axios
      .put('http://localhost:7000/v1/pet/updatePet/' + id, {
        pet: {
          price: document.getElementById('petPrice').value,
          breed: document.getElementById('petBreed').value,
          age: document.getElementById('petAge').value,
          aboutBreed: document.getElementById('petDescription').value,
          characteristic: document.getElementById('petCharacter').value,
          origin: document.getElementById('petOrigin').value,
          weight: document.getElementById('petWeight').value,
          height: document.getElementById('petHeight').value,
          gender: document.getElementById('petGender').value,
        },
        product: {
          name: document.getElementById('petName').value,
          description: document.getElementById('petDescription').value,
        },
      })
      .then(
        (res) => {
          alert('Chỉnh sửa thành công');
          window.location.href = 'http://localhost:3000/petpage';
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  return (
    <div className="dog-bg-modal">
      <div className="modal-content">
        <div className="content-header">
          <div className="content-left">
            <p className="content-subtitle">Giống</p>
            <textarea type="textarea" className="subtitle-information" defaultValue={petBreed} id="petBreed">
              {/* {petBreed} */}
            </textarea>
            <p className="content-subtitle">Về giống</p>
            <textarea
              type="textarea"
              className="subtitle-information information-description"
              defaultValue={petDescription}
              id="petDescription"
            >
              {/* {petBreed} */}
            </textarea>
            <p className="content-subtitle">Tên</p>
            <textarea type="textarea" className="subtitle-information" defaultValue={petName} id="petName"></textarea>
            <p className="content-subtitle">Giới tính</p>
            <textarea
              type="textarea"
              className="subtitle-information"
              defaultValue={petGender}
              id="petGender"
            ></textarea>
            {/* {petBreed} */}
            <p className="content-subtitle">Tuổi thọ</p>
            <textarea type="textarea" className="subtitle-information" defaultValue={petAge} id="petAge">
              {/* {petBreed} */}
            </textarea>
            <p className="content-subtitle">Chiều cao</p>
            <textarea type="textarea" className="subtitle-information" id="petHeight" defaultValue={petHeight}>
              {/* {petBreed} */}
            </textarea>
            <p className="content-subtitle">Cân nặng</p>
            <textarea type="textarea" className="subtitle-information" id="petWeight" defaultValue={petWeight}>
              {/* {petBreed} */}
            </textarea>
            <p className="content-subtitle">Xuất xứ</p>
            <textarea type="textarea" className="subtitle-information" id="petOrigin" defaultValue={petOrigin}>
              {/* {petBreed} */}
            </textarea>
            <p className="content-subtitle">Tính cách</p>
            <textarea type="textarea" className="subtitle-information" id="petCharacter" defaultValue={petCharacter}>
              {/* {petBreed} */}
            </textarea>
          </div>
          <div className="content-right">
            <img src={'http://localhost:7000/' + petImage} alt="golden-dog" />
            {/* <p className="content-subtitle">{petPrice}</p> */}
            <textarea
              type="textarea"
              className="subtitle-information"
              id="petPrice"
              defaultValue={petPrice}
              // onChange={(value) => {setPetPrice(value); console.log(value)}}
            >
              {/* {petBreed} */}
            </textarea>
          </div>
        </div>
        <div className="content-footer">
          {/* <button id="btn-modify" onClick={enablePet}>Chỉnh sửa</button> */}
          <button id="btn-save" onClick={updatePet}>
            Lưu
          </button>
          <button id="btn-delete" onClick={deletePet}>
            Xóa
          </button>
          <button id="btn-close">
            <Link to="/petpage">Thoát</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
