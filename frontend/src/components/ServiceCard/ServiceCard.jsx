import React, { useEffect, useState } from 'react';
import './ServiceCard.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ServiceCard(props) {
  let id = props.serviceI._id;
  const [service, setService] = useState(props.serviceI);
  const [customerName, setCustomerName] = useState();
  const [serviceStatus, setServiceStatus] = useState();
  const [serviceDescription, setServiceDescription] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [_id, set_id] = useState();

  useEffect(() => {
    axios.get('/v1/service/readService/' + id).then((res) => {
      if (res.data.service === null) return;
      let serviceData = res.data;
      setCustomerName(serviceData.product.name);
      set_id(serviceData.product._id);
      if (serviceData.service.status === 'pending') {
        setServiceStatus('Đang chờ');
      } else if (serviceData.service.status === 'complete') {
        setServiceStatus('Hoàn thành');
      }
      setServiceDescription(serviceData.product.description);
      let dateStr = serviceData.service.startTime;
      let myDate = new Date(dateStr);
      setStartDate(
        myDate.getHours() +
          ' giờ ' +
          myDate.getMinutes() +
          ' phút, ' +
          myDate.getDate() +
          ' / ' +
          myDate.getMonth() +
          ' / ' +
          myDate.getFullYear()
      );
      dateStr = serviceData.service.endTime;
      myDate = new Date(dateStr);
      setEndDate(
        myDate.getHours() +
          ' giờ ' +
          myDate.getMinutes() +
          ' phút, ' +
          myDate.getDate() +
          ' / ' +
          myDate.getMonth() +
          ' / ' +
          myDate.getFullYear()
      );
    });
  });

  const deleteService = () => {
    axios.delete('/v1/service/deleteService/' + _id).then(
      (res) => {
        alert('Xóa thành công');
        // window.location.href = "http://localhost:3000/servicepage";
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const updateStatus = () => {
    axios
      .put('/v1/service/updateService/' + id, {
        service: {
          status: 'complete',
          // flavour_id: document.getElementById("foodFlavour").value
        },
        product: {},
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

  return (
    <div className="service-card-container">
      {/* <div className="service-container-header">
        <img src="#" alt="service-logo" />
        <p className="service-body-title">House Sitting</p>
      </div> */}
      <div className="service-container-body">
        <div>
          <p>
            <span className="service-body-title">Tên: </span> {customerName}
          </p>
        </div>
        <div>
          <p className="service-body-title">Chi tiết dịch vụ:</p>
          {/* <textarea>{serviceDescription}</textarea> */}
          <textarea
            name="serviceDescription"
            className="addpet-input service-card--description"
            value={serviceDescription}
            id="serviceDescription"
            readOnly
          ></textarea>
        </div>
        <div>
          <p>
            <span className="service-body-title">Ngày đặt: </span> {startDate}
          </p>
          <p>
            <span className="service-body-title">Ngày kết thúc: </span> {endDate}
          </p>
        </div>
        <div>
          <p>
            <span className="service-body-title">Tình trạng: </span>
            {serviceStatus}
          </p>
        </div>
      </div>
      <div className="service-container-footer">
        <button id="service-container-accept" onClick={updateStatus}>
          Hoàn thành
        </button>
        <button id="service-container-accept" style={{ backgroundColor: '#FEBC37' }}>
          <Link style={{ textDecoration: 'none' }} className="linkText" to={'/detailservice/' + _id}>
            {' '}
            Chi tiết
          </Link>
        </button>
        <button id="service-container-decline" onClick={deleteService}>
          Từ chối
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
