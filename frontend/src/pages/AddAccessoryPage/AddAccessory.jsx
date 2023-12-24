import React, { useState } from 'react';
import './AddAccessory.css';
import axios from 'axios';
import Uploader from '../../components/Uploader/Uploader';

function AddAccessory(props) {
  const modalState = props.toggle;
  const action = props.action;
  const [img, setImg] = useState();
  const [accessory, setAccessory] = useState({
    accessoryName: '',
    accessoryDescription: '',
    accessoryPrice: '',
    accessoryImage: '',
  });

  const [url, setURL] = useState('http://localhost:7000/v1/accessory/addSizeSmall');
  const apiSizeSmall = 'http://localhost:7000/v1/accessory/addSizeSmall';
  const apiSizeMedium = 'http://localhost:7000/v1/accessory/addSizeMedium';
  const apiSizeLarge = 'http://localhost:7000/v1/accessory/addSizeLarge';

  const updateAccessory = (e) => {
    const fieldName = e.target.name;
    setAccessory((existingValue) => ({
      ...existingValue,
      [fieldName]: e.target.value,
    }));
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const formD = new FormData();
    //tên khách hàng
    formD.append('name', document.getElementById('accessoryName').value);
    formD.append('price', document.getElementById('accessoryPrice').value);
    formD.append('description', document.getElementById('accessoryDescription').value);
    formD.append('color_id', '648c44681bd8c3e10049c93c');
    formD.append('product_type', 'Accessory');
    formD.append('image_url', img);
    axios.post(url, formD).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  return (
    <div className={`bg-modal ${modalState ? 'modal-active' : ''}`}>
      <div id="addpet-section">
        <h1>Thêm phụ kiện</h1>
        <form>
          <div className="food-form-section food-form2">
            <div id="food-section-left">
              <div className="addpet-title">
                Tên phụ kiện:
                <input type="text" name="accessoryName" id="accessoryName" className="addpet-input"></input>
              </div>
              <br />
              <div className="addpet-title">
                Mô tả phụ kiện:
                <textarea
                  className="addpet-input description"
                  name="accessoryDescription"
                  id="accessoryDescription"
                ></textarea>
              </div>
              <br />
              <div className="addpet-title">
                Kích cỡ phụ kiện:
                <select
                  name="accessorySize"
                  id="accessorySize"
                  className="addpet-input multivalue-section"
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
                Giá phụ kiện:
                <input type="text" name="accessoryPrice" id="accessoryPrice" className="addpet-input"></input>
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

export default AddAccessory;
