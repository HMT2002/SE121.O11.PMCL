import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Uploader from '../../components/Uploader/Uploader';
import ServiceType from '../../components/ServiceType/ServiceType';
import './ServiceDetail.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link, useParams } from 'react-router-dom';

function ServiceDetail(props) {
  const { id } = useParams();
  const [img, setImg] = useState();

  //dữ liệu
  const [customerName, setCustomerName] = useState();
  const [serviceStatus, setServiceStatus] = useState();
  const [serviceDescription, setServiceDescription] = useState();
  const [customerPhone, setCustomerPhone] = useState();
  const [customerAddress, setCustomerAddress] = useState();
  const [_id, set_id] = useState();

  const handleUpdate = (event) => {
    event.preventDefault();
    let status = document.getElementById('serviceStatus').value;
    if (status === 'Đang chờ') {
      status = 'pending';
    } else if (status === 'Hoàn thành') {
      status = 'complete';
    }
    axios
      .put('http://localhost:7000/v1/service/updateService/' + id, {
        service: {
          status: status,
          //phone
          duration: document.getElementById('customerPhone').value,
          customerAddress: document.getElementById('customerAddress').value,
        },
        product: {
          name: document.getElementById('customerName').value,
          description: document.getElementById('serviceDescription').value,
        },
      })
      .then(
        (res) => {
          alert('Chỉnh sửa thành công');
          // window.location.href = "http://localhost:3000/foodpage";
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    axios.get('http://localhost:7000/v1/service/readService/' + id).then((res) => {
      if (res.data.service === null) return;
      let serviceData = res.data;
      setCustomerName(serviceData.product.name);
      setCustomerPhone(serviceData.service.duration);
      setCustomerAddress(serviceData.service.customerAddress);
      set_id(serviceData.product._id);
      if (serviceData.service.status === 'pending') {
        setServiceStatus('Đang chờ');
      } else if (serviceData.service.status === 'complete') {
        setServiceStatus('Hoàn thành');
      }
      setServiceDescription(serviceData.product.description);
      setImg(serviceData.product.image_url);
    });
  }, []);

  const handlerChangeDes = (e) => {
    let description = document.getElementById('serviceDescription').value;
    setServiceDescription(description);
  };

  return (
    <div className={`bg-modal modal-active bg-modal-service`}>
      <div id="service-section" className="service-detail-section">
        <h1>Chi tiết dịch vụ</h1>
        <form>
          <div className="food-form-section" id="service-detail">
            <div>
              <div className="addpet-title">
                Tên khách hàng?
                <input
                  type="text"
                  name="customerName"
                  // value={food.foodDescription}
                  // onChange={(value) => {setName(value)}}
                  className="addpet-input"
                  id="customerName"
                  defaultValue={customerName}
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
                  defaultValue={customerAddress}
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
                  defaultValue={customerPhone}
                ></input>
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
              <div className="addpet-title">
                Tình trạng dịch vụ?
                <select
                  className="addpet-input multivalue-section food-detail-information"
                  value={serviceStatus}
                  id="serviceStatus"
                  style={{ color: 'black' }}
                >
                  <option value="Hoàn thành" onClick={() => setServiceStatus('Hoàn thành')}>
                    Hoàn thành
                  </option>
                  <option value="Đang chờ" onClick={() => setServiceStatus('Đang chờ')}>
                    Đang chờ
                  </option>
                </select>
              </div>
            </div>
            <div>
              <div className="addpet-title">
                <img src={'http://localhost:7000/' + img} alt="golden-dog" />
              </div>
            </div>
          </div>

          <div className="form-footer">
            <button className="form-add-btn" onClick={handleUpdate}>
              Cập nhật
            </button>
            <button className="form-exit-btn">
              <Link to="/servicepage">Thoát</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ServiceDetail;
