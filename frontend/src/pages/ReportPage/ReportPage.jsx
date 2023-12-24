import React, { useEffect, useState } from 'react';
import './ReportPage.css';
import axios from 'axios';

function ReportPage() {
  const [orderList, setOrderList] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  var revenue = 0;
  useEffect(() => {
    axios.get('http://localhost:7000/v1/order/getAllOrder').then((res) => {
      setOrderList(res.data);
    });
  }, [orderList]);

  orderList.map((order) => (revenue += order.subtotal));
  return (
    <div>
      <div className="year-filter">
        <div className="revenue">
          <span className="revenue-label">Doanh thu :</span>
          <span className="revenue-amount">{revenue} VNĐ</span>
        </div>
      </div>
      <div className="order_container">
        {orderList.map((order, key) => {
          const products = order.product_id?.map((product, key) => (
            <React.Fragment key={key}>
              {key + 1}. {product.name}
              <br />
            </React.Fragment>
          ));
          return (
            <div className="card-report-item" key={key}>
              {/* {console.log(products)} */}
              <div className="invoice-code">Mã: {order.order_id._id}</div>
              <div className="product-name">{products}</div>
              <div className="total-amount">{order.subtotal} VNĐ</div>
              <div className="payment-date">{order.order_id.date}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ReportPage;
