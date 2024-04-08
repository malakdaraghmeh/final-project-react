import React, { useState } from "react";
import { useEffect } from "react";
import Loader from "../../loader/Components/Loader";
import axios from "axios";
import { NavLink } from "react-bootstrap";

export default function GetOrder() {
  const [orderInfo, setOrderInfo] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");
  const getOrderInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`/order`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setOrderInfo(data.orders);
      setError("");
    } catch (error) {
      console.log("error");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getOrderInfo();
  }, []);

  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <div>
        {error ?? <p className="error"> {error}</p>}
        <div className="st">
          {
            <div>
              <div className="d-flex flex-column gap-3">
                {orderInfo.map((order) => (
                  <div className="bg-light" key={order._id}>
                    <div className="d-flex  border-bottom p-2">
                      <div className="container d-flex  flex-column ">
                        <span>
                          Status:
                          <span className="text-muted">
                            {" "}
                            {order.status}
                          </span>{" "}
                        </span>
                        <span>
                          Order #
                          <span className="text-muted"> {order._id}</span>
                        </span>
                      </div>
                    </div>

                    <span className="d-flex gap-3 p-2">
                      {order.products.map((product) => (
                        <>
                          <div key={product.id}>
                            <p className="text-muted">X{product.quantity}</p>

                            <img
                              className="productImg"
                              src={product.productId.mainImage.secure_url}
                            ></img>
                          </div>
                        </>
                      ))}
                    </span>
                    <h4 className=" p-2">Total Price: {order.finalPrice}$</h4>
                  </div>
                ))}
              </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}
