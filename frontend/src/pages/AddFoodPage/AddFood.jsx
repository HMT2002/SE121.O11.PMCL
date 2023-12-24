import React, { useState } from 'react';
import './AddFood.css';
import axios from 'axios';
import Uploader from '../../components/Uploader/Uploader';

function AddFood(props) {
  const [img, setImg] = useState();
  const modalState = props.toggle;
  const action = props.action;
  let food = props.food;
  let updateFood = props.addfood;
  const [size, setSize] = useState('S');

  const [url, setURL] = useState('http://localhost:7000/v1/food/addSizeSmall');
  const apiSizeSmall = 'http://localhost:7000/v1/food/addSizeSmall';
  const apiSizeMedium = 'http://localhost:7000/v1/food/addSizeMedium';
  const apiSizeLarge = 'http://localhost:7000/v1/food/addSizeLarge';

  const handleSubmit = (event) => {
    event.preventDefault();
    const formD = new FormData();
    formD.append('name', food.foodName);
    formD.append('size', food.foodSize);
    formD.append('description', food.foodDescription);
    formD.append('product_type', 'Food');
    formD.append('flavour', food.foodFlavour);
    // formD.append("gender", "Duc");
    formD.append('price', food.foodPrice);
    formD.append('image_url', img);
    alert(url);
    axios.post(url, formD).then(
      (response) => {
        alert('Thêm thành công');
        window.location.href = 'http://localhost:3000/foodpage';
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const updateSize = (sizeValue) => {
    if (sizeValue === 'S') {
      setURL(apiSizeSmall);
    } else if (sizeValue === 'M') {
      setURL(apiSizeMedium);
    } else if (sizeValue === 'L') {
      setURL(apiSizeLarge);
    }
  };

  const onSelectedFile = (e) => {
    setImg(e.target.files[0]);
    console.log(e.target.files[0]);
    console.log(img);
  };

  return (
    <div className={`bg-modal ${modalState ? 'modal-active' : ''}`}>
      {' '}
      <div id="addpet-section">
        <h1>Thêm món ăn</h1>
        <form>
          <div className="food-form-section food-form2">
            <div id="food-section-left">
              <div className="addpet-title">
                Tên món ăn:
                <input
                  type="text"
                  name="foodName"
                  value={food.foodName}
                  onChange={updateFood}
                  className="addpet-input"
                ></input>
              </div>
              <br />
              <div className="addpet-title">
                Mô tả món ăn:
                {/* <input
                  name="foodDescription"
                  value={food.foodDescription}
                  onChange={updateFood}
                  className="addpet-input"
                ></input> */}
                <textarea
                  className="addpet-input description"
                  name="foodDescription"
                  value={food.foodDescription}
                  onChange={updateFood}
                ></textarea>
              </div>
              <br />
              <div className="addpet-title">
                Kích cỡ món ăn:
                <select
                  name="foodSize"
                  className="addpet-input multivalue-section"
                  value={food.foodSize}
                  onChange={updateFood}
                  // onChange={(value) => {setSize()}}
                >
                  <option value="S" onClick={() => updateSize('S')}>
                    Nhỏ
                  </option>
                  <option value="M" onClick={() => updateSize('M')}>
                    Vừa
                  </option>
                  <option value="L" onClick={() => updateSize('L')}>
                    Lớn
                  </option>
                </select>
              </div>
              <br />
            </div>
            <div id="food-section-right">
              <div className="addpet-title">
                Ảnh:
                {/* <input
                type="file"
                accept="image/*"
                name="foodImage"
                value={food.foodImage}
                onChange={updateFood}
                className="addpet-input"
              ></input> */}
                <Uploader value={img} updateImg={setImg} />
              </div>
              <br />
              <div className="addpet-title">
                Hương vị món ăn:
                <select
                  name="foodFlavour"
                  className="addpet-input multivalue-section"
                  value={food.foodFlavour}
                  onChange={updateFood}
                >
                  <option value="Dâu">Dâu</option>
                  <option value="Vani">Vanila</option>
                  <option value="Sôcôla">Chocolate</option>
                </select>
              </div>
              <div></div>
              <br />
              <div className="addpet-title">
                Giá món ăn:
                <input
                  type="text"
                  name="foodPrice"
                  value={food.foodPrice}
                  onChange={updateFood}
                  className="addpet-input"
                ></input>
              </div>
              <br />
            </div>
          </div>
          <div className="form-footer">
            <button className="form-add-btn" onClick={handleSubmit}>
              Thêm
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

export default AddFood;
