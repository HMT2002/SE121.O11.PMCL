import React, { useState, useEffect } from "react";
import "./ServiceType.css";
import  boarding from "../../images/Boarding.png";
import  dogwalking  from "../../images/dog-walking.png";
import  petcare  from "../../images/petcare.png";
import  housesitting from "../../images/house-sitting.png";
import petsupply from "../../images/pet-supplies.png";

export default function ServiceType(props) {
  const clickAction = props.action
  const isClicked = props.isClicked
  const serviceType = props.serviceType
  const [type, setType] = useState("Service Type")
  const [imgSrc, setImgSrc] = useState(petsupply)

  useEffect(() => {
    if (serviceType === "housesitting") {
      setType("House Sitting")
      setImgSrc(housesitting)
    }
    else if (serviceType === "petwalking") {
      setType("Pet Walking")
      setImgSrc(dogwalking)
    }
    else if (serviceType === "petspa") {
      setType("Pet Spa")
      setImgSrc(petsupply)
    }
    else if (serviceType === "boarding") {
      setType("Boarding")
      setImgSrc(boarding)
    }
    else if (serviceType === "petdaycare") {
      setType("Day Care")
      setImgSrc(petcare)
    }
  }, [])
  // serviceSelectedType()
  return (
    <div
      className={`service-type-container ${
        isClicked ? "service-type-container--clicked" : " "
      }`
    } onClick={clickAction}
    >
      <img src={imgSrc} alt="a service for pet" />
      <p>{type}</p>
    </div>
  );
}
