import React, { useEffect, useState } from 'react';
import './Service.css';
import addicon from '../../images/pet-icon.png';
import Card from '../../components/Card/Card';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import AddService from '../AddService/AddService';
import axios from 'axios';
function Service() {
  const [modalState, setmodalState] = useState(false);
  const [serviceList, setServiceList] = useState([]);
  const [countService, setCountService] = useState();

  function openModal(event) {
    event.preventDefault();
    setmodalState(!modalState);
  }

  useEffect(() => {
    axios.get('http://localhost:7000/v1/service/readAllService').then(
      (res) => {
        setServiceList(res.data);
      },
      (err) => {
        console.log(err);
      }
    );
    axios.get('http://localhost:7000/v1/service/countService').then((res) => {
      setCountService(res.data);
    });
  }, [serviceList]);

  return (
    <div className="home-section">
      <div className="home-search">
        <input id="search-input" type="text" placeholder="Tìm kiếm ..." />
        <div id="home-btn" onClick={openModal}>
          <p>Thêm</p>
          <img id="add-icon" src={addicon} alt="add pet icon" />
        </div>
        <AddService toggle={modalState} action={openModal} />
      </div>
      <div className="pet-amount">Số lượng : {countService}</div>
      <div id="home-container">
        {serviceList.map((serviceItem) => {
          return <ServiceCard serviceI={serviceItem} />;
        })}
      </div>
    </div>
  );
}

export default Service;
