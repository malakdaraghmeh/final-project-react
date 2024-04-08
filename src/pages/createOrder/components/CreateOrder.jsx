import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import "./createOrder.css";

export default function CreateOrder() {
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const [carts, setCarts] = useState([]);
  const [createOrder, setCreateOrder] = useState({
    couponName: "",
    address: "",
    phone: "",
  });
  const getCart = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get("/cart", {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });

      setCarts(data.products);
      setError("");
    } catch (error) {
      setError("error loading orders");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setCreateOrder({
      ...createOrder,
      [name]: value,
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(`/order`, createOrder, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setCreateOrder({
        couponName: "",
        address: "",
        phone: "",
      });
      toast.success("order Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      toast.error("error create order", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="padding-bottom">
      <div className="cart ">
        <div className="container">
          <div className="row">
            <div className="cart-items shadow-lg  ">
              <div className="products" id="products">
                {carts.map((product) => (
                  <div
                    className="item shadow mb-5 bg-body-secondary rounded "
                    key={product._id}
                  >
                    <div className="product-info">
                      <img src={product.details.mainImage.secure_url} />
                      <div className="product-details">
                        <h2>{product.details.name} </h2>
                      </div>
                    </div>
                    <div className="style-module d-flex justify-content-center gap-2">
                      <div className="quantity-module w-25">
                        <span>{product.quantity}</span>
                      </div>
                      <div className="subtotal-module ">
                        ${product.quantity * product.details.price}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="container">
                  <div className="row">
                    <div className="w-50"> SubTotal :</div>
                    <div className="w-50 d-flex justify-content-end">
                      {carts.reduce(
                        (total, product) =>
                          total + product.details.price * product.quantity,
                        0
                      ) + " $ "}
                    </div>
                  </div>
                </div>

                <div className="container">
                  <div className="row">
                    <div className="w-50"> Discount :</div>
                    <div className="w-50 d-flex justify-content-end">
                      {carts.reduce(
                        (total, product) =>
                          total + product.details.discount * product.quantity,
                        0
                      ) + " $ "}
                    </div>
                  </div>
                </div>

                <div className="container">
                  <div className="row">
                    <div className="w-50"> Total :</div>
                    <div className="w-50 d-flex justify-content-end">
                      {carts.reduce(
                        (total, product) =>
                          total +
                          product.details.price * product.quantity -
                          product.details.discount * product.quantity,
                        0
                      ) + " $ "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handelSubmit}>
        <div className="input-group my-1 d-block m-auto w-50 ">
          <label>Coupon Name </label>
          <input
            className="form-control rounded-1 w-100"
            type="text"
            value={createOrder.couponName}
            name="couponName"
            onChange={handelChange}
          />
        </div>
        <div className="input-group my-4 d-block m-auto w-50 ">
          <label> Address </label>
          <input
            className="form-control rounded-1 w-100"
            type="address"
            value={createOrder.address}
            name="address"
            onChange={handelChange}
          />
        </div>
        <div className="input-group my-4 d-block m-auto w-50 ">
          <label> Phone </label>
          <input
            className="form-control rounded-1 w-100"
            type="Phone"
            value={createOrder.phone}
            name="phone"
            onChange={handelChange}
          />
        </div>
        <div className="input-group my-4 d-block m-auto w-50 d-flex justify-content-sm-center gap-3 ">
          <button
            type="submit"
            className="submit rounded-1 btn btn-outline-secondary w-100"
            disabled={loader ? "disabled" : null}
          >
            {!loader ? "Craete Order" : "wait...."}{" "}
          </button>
        </div>
      </form>
      <div>
        <NavLink className="navlinkk ms-4" to="/products">
          Continue Shopping
        </NavLink>
      </div>
    </div>
  );
}
