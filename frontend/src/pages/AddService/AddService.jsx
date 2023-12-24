import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Uploader from '../../components/Uploader/Uploader';
import ServiceType from '../../components/ServiceType/ServiceType';
import './AddService.css';

import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import { MdCalculate } from 'react-icons/md';

function AddService(props) {
  const [img, setImg] = useState();
  const [serviceDescription, setServiceDescription] = useState('');
  let spaDes = 'Spa cho thú cưng';
  let housesittingDes = 'Chăm sóc thú cưng tại nhà riêng';
  let petwalkingDes = 'Đi bộ với thú cưng';
  let boardingDes = 'Nhận chăm sóc thú cưng tại cửa hàng';
  let daycareDes = 'Chăm sóc thú cưng theo giờ trong ngày';
  //click vào dịch vụ
  const [serviceClicked, setServiceClicked] = useState(false);
  const [serviceClicked1, setServiceClicked1] = useState(false);
  const [serviceClicked2, setServiceClicked2] = useState(false);
  const [serviceClicked3, setServiceClicked3] = useState(false);
  const [serviceClicked4, setServiceClicked4] = useState(false);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState('1');
  const [oldQuantityPrice, setOldQuantityPrice] = useState(1);
  let servicePrice = 250000;
  let sitting = 1000000;
  let boarding = 2200000;
  const [sittingServicePrice, setSittingServicePrice] = useState(0);
  const [boardServicePrice, setBoardingServicePrice] = useState(0);
  //cài đặt cho DatePicker React
  const [startDate, setStartDate] = useState(new Date());
  const [startDate1, setStartDate1] = useState(new Date());
  const [diffDate, setDiffDate] = useState();
  //cài đặt popup
  const modalState = props.toggle;
  const action = props.action;

  //dữ liệu
  const [customerName, setCustomerName] = useState('customer');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formD = new FormData();
    //tên khách hàng
    formD.append('name', document.getElementById('customerName').value);
    formD.append('price', price);
    formD.append('status', 'pending');
    // lấy duration làm phone number
    formD.append('duration', document.getElementById('customerPhone').value);
    formD.append('description', document.getElementById('serviceDescription').value);
    formD.append('product_type', 'Service');
    formD.append('startTime', startDate);
    formD.append('endTime', startDate1);
    formD.append('numPets', oldQuantityPrice);
    formD.append('customerAddress', document.getElementById('customerAddress').value);
    formD.append('image_url', img);
    axios.post('http://localhost:7000/v1/service/add', formD).then(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // tính ra số ngày
  useEffect(() => {
    // tính ra milisecond

    let dates = Math.abs(startDate1 - startDate);
    dates = Math.round(dates / (3600000 * 24));
    if (dates === 0) dates = 1;
    setDiffDate(dates);
  });

  // useEffect(() => {
  //   setPrice(price)
  // })

  const calculatePrice = () => {
    let val = price;
    if (serviceClicked === true) {
      if (price >= sittingServicePrice) {
        val = price - sittingServicePrice;
      }
      val = val + sitting * diffDate;
      setPrice(val);
      setSittingServicePrice(sitting * diffDate);
    }
    if (serviceClicked3 === true) {
      if (price >= boardServicePrice) {
        val = price - boardServicePrice;
      }
      val = val + boarding * diffDate;
      setPrice(val);
      setBoardingServicePrice(boarding * diffDate);
    }
    if (quantity === '1') {
      val = val / oldQuantityPrice;
      val = val * 1;
      setPrice(val);
      setOldQuantityPrice(1);
    } else if (quantity === '2') {
      val = val / oldQuantityPrice;
      val = val * 2;
      setPrice(val);
      setOldQuantityPrice(2);
    } else if (quantity === '3+') {
      val /= oldQuantityPrice;
      let temp = 1;
      temp = document.getElementById('quantityGreaterThan3').value;
      val *= temp;
      setPrice(val);
      setOldQuantityPrice(temp);
    }
  };

  const updateService = () => {
    setServiceClicked(!serviceClicked);
    if (serviceClicked === false) {
      // setPrice(price + sitting);
      setServiceDescription((serviceDescription + '\n' + housesittingDes).trimStart());
    } else if (serviceClicked === true) {
      // setPrice(price - sitting);
      // setServiceDescription(serviceDescription - housesittingDes)
      // let val = price - sitting * oldQuantityPrice * diffDate
      // setPrice(val);
    }
  };

  const updateService1 = () => {
    setServiceClicked1(!serviceClicked1);
    if (serviceClicked1 === false) {
      if (oldQuantityPrice !== 1) {
        let val = price + servicePrice * oldQuantityPrice;
        setPrice(val);
      } else setPrice(price + servicePrice);
      setServiceDescription((serviceDescription + '\n' + petwalkingDes).trimStart());
    } else if (serviceClicked1 === true) {
      if (serviceClicked === true || serviceClicked3 === true) {
        let val = price - oldQuantityPrice * servicePrice;
        setPrice(val);
      } else setPrice(price - servicePrice);
    }
  };

  const updateService2 = () => {
    setServiceClicked2(!serviceClicked2);
    if (serviceClicked2 === false) {
      if (oldQuantityPrice !== 1) {
        let val = price + servicePrice * oldQuantityPrice;
        setPrice(val);
      } else setPrice(price + servicePrice);
      setServiceDescription((serviceDescription + '\n' + spaDes).trimStart());
    } else if (serviceClicked2 === true) {
      if (serviceClicked === true || serviceClicked3 === true) {
        let val = price - oldQuantityPrice * servicePrice;
        setPrice(val);
      } else setPrice(price - servicePrice);
    }
  };

  const updateService3 = () => {
    setServiceClicked3(!serviceClicked3);
    if (serviceClicked3 === false) {
      // setPrice(price + boarding);
      setServiceDescription((serviceDescription + '\n' + boardingDes).trimStart());
    } else if (serviceClicked3 === true) {
      // setPrice(price - boarding);
    }
  };

  const updateService4 = () => {
    setServiceClicked4(!serviceClicked4);
    if (serviceClicked4 === false) {
      if (oldQuantityPrice !== 1) {
        let val = price + servicePrice * oldQuantityPrice;
        setPrice(val);
      } else setPrice(price + servicePrice);
      setServiceDescription((serviceDescription + '\n' + daycareDes).trimStart());
    } else if (serviceClicked4 === true) {
      if (serviceClicked === true || serviceClicked3 === true) {
        let val = price - oldQuantityPrice * servicePrice;
        setPrice(val);
      } else setPrice(price - servicePrice);
    }
  };

  const handlerChangeDes = (e) => {
    let description = document.getElementById('serviceDescription').value;
    setServiceDescription(description);
  };

  return (
    //đg test
    <div className={`bg-modal ${modalState ? 'modal-active' : ''}`}>
      <div id="addpet-section">
        <h1>Thêm dịch vụ</h1>
        <form>
          <div className="food-form-section" id="service-form-header">
            <div className="addpet-title">
              Chọn loại dịch vụ
              <div className="service-container">
                <ServiceType isClicked={serviceClicked} action={updateService} serviceType="housesitting" />
                <ServiceType isClicked={serviceClicked1} action={updateService1} serviceType="petwalking" />
                <ServiceType isClicked={serviceClicked2} action={updateService2} serviceType="petspa" />
                <ServiceType isClicked={serviceClicked3} action={updateService3} serviceType="boarding" />
                <ServiceType isClicked={serviceClicked4} action={updateService4} serviceType="petdaycare" />
              </div>
            </div>
            <br />
            <div className="addpet-title">
              Tên khách hàng?
              <input
                type="text"
                name="customerName"
                // value={food.foodDescription}
                // onChange={(value) => {setName(value)}}
                className="addpet-input"
                id="customerName"
              ></input>
            </div>
            <br />
            <div className="addpet-title">
              Địa chỉ khách hàng?
              <input
                type="text"
                name="customerAddress"
                // value={food.foodDescription}
                // onChange={updateFood}
                className="addpet-input"
                id="customerAddress"
              ></input>
            </div>
            <br />
            <div className="addpet-title">
              Số điện thoại khách hàng?
              <input
                type="text"
                name="customerPhone"
                // value={food.foodDescription}
                // onChange={updateFood}
                className="addpet-input"
                id="customerPhone"
              ></input>
            </div>
            <br />
            <div className="addpet-title">
              Ảnh thú cưng:
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
              Chi tiết dịch vụ?
              <textarea
                name="serviceDescription"
                // value={food.foodDescription}
                // onChange={updateFood}
                onChange={handlerChangeDes}
                className="addpet-input"
                // inputMode
                // value={serviceDescription}
                value={serviceDescription}
                id="serviceDescription"
              ></textarea>
            </div>
            <br />
            <div className="datepicker-container">
              <div className="addpet-title">
                Thời gian bạn đặt Sitting, Boarding?
                <div className="addpet-title date-container">
                  <DatePicker
                    selected={startDate}
                    //   onSelect={handleDateSelect} //when day is clicked
                    onChange={(date) => {
                      setStartDate(date);
                    }} //only when value has changed
                    showTimeSelect
                    dateFormat="Pp"
                    className="datetime"
                  />
                </div>
              </div>
              <div className="addpet-title">
                Thời gian muốn kết thúc Sitting, Boarding?
                <div className="addpet-title date-container">
                  <DatePicker
                    selected={startDate1}
                    //   onSelect={handleDateSelect} //when day is clicked
                    onChange={(date) => {
                      setStartDate1(date);
                    }} //only when value has changed
                    showTimeSelect
                    dateFormat="Pp"
                    className="datetime"
                  />
                </div>
              </div>
            </div>
            <br />
            <div className="addservice-numprice">
              <div className="addpet-title">
                Số lượng thú bạn muốn gửi?
                <select
                  name="petQuantity"
                  className="addpet-input multivalue-section"
                  // value={food.foodFlavour}

                  value={quantity}
                >
                  <option value="1" onClick={() => setQuantity('1')}>
                    1
                  </option>
                  <option value="2" onClick={() => setQuantity('2')}>
                    2
                  </option>
                  <option value="3+" onClick={() => setQuantity('3+')}>
                    3+
                  </option>
                </select>
              </div>
              <br />
              <div className="addpet-title">
                Giá dịch vụ:
                <input
                  type="text"
                  name="foodPrice"
                  // value={food.foodPrice}
                  // onChange={updateFood}
                  className="addpet-input"
                  value={price}
                ></input>
              </div>
            </div>
            {quantity === '3+' ? (
              <div className="addpet-title">
                Nhập số lượng?
                <input className="addpet-input" id="quantityGreaterThan3" />{' '}
              </div>
            ) : (
              ''
            )}
            <br />
          </div>

          <div className="form-footer">
            <button className="form-add-btn" onClick={handleSubmit}>
              Thêm
            </button>
            <button className="form-exit-btn" onClick={action}>
              Thoát
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                calculatePrice();
              }}
            >
              Tính
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddService;
