import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../loader/Components/Loader";
import "./cart.css";
import { toast } from "react-toastify";
import { Link, NavLink } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";

export default function Cart() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
      setError("error loading cart");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  const removeItemContext = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.patch(
        `/cart/removeItem`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      if (data.message == "success") {
        toast.success("product removed successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCart();
  }, [removeItemContext]);

  const clearCartContext = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/clear`,
        {},
        { headers: { Authorization: `Tariq__${token}` } }
      );
      if (data.message == "success") {
        toast.success("cart cleared successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }

      return data;
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCart();
  }, [clearCartContext]);
  const increaseQuantity = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.patch(
        `/cart/incraseQuantity`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCart();
  }, [increaseQuantity]);

  const decreaseQuantity = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.patch(
        `/cart/decraseQuantity`,
        { productId },
        { headers: { Authorization: `Tariq__${token}` } }
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCart();
  }, [decreaseQuantity]);

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="cart padding-bottom">
      <div className="container w-100 ">
        <div className="row">
          <div className=" cartss d-flex gap-4 gap-md-3 gap-sm-2 align-items-start ">
            <div className="cart-items shadow p-lg-4 p-md-3 p-sm-1 ">
              <div className="products" id="products">
                <div className="item ">
                  <div className="product-info">
                    <h2>Product</h2>
                  </div>
                  <div className="quantity">
                    <h2>Quantity</h2>
                  </div>
                  <div className="price">
                    <h2>Price</h2>
                  </div>
                  <div className="subtotal">
                    <h2>Subtotal</h2>
                  </div>
                </div>

                {carts.map((product) => (
                  <div
                    className="item shadow mb-5 bg-body-secondary rounded "
                    key={product._id}
                  >
                    <div className="product-info">
                      <img src={product.details.mainImage.secure_url} />
                      <div className="product-details">
                        <h2>{product.details.name} </h2>
                        <div className=" remove d-flex align-items-center container">
                          <Link
                            onClick={() =>
                              removeItemContext(product.details._id)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height={25}
                              viewBox="0 0 24 25"
                              fill="none"
                            >
                              <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M5.29289 5.79289C5.68342 5.40237 6.31658 5.40237 6.70711 5.79289L12 11.0858L17.2929 5.79289C17.6834 5.40237 18.3166 5.40237 18.7071 5.79289C19.0976 6.18342 19.0976 6.81658 18.7071 7.20711L13.4142 12.5L18.7071 17.7929C19.0976 18.1834 19.0976 18.8166 18.7071 19.2071C18.3166 19.5976 17.6834 19.5976 17.2929 19.2071L12 13.9142L6.70711 19.2071C6.31658 19.5976 5.68342 19.5976 5.29289 19.2071C4.90237 18.8166 4.90237 18.1834 5.29289 17.7929L10.5858 12.5L5.29289 7.20711C4.90237 6.81658 4.90237 6.18342 5.29289 5.79289Z"
                                fill="#6C7275"
                              />
                            </svg>
                            <span>Remove</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="style  ">
                      <div className="quantity">
                        <button
                          onClick={() => decreaseQuantity(product.details._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={17}
                            viewBox="0 0 16 17"
                            fill="none"
                          >
                            <path
                              d="M3.22852 8.5H12.5618"
                              stroke="#121212"
                              strokeWidth="0.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <span>{product.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(product.details._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={16}
                            height={17}
                            viewBox="0 0 16 17"
                            fill="none"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M8.37565 3.83333C8.37565 3.62622 8.20776 3.45833 8.00065 3.45833C7.79354 3.45833 7.62565 3.62622 7.62565 3.83333V8.125H3.33398C3.12688 8.125 2.95898 8.29289 2.95898 8.5C2.95898 8.7071 3.12688 8.875 3.33398 8.875H7.62565V13.1667C7.62565 13.3738 7.79354 13.5417 8.00065 13.5417C8.20776 13.5417 8.37565 13.3738 8.37565 13.1667V8.875H12.6673C12.8744 8.875 13.0423 8.7071 13.0423 8.5C13.0423 8.29289 12.8744 8.125 12.6673 8.125H8.37565V3.83333Z"
                              fill="#121212"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="price">{product.details.price}</div>
                      <div className="subtotal">
                        ${product.quantity * product.details.price}
                      </div>
                    </div>
                  </div>
                ))}
                <div className=" d-flex justify-content-sm-end al ">
                  <button
                    className=" delete rounded-2 p-lg-3 p-md-2 p-sm-2  bg-danger "
                    onClick={clearCartContext}
                  >
                    <MdDeleteOutline size={20} />
                    Clear Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="cart-summary">
              <h2>Place Order :</h2>
              <div className="W-100 fs-4">
                SubTotal:{" "}
                {carts.length > 0 ? (
                  carts.reduce(
                    (total, product) =>
                      total + product.details.price * product.quantity,
                    0
                  ) + "$"
                ) : (
                  <span> SubTotal :0$</span>
                )}
              </div>

              <div className="W-100 fs-4">
                Discount:{" "}
                {carts.length > 0 ? (
                  carts.reduce(
                    (total, product) =>
                      total + product.details.discount * product.quantity,
                    0
                  ) + "$"
                ) : (
                  <div>
                    <span>Discount</span>
                    <span> 0$</span>
                  </div>
                )}
              </div>

              <div className="W-100   fs-4">
                Total:{" "}
                {carts.length > 0 ? (
                  carts.reduce(
                    (total, product) =>
                      total +
                      product.details.price * product.quantity -
                      product.details.discount * product.quantity,
                    0
                  ) + "$"
                ) : (
                  <span>Total 0$</span>
                )}
              </div>
              <div>
                <NavLink className="navlinkk " to="/createOrder">
                  Create Order
                </NavLink>
              </div>
            </div>
          </div>
        </div>
        <div className="btn-clear d-flex align-items-sm-center gap-4 "></div>
      </div>
    </div>
  );
}
