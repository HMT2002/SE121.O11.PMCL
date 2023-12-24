import React, { useEffect, useState } from 'react';
import './AccessoryDetail.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import dogimage from '../../images/golden.png';

export default function AccessoryDetail() {
  const { id } = useParams();
  const [accessoryName, setAccessoryName] = useState([]);
  const [accessoryDescription, setAccessoryDescription] = useState([]);
  const [accessoryImage, setAccessoryImage] = useState([]);
  const [accessoryPrice, setAccessoryPrice] = useState([]);
  const [accessorySize, setAccessorySize] = useState('');

  const deleteAccessory = (event) => {
    event.preventDefault();
    axios.delete('http://localhost:7000/v1/accessory/deleteAccessory/' + id).then(
      (res) => {
        alert('Xóa thành công');
        window.location.href = 'http://localhost:3000/accessorypage';
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    axios.get('http://localhost:7000/v1/accessory/readAccessory/' + id).then((res) => {
      let accessoryData = res.data;
      console.log(res.data);
      setAccessoryName(accessoryData.Product.name);
      setAccessoryDescription(accessoryData.Product.description);
      setAccessoryPrice(accessoryData.accessory.price);
      setAccessorySize(accessoryData.accessory.size_id.name);
      setAccessoryImage(accessoryData.Product.image_url);
      // console.log(1)
    });
  }, []);

  const updateAccessory = (event) => {
    event.preventDefault();
    axios
      .put('http://localhost:7000/v1/accessory/updateAccessory/' + id, {
        accessory: {
          price: document.getElementById('accessoryPrice').value,
          // flavour_id: document.getElementById("foodFlavour").value
        },
        product: {
          name: document.getElementById('accessoryName').value,
          description: document.getElementById('foodDescription').value,
        },
      })
      .then(
        (res) => {
          alert('Chỉnh sửa thành công');
          //   window.location.href = "http://localhost:3000/foodpage";
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const linkImageAccessory = 'http://localhost:7000/' + accessoryImage;

  return (
    <div className="dog-bg-modal">
      <div className="modal-content">
        <div className="food-content-header">
          <div className="food-header-left">
            <img src={linkImageAccessory} alt="golden-dog" />
          </div>
          <div className="food-header-right">
            <div>
              <p className="food-detail-title">Tên phụ kiện: </p>
              <input className="subtitle-information" id="accessoryName" defaultValue={accessoryName}></input>
            </div>
            <div>
              <p className="food-detail-title">Giá:</p>

              <input
                // type="textarea"
                className="subtitle-information"
                id="accessoryPrice"
                defaultValue={accessoryPrice}
                // onChange={(value) => {setPetPrice(value); console.log(value)}}
              >
                {/* {petBreed} */}
              </input>
            </div>

            <div>
              <p className="food-detail-title">Kích cỡ:</p>
              <select
                name="accessorySize"
                className="addpet-input multivalue-section food-detail-information"
                value={accessorySize}
                id="accessorySize"
              >
                <option value="S" onClick={() => setAccessorySize('S')}>
                  S
                </option>
                <option value="M" onClick={() => setAccessorySize('M')}>
                  M
                </option>
                <option value="L" onClick={() => setAccessorySize('L')}>
                  L
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="food-content-body">
          <p className="food-detail-title">Mô tả sản phẩm:</p>
          <div className="food-body-description">
            <textarea
              type="textarea"
              className="subtitle-information information-description "
              defaultValue={accessoryDescription}
              id="foodDescription"
            >
              {/* {petBreed} */}
            </textarea>
          </div>
        </div>
        <div className="content-footer">
          {/* <button id="btn-modify">Chỉnh sửa</button> */}
          <button id="btn-save" onClick={updateAccessory}>
            Lưu
          </button>
          <button id="btn-delete" onClick={deleteAccessory}>
            Xóa
          </button>
          <button id="btn-close">
            <Link to="/accessorypage">Thoát</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
