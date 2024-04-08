import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../../loader/Components/Loader";
import "./products.css";
import Pagination from "../../pagination/components/PaginationComp.jsx";
import { NavLink, useNavigation } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

export default function Products() {
  const [product, setproduct] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  let [page, setPage] = useState(1);
  let [price, setPrice] = useState("");
  let [min, setMin] = useState("");
  let [max, setMax] = useState("");

  const limit = 4;
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/products?page=${currentPage}&limit=${limit}`
      );
      setproduct(data.products);
      const numOfPage = data.total / limit;
      setTotalPages(numOfPage);
    } catch (error) {
      setError("error loading products");
      setError("");
      const numOfPage = data.total / limit;
      setTotalPages(numOfPage);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getProduct();
  }, [currentPage]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loader) {
    return <Loader />;
  }
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
    } finally {
      setLoader(false);
    }
  };

  const getProductsSorted = async (page, sort) => {
    try {
      const { data } = await axios.get(`/products?page=${page}&sort=${sort}`);
      setproduct(data.products);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  const getProductsByMin = async (page, min, max) => {
    if (min == "" && max != "") {
      min = 0;
    } else if (max == "" && min != "") {
      max = 200;
    }
    try {
      const { data } = await axios.get(
        `/products?page=${page}&price[gte]=${min}&price[lte]=${max}`
      );

      setproduct(data.products);
      setLoader(false);
    } catch (error) {
      console.log(error);
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="padding-bottom">
      {error ?? <p className="error"> {error}</p>}

      <div className="container d-flex gap-2 my-3 justify-content-center ">
        <select onChange={(e) => getProductsSorted(page, e.target.value, e)}>
          <option selected>Sort Options</option>
          <option value="price">price</option>
          <option value="-price">-price</option>
          <option value="discount">discount</option>
          <option value="-discount">-discount</option>
        </select>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getProductsByMin(page, min, max);
          }}
          className={` ms-2 d-flex`}
        >
          <input
            type="text"
            value={min}
            onChange={(e) => {
              setMin(e.target.value);
            }}
            className={`ms-2 p-1 me-2 w-50`}
            placeholder="min"
          />
          <input
            type="text"
            value={max}
            onChange={(e) => {
              setMax(e.target.value);
            }}
            className={` ms-2 p-1 me-2 w-50 `}
            placeholder="max"
          />
          <input
            className="btn btn-outline-secondary"
            type="submit"
            value="Get"
          />
        </form>
      </div>

      <div className="productcontainer container  ">
        {product.length > 0 ? (
          product.map((product) => (
            <div
              className="productstyle shadow-lg p-3 mb-5 bg-white rounded  "
              key={product.id}
            >
              <img
                className="productImg"
                src={product.mainImage.secure_url}
              ></img>
              <h4 className="text">{product.name}</h4>
              <p className="pt-2">Price: ${product.price}</p>
              <p>Discount: {product.discount}</p>
              <NavLink
                className="btn btn-outline bg-secondary text-light "
                to={`/productsId/${product.id}`}
              >
                Details
              </NavLink>
              <button
                className=" btn btn-outline-secondary"
                onClick={() => addToCart(product.id)}
              >
                Add To Cart
              </button>
            </div>
          ))
        ) : (
          <h3 className="text-center">No Products</h3>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
