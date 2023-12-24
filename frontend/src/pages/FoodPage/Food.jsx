import React, { useEffect, useState } from 'react';
import './Food.css';
import addicon from '../../images/pet-icon.png';
import Card from '../../components/Card/Card';
import axios from 'axios';
import AddFood from '../AddFoodPage/AddFood';

function Food() {
  const [foodList, setFoodList] = useState([]);
  const [modalState, setmodalState] = useState(false);
  const [countFood, setCountFood] = useState();
  const [food, setFood] = useState({
    foodName: '',
    foodSize: '',
    foodDescription: '',
    foodFlavour: '',
    foodPrice: '',
    foodImage: '',
  });

  const updateFood = (e) => {
    const fieldName = e.target.name;
    setFood((existingValues) => ({
      ...existingValues,
      [fieldName]: e.target.value,
    }));
  };

  function openModal(event) {
    event.preventDefault();
    setmodalState(!modalState);
  }

  // useEffect(() => {
  //   axios.get("http://localhost:7000/v1/food/readAllFood").then((res) => {
  //     setFoodList(res.data)
  //   });
  // }, [foodList]);

  useEffect(() => {
    let val = document.getElementById('search-input').value;
    // console.log(val)
    if (val !== '') {
      // // console.log(1)
      axios
        .post('http://localhost:7000/v1/food/searchFood', {
          nameFood: val,
        })
        .then((res) => {
          // console.log(1)
          // console.log(res.data)
          setFoodList(res.data);
        });
    } else {
      axios.get('http://localhost:7000/v1/food/readAllFood').then((res) => {
        setFoodList(res.data);
      });
    }
    axios.get('http://localhost:7000/v1/food/countFood').then((res) => {
      setCountFood(res.data);
    });
  }, [foodList]);

  return (
    <div className="home-section">
      <div className="home-search">
        <input id="search-input" type="text" placeholder="Tìm kiếm ..." />
        <div id="home-btn" onClick={openModal}>
          <p>Thêm</p>
          <img id="add-icon" src={addicon} alt="add pet icon" />
        </div>
      </div>
      <div className="pet-amount">Số lượng : {countFood}</div>
      <div id="home-container">
        {foodList.map((foodItem, key) => {
          return <Card cardtype="food" foodI={foodItem} key={key} id={foodItem._id} />;
        })}
      </div>
      <AddFood food={food} toggle={modalState} action={openModal} addfood={updateFood} />
    </div>
  );
}

export default Food;
