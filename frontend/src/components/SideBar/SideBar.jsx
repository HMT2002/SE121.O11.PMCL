import React, { useState } from "react";
import shoplogo from "../../images/logoshop.png";
import "./SideBar.css";
import accessory from "../../images/accessories.png";
import paw from "../../images/pawprint.png";
import food from "../../images/pet-food.png";
import phone from "../../images/phone-call.png";
import cart from "../../images/cartt.png"
import revenue from "../../images/analytics.png"
import { Link, Outlet } from "react-router-dom";

function SideBar() {
  const [petCLicked, setPetClicked] = useState(true)
  const [foodCLicked, setFoodClicked] = useState(false)
  const [accessoryCLicked, setAccessoryClicked] = useState(false)
  const [serviceCLicked, setServiceClicked] = useState(false)
  const [cartCLicked, setCartClicked] = useState(false)
  const [reportCLicked, setReportClicked] = useState(false)

  const updateSidebar = (e) => {
    console.log(e)
    if (e==="pet") {
      setPetClicked(true)
      setFoodClicked(false)
      setAccessoryClicked(false)
      setServiceClicked(false)
      setCartClicked(false)
      setReportClicked(false)
    }
    else if (e==="food") {
      setPetClicked(false)
      setFoodClicked(true)
      setAccessoryClicked(false)
      setServiceClicked(false)
      setCartClicked(false)
      setReportClicked(false)
    }
    else if (e==="accessory") {
      setPetClicked(false)
      setFoodClicked(false)
      setAccessoryClicked(true)
      setServiceClicked(false)
      setCartClicked(false)
      setReportClicked(false)
    }
    else if (e==="cart") {
      setPetClicked(false)
      setFoodClicked(false)
      setAccessoryClicked(false)
      setServiceClicked(false)
      setCartClicked(true)
      setReportClicked(false)
    }
    else if (e==="report") {
      setPetClicked(false)
      setFoodClicked(false)
      setAccessoryClicked(false)
      setServiceClicked(false)
      setCartClicked(false)
      setReportClicked(true)
    }
    else if (e==="service") {
      setPetClicked(false)
      setFoodClicked(false)
      setAccessoryClicked(false)
      setServiceClicked(true)
      setCartClicked(false)
      setReportClicked(false)
    }
  }

  return (
    <div>
      <div id="sidebar-section">
        <div id="sidebar-header">
          <img src={shoplogo} alt="a logo with a brown dog" />
        </div>
        <div id="sidebar-body">
          <div className={`sb-item ${petCLicked ? "sb-item--clicked" : ""}`} onClick={() => updateSidebar("pet")}>
            <img src={paw} alt="" />
            <Link to={"/petpage"}>Thú cưng</Link>
          </div>
          <div className={`sb-item ${foodCLicked ? "sb-item--clicked" : ""}`} onClick={() => updateSidebar("food")}>
            <img src={food} alt="" />
            <Link to={"/foodpage"}>Thức ăn</Link>
          </div>
          <div className={`sb-item ${accessoryCLicked ? "sb-item--clicked" : ""}`} onClick={() => updateSidebar("accessory")}>
            <img src={accessory} alt="" />
            <Link to={"/accessorypage"}>Phụ kiện</Link>
          </div>
          <div className={`sb-item ${serviceCLicked ? "sb-item--clicked" : ""}`} onClick={() => updateSidebar("service")}>
            <img src={phone} alt="" />
            <Link to={"/servicepage"}>Dịch vụ</Link>
          </div>
          <div className={`sb-item ${cartCLicked ? "sb-item--clicked" : ""}`} onClick={() => updateSidebar("cart")}>
            <img src={cart} alt="" />
            <Link to={"/cartpage"}>Giỏ hàng</Link>
          </div>
          <div className={`sb-item ${reportCLicked ? "sb-item--clicked" : ""}`} onClick={() => updateSidebar("report")}>
            <img src={revenue} alt="" />
            <Link to={"/reportpage"}>Doanh thu</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
