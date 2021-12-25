import React from 'react';
import './Invoice.css';

const Invoice = () => {
  return (
    <div className="page">
      <h1 className="f">HUFI FOOD.</h1>
      <img
        className="img"
        src="https://img.freepik.com/free-vector/illustration-circle-stamp-banner-vector_53876-27183.jpg?size=338&ext=jpg"
        align="right"
      />
      <p className="address"></p>
      <div className="flex justify-around mb-10">
        <div>
          <h6>BILL TO</h6>
          <h6>SHIP TO</h6>
          <h6>RECEIPT#</h6>
          <p>US-001</p>
        </div>
        <div>
          <p>John Smith</p>
          <p>John Smith</p>
          <h6>RECEIPT DATE</h6>
          <p>11/02/2019</p>
        </div>
        <div>
          <p>2 Quart Square</p>
          <p>37 Drive</p>
          <h6>P.O.#</h6>
          <p>2023/2019</p>
        </div>
        <div>
          <p>New York, NY 1222</p>
          <p>Cambridge, MA 16543</p>
          <h6>DUE DATE</h6>
          <p>26/2/2019</p>
        </div>
      </div>
      <div className="main-strip">
        <h6>QTY</h6>
        <h6>DESCRIPTION</h6>
        <h6>UNIT PRICE</h6>
        <h6>AMOUNT</h6>
      </div>
      <div className="shipping-2">
        <p>2</p>
        <p>New set of pedal arms</p>
        <p>$ 15.00</p>
        <p>$ 30.00</p>
      </div>
      <div className="shipping-3">
        <p>3</p>
        <p>Lollipops</p>
        <p>$ 5.00</p>
        <p>$ 15.00</p>
      </div>
      <total>
        <div className="shipping-total">
          <p>Subtotal</p>
          <p>$ 145.00</p>
        </div>
        <div className="shipping-total-1">
          <p>Sales Tax 6.25%</p>
          <p>9.06</p>
        </div>
        <div className="shipping-total-2">
          <h6>TOTAL</h6>
          <h6>$ 154.06</h6>
        </div>
      </total>
      <div className="theTitle active">
        <div className="left1">
          <h1>Thank You</h1>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
