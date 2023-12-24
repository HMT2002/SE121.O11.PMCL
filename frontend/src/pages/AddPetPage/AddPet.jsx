import React, { useState, useRef } from 'react';
import './AddPet.css';
import axios from 'axios';
import Uploader from '../../components/Uploader/Uploader';

function AddPet(props) {
  const [img, setImg] = useState();

  const modalState = props.toggle;
  const action = props.action;
  let pet = props.pet;
  let updatePet = props.addpet;

  const url = 'http://localhost:7000/v1/pet/add';

  const handleSubmit = (event) => {
    event.preventDefault();

    const formD = new FormData();
    formD.append('height', pet.petHeight);
    formD.append('weight', pet.petWeight);
    formD.append('origin', pet.petOrigin);
    formD.append('characteristic', pet.petCharacter);
    formD.append('breed', pet.petBreed);
    formD.append('aboutBreed', pet.petDescription);
    formD.append('description', pet.petDescription);
    formD.append('product_type', 'Pet');
    formD.append('price', pet.petPrice);
    formD.append('name', pet.petName);
    formD.append('gender', pet.petGender);
    formD.append('age', pet.petAge);
    formD.append('color_id', '648c44711bd8c3e10049c93e');
    formD.append('image_url', img);
    axios.post(url, formD).then(
      (response) => {
        alert('Thêm thành công');
        window.location.href = 'http://localhost:3000/petpage';
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const onSelectedFile = (e) => {
    setImg(e.target.files[0]);
  };

  return (
    <div className={`bg-modal ${modalState ? 'modal-active' : ''}`}>
      <div id="addpet-section">
        <h1>Thêm</h1>
        <form>
          <div className="form-section">
            <div>
              <div className="addpet-title">
                Giống:
                <input
                  type="text"
                  name="petBreed"
                  value={pet.petBreed}
                  onChange={updatePet}
                  className="addpet-input"
                ></input>
              </div>
              <div className="addpet-title">
                Về giống:
                <input
                  type="text"
                  name="petDescription"
                  value={pet.petDescription}
                  onChange={updatePet}
                  className="addpet-input about-input"
                  multiple
                ></input>
              </div>
              <div className="addpet-title">
                Tên:
                <input
                  type="text"
                  name="petName"
                  value={pet.petName}
                  onChange={updatePet}
                  className="addpet-input"
                ></input>
              </div>
              <div className="addpet-title">
                Giới tính:
                <select
                  name="petGender"
                  className="addpet-input multivalue-section"
                  value={pet.petGender}
                  onChange={updatePet}
                  defaultChecked={true}
                >
                  <option value="Đực">Đực</option>
                  <option value="Cái">Cái</option>
                </select>
              </div>
              <div className="addpet-title">
                Tuổi thọ:
                <input
                  type="text"
                  name="petAge"
                  value={pet.petAge}
                  onChange={updatePet}
                  className="addpet-input"
                ></input>
              </div>
              <div className="addpet-title">
                Chiều cao:
                <input
                  type="text"
                  name="petHeight"
                  value={pet.petHeight}
                  onChange={updatePet}
                  className="addpet-input"
                ></input>
              </div>
              <div className="addpet-title">
                Cân nặng:
                <input
                  type="text"
                  name="petWeight"
                  value={pet.petWeight}
                  onChange={updatePet}
                  className="addpet-input"
                ></input>
              </div>
            </div>
            <div>
              <div className="addpet-title">
                Ảnh
                <br />
                {/* <input
                  type="file"
                  accept="image/*"
                  name="petImage"
                  onChange={onSelectedFile}
                  className="addpet-input"
                ></input> */}
                <Uploader value={img} updateImg={setImg} />
              </div>
              <div className="addpet-title">
                Xuất xứ:
                <input
                  type="text"
                  name="petOrigin"
                  value={pet.petOrigin}
                  onChange={updatePet}
                  className="addpet-input"
                ></input>
              </div>
              <div className="addpet-title">
                Tính cách:
                <input
                  type="text"
                  name="petCharacter"
                  value={pet.petCharacter}
                  onChange={updatePet}
                  className="addpet-input"
                ></input>
              </div>
              <div className="addpet-title">
                Giá:
                <input
                  type="text"
                  name="petPrice"
                  value={pet.petPrice}
                  onChange={updatePet}
                  className="addpet-input"
                ></input>
              </div>
            </div>
          </div>
          <div className="form-footer">
            <button className="form-add-btn" onClick={handleSubmit}>
              Thêm giống
            </button>
            <button className="form-exit-btn" onClick={action}>
              Thoát
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPet;
