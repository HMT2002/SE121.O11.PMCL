import React, { useEffect, useState } from 'react';
import './FoodDetail.css';
import dogimage from '../../images/golden.png';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function FoodDetail() {
  const { id } = useParams();
  const [foodName, setFoodName] = useState([]);
  const [foodFlavour, setFoodFlavour] = useState('');
  const [foodDescription, setFoodDescription] = useState([]);
  const [foodImage, setFoodImage] = useState('');
  const [foodPrice, setFoodPrice] = useState([]);
  const [foodSize, setFoodSize] = useState('');

  const deleteFood = (event) => {
    event.preventDefault();
    axios.delete('http://localhost:7000/v1/food/deleteFood/' + id).then(
      (res) => {
        alert('Xóa thành công');
        window.location.href = 'http://localhost:3000/foodpage';
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    axios.get('http://localhost:7000/v1/food/readFood/' + id).then((res) => {
      let foodData = res.data;
      setFoodName(foodData.Product.name);
      setFoodImage(foodData.Product.image_url);
      setFoodDescription(foodData.Product.description);
      setFoodFlavour(foodData.Food.flavour_id.name);
      setFoodSize(foodData.Food.size_id.name);
      setFoodPrice(foodData.Food.price);
      // console.log(1)
    });
  }, []);

  const updatePet = (event) => {
    event.preventDefault();
    axios
      .put('http://localhost:7000/v1/food/updateFood/' + id, {
        food: {
          price: document.getElementById('foodPrice').value,
          // flavour_id: document.getElementById("foodFlavour").value
        },
        product: {
          name: document.getElementById('foodName').value,
          description: document.getElementById('foodDescription').value,
        },
      })
      .then(
        (res) => {
          alert('Chỉnh sửa thành công');
          window.location.href = 'http://localhost:3000/foodpage';
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  const renderMultipleFlavour = () => {
    if (foodFlavour == 'Dâu') {
      return (
        <select
          name="foodSize"
          className="addpet-input multivalue-section food-detail-information"
          onChange={() => setFoodFlavour}
        >
          <option value="Dâu" selected>
            Dâu
          </option>
          <option value="Vani">Vanila</option>
          <option value="Sôcôla">Chocolate</option>
        </select>
      );
    } else if (foodFlavour == 'Vani') {
      return (
        <select
          name="foodSize"
          className="addpet-input multivalue-section food-detail-information"
          onChange={() => setFoodFlavour}
        >
          <option value="Dâu">Dâu</option>
          <option value="Vani" selected>
            Vanila
          </option>
          <option value="Sôcôla">Chocolate</option>
        </select>
      );
    } else if (foodFlavour == 'Sôcôla') {
      return (
        <select
          name="foodSize"
          className="addpet-input multivalue-section food-detail-information"
          onChange={() => setFoodFlavour}
        >
          <option value="Dâu">Dâu</option>
          <option value="Vani">Vanila</option>
          <option value="Sôcôla" selected>
            Chocolate
          </option>
        </select>
      );
    }
    return null;
  };

  function renderMultipleSize() {
    <select
      name="foodSize"
      className="addpet-input multivalue-section food-detail-information"
      onChange={(value) => {
        setFoodSize(value);
      }}
      value={foodSize}
    >
      <option value="S">Nhỏ</option>
      <option value="M">Vừa</option>
      <option value="L">Lớn</option>
    </select>;
  }

  return (
    <div className="dog-bg-modal">
      <div className="modal-content">
        <div className="food-content-header">
          <div className="food-header-left">
            <img src={'http://localhost:7000/' + foodImage} alt="golden-dog" />
          </div>
          <div className="food-header-right">
            <div>
              <p className="food-detail-title">Tên thức ăn: </p>
              <input className="subtitle-information" id="foodName" defaultValue={foodName}></input>
            </div>
            <div>
              <p className="food-detail-title">Giá:</p>
              <input
                // type="textarea"
                className="subtitle-information"
                id="foodPrice"
                defaultValue={foodPrice}
                // onChange={(value) => {setPetPrice(value); console.log(value)}}
              >
                {/* {petBreed} */}
              </input>
            </div>

            <div>
              <p className="food-detail-title">Kích cỡ:</p>
              <select
                name="foodSize"
                className="addpet-input multivalue-section food-detail-information"
                value={foodSize}
                id="foodSize"
              >
                <option value="S" onClick={() => setFoodSize('S')}>
                  S
                </option>
                <option value="M" onClick={() => setFoodSize('M')}>
                  M
                </option>
                <option value="L" onClick={() => setFoodSize('L')}>
                  L
                </option>
              </select>
            </div>
            <div>
              <p className="food-detail-title">Hương vị:</p>
              <select
                name="foodFlavour"
                className="addpet-input multivalue-section food-detail-information"
                // onChange={(value) => {setFoodFlavour(value); console.log(value)}}
                value={foodFlavour}
                id="foodFlavour"
              >
                <option value="Dâu" onClick={() => setFoodFlavour('Dâu')}>
                  Dâu
                </option>
                <option value="Vani" onClick={() => setFoodFlavour('Vani')}>
                  Vanila
                </option>
                <option value="Sôcôla" onClick={() => setFoodFlavour('Sôcôla')}>
                  Chocolate
                </option>
              </select>
              {/* {renderMultipleFlavour()} */}
            </div>
          </div>
        </div>
        <div className="food-content-body">
          <p className="food-detail-title">Mô tả sản phẩm:</p>
          <div className="food-body-description">
            <textarea
              type="textarea"
              className="subtitle-information information-description "
              defaultValue={foodDescription}
              id="foodDescription"
            >
              {/* {petBreed} */}
            </textarea>
          </div>
        </div>
        <div className="content-footer">
          {/* <button id="btn-modify">Chỉnh sửa</button> */}
          <button id="btn-save" onClick={updatePet}>
            Lưu
          </button>
          <button id="btn-delete" onClick={deleteFood}>
            Xóa
          </button>
          <button id="btn-close">
            <Link to="/foodpage">Thoát</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
