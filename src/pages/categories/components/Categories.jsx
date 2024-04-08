import axios from "axios";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { NavLink } from "react-router-dom";
import { Navigation } from "swiper/modules";
import "swiper/css/navigation";
import "./Categories.css";
import Loader from "../../loader/Components/Loader";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState(false);
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`/categories/active?page=1&limit=20`);
      setCategories(data.categories);
    } catch (error) {
      setError("error loading categories");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  if (loader) {
    return <Loader />;
  }
  return (
    <>
      <section className="Category padding-bottom ">
        <div className="container">
          <Swiper
            navigation={true}
            modules={[Navigation]}
            spaceBetween={50}
            slidesPerView={5}
            onSwiper={() => console.log("swiper")}
            onSlideChange={() => console.log("Slide change")}
          >
            {categories.length > 0 ? (
              categories.map((catagory) => (
                <div className="col-lg-6 col-md-4 col-sm-6" key={catagory.id}>
                  <SwiperSlide className="swiperSlide" key={catagory._id}>
                    <NavLink
                      className="btn btn-outline w-100 p-4"
                      to={`/category/${catagory._id}`}
                    >
                      <div className="swiperSlide  d-flex flex-wrap flex-wrap align-items-center flex-sm-column gap-4 justify-content-center ">
                        <img
                          className="circular-image"
                          src={catagory.image.secure_url}
                          alt="slide image"
                        />
                      </div>
                    </NavLink>
                  </SwiperSlide>
                </div>
              ))
            ) : (
              <h2>empty data</h2>
            )}
          </Swiper>
        </div>
      </section>
    </>
  );
}
