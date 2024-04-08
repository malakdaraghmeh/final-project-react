import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./categoryProduct.css";
import { NavLink } from "react-router-dom";
import Loader from "../../loader/Components/Loader.jsx";
import { Bounce, toast } from "react-toastify";

export default function CategoryProducts() {
  const { id } = useParams("id");
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const getProducts = async () => {
    try {
      const { data } = await axios.get(`/products/category/${id}`);
      setProducts(data.products);
    } catch (error) {
      setError("error loading products");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);
  const addToCart = async (productId) => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.post(
        `/cart`,
        {
          productId,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (data.message == "success") {
        toast.success("Add To Cart is successfully!", {
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
      }
    } catch (error) {
      if (!token) {
        toast.error("plz first Login", {
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
      } else {
        toast.error(error.response.data.message, {
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
      }
    }
  };
  if (loader) {
    return <Loader />;
  }

  return (
    <>
      {error ?? <p className="error"> {error}</p>}
      <div className="productcontainer container ">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              className="productstyle shadow-lg p-3 mb-5 bg-white rounded "
              key={product.id}
            >
              <NavLink className="navlinkk" to={`/productsId/${product.id}`}>
                <img
                  className="productImg"
                  src={product.mainImage.secure_url}
                ></img>
                <h4 className="text">{product.name}</h4>
              </NavLink>
              <button
                onClick={() => addToCart(product.id)}
                className=" btn btn-outline-secondary w-100"
              >
                Add To Cart
              </button>
            </div>
          ))
        ) : (
          <h3 className="text-center">No Products</h3>
        )}
      </div>
    </>
  );
}
