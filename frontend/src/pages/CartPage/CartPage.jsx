import React, { useEffect, useState } from 'react';
import './CartPage.css';
import image from '../../images/golden.png';
import axios from 'axios';

function CartPage() {
  const productList = [];
  const [petList, setPetList] = useState();
  const [foodList, setFoodList] = useState();
  const [accessoryList, setAccessoryList] = useState();
  const product_ids = [];
  var subtotal = 0;

  const account_id = '64461d96abb7f27194574b94';

  const currentDate = new Date();
  const day = currentDate.getDate().toString().padStart(2, '0');
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const year = currentDate.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  useEffect(() => {
    axios.get('http://localhost:7000/v1/account/cartContainPet/64461d96abb7f27194574b94').then((res) => {
      setPetList(res.data);
    });
    axios.get('http://localhost:7000/v1/account/cartContainFood/64461d96abb7f27194574b94').then((res) => {
      setFoodList(res.data);
    });
    axios.get('http://localhost:7000/v1/account/cartContainAccessory/64461d96abb7f27194574b94').then((res) => {
      setAccessoryList(res.data);
    });
  }, []);

  petList?.map((pet) => {
    productList.push({
      id: pet._id,
      name: pet.name,
      des: pet.description,
      image: pet.image_url,
      price: pet.petData.price,
    });
    product_ids.push(pet._id);
  });

  foodList?.map((food) => {
    productList.push({
      id: food._id,
      name: food.name,
      des: food.description,
      image: food.image_url,
      price: food.foodData.price,
    });
    product_ids.push(food._id);
  });

  accessoryList?.map((accessory) => {
    productList.push({
      id: accessory._id,
      name: accessory.name,
      des: accessory.description,
      image: accessory.image_url,
      price: accessory.accessoryData.price,
    });
    product_ids.push(accessory._id);
  });

  productList.map((product) => {
    subtotal += product.price;
  });

  const orderHandle = () => {
    axios.post('http://localhost:7000/v1/order/order', {
      date: formattedDate,
      account_id: account_id,
      product_id: product_ids,
      subtotal: subtotal,
    });
    axios.put('http://localhost:7000/v1/account/deleteAllProductsInCart/64461d96abb7f27194574b94');
    alert('Thanh toán thành công');
    window.location.reload();
  };

  const deleteProductHandle = (product_id) => {
    axios.put('http://localhost:7000/v1/account/deleteProductInCart/64461d96abb7f27194574b94', {
      product_id: product_id,
    });
    alert('Đã xóa sản phẩm ra khỏi giỏ hàng');
    window.location.reload();
  };

  console.log(product_ids);

  return (
    <div className="cart_container">
      {productList.map((product, key) => {
        const image_url = 'http://localhost:7000/' + product.image;
        return (
          <div className="product-card" key={key}>
            <img src={image_url} alt={''} className="product-card__image" />

            <div className="product-card__details">
              <h2 className="product-card__name">{product.name}</h2>
              <p className="product-card__description">{product.des}</p>
              <p className="product-card__price">Giá : {product.price}</p>
            </div>

            <button onClick={() => deleteProductHandle(product.id)} className="btn_remove">
              Xóa
            </button>
          </div>
        );
      })}
      <div className="footer">
        <span className="footer_subtotal">Total: {subtotal} VNĐ</span>
        <button className="btn_payment" onClick={orderHandle}>
          Thanh toán ngay
        </button>
      </div>
    </div>
  );
}

export default CartPage;
