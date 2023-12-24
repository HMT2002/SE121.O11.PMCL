import React, { useState, useEffect } from 'react';
import './Home.css';
import addicon from '../../images/pet-icon.png';
import Card from '../../components/Card/Card';
import CustomPopup from '../../components/popup/CustomPopup';
import AddPet from '../AddPetPage/AddPet';
import axios from 'axios';

function Home() {
  const [modalState, setmodalState] = useState(false);
  const [petList, setPetList] = useState([]);
  const [img, setImg] = useState();
  const [countPet, setCountPet] = useState();

  // useEffect(() => {
  //   axios.get("http://localhost:7000/v1/pet/readAllPet").then((res) => {
  //     setPetList(res.data)
  //   });
  // }, []);

  useEffect(() => {
    let val = document.getElementById('search-input').value;
    // console.log(val)
    if (val !== '') {
      // // console.log(1)
      axios
        .post('http://localhost:7000/v1/pet/searchPet', {
          namePet: val,
        })
        .then((res) => {
          // console.log(1)
          // console.log(res.data)
          setPetList(res.data);
        });
    } else {
      axios.get('http://localhost:7000/v1/pet/readAllPet').then((res) => {
        setPetList(res.data);
      });
    }
    axios.get('http://localhost:7000/v1/pet/countPet').then((res) => {
      setCountPet(res.data);
    });
  }, [petList]);

  //open popup
  function openModal(event) {
    event.preventDefault();
    setmodalState(!modalState);
  }

  const [pet, setPet] = useState({
    petBreed: '',
    petName: '',
    petDescription: '',
    petHeight: '',
    petWeight: '',
    petImage: '',
    petOrigin: '',
    petCharacter: '',
    petAge: '',
    petPrice: '',
    petGender: 'Đực',
  });

  const updatePet = (e) => {
    const fieldName = e.target.name;
    setPet((existingValues) => ({
      ...existingValues,
      [fieldName]: e.target.value,
    }));
  };

  return (
    <div className="home-section">
      <div className="home-search">
        <input id="search-input" type="text" placeholder="Tìm kiếm ..." />
        <div id="home-btn">
          <p id="add-btn" onClick={openModal}>
            Thêm
          </p>
          <img id="add-icon" src={addicon} alt="add pet icon" />
        </div>
      </div>
      <div className="pet-amount">Số lượng : {countPet}</div>
      <div id="home-container">
        {petList.map((petItem, key) => {
          return <Card petI={petItem} cardtype="pet" key={key} id={petItem._id} />;
        })}
      </div>
      <AddPet pet={pet} toggle={modalState} action={openModal} addpet={updatePet} />
    </div>
  );
}

export default Home;
