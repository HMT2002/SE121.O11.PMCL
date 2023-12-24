import React, { useEffect, useState } from 'react';
import './Accessory.css';
import addicon from '../../images/pet-icon.png';
import Card from '../../components/Card/Card';
import axios from 'axios';
import AddAccessory from '../AddAccessoryPage/AddAccessory';

function Accessory() {
  const [accessoryList, setAccessoryList] = useState([]);
  const [modalState, setmodalState] = useState(false);
  const [countAccessory, setCountAccessory] = useState();

  const [accessory, setAccessory] = useState({
    accessoryName: '',
    accessoryDescription: '',
    accessoryPrice: '',
    accessoryImage: '',
  });

  const updateAccessory = (e) => {
    const fieldName = e.target.name;
    setAccessory((existingValue) => ({
      ...existingValue,
      [fieldName]: e.target.value,
    }));
  };

  function openModal(event) {
    event.preventDefault();
    setmodalState(!modalState);
  }
  // useEffect(() => {
  //   axios.get("http://localhost:7000/v1/accessory/readAllAccessory").then((res) => {
  //     setAccessoryList(res.data)
  //   });
  // }, [accessoryList]);

  useEffect(() => {
    let val = document.getElementById('search-input').value;
    // console.log(val)
    if (val !== '') {
      // // console.log(1)
      axios
        .post('http://localhost:7000/v1/accessory/searchAccessory', {
          nameAccessory: val,
        })
        .then((res) => {
          // console.log(1)
          // console.log(res.data)
          setAccessoryList(res.data);
        });
    } else {
      axios.get('http://localhost:7000/v1/accessory/readAllAccessory').then((res) => {
        setAccessoryList(res.data);
      });
    }
    axios.get('http://localhost:7000/v1/accessory/count').then((res) => {
      setCountAccessory(res.data);
    });
  }, [accessoryList]);

  return (
    <div className="home-section">
      <div className="home-search">
        <input id="search-input" type="text" placeholder="Tìm kiếm ..." />
        <div id="home-btn" onClick={openModal}>
          <p>Thêm</p>
          <img id="add-icon" src={addicon} alt="add pet icon" />
        </div>
      </div>
      <div className="pet-amount">Số lượng : {countAccessory}</div>
      <div id="home-container">
        {accessoryList.map((accessoryItem, key) => {
          return <Card cardtype="accessory" accessoryI={accessoryItem} key={key} id={accessoryItem._id} />;
        })}
      </div>
      <AddAccessory toggle={modalState} action={openModal} />
    </div>
  );
}

export default Accessory;
