import React, { useState } from "react";
import "./Register.css";
import { object, string } from "yup";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    image: "",
  });
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState([]);

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const handelChangeImage = (e) => {
    const { name, files } = e.target;
    setUser({
      ...user,
      [name]: files[0],
    });
  };
  const validateData = async () => {
    const registerSchema = object({
      userName: string().min(3).max(20).required(),
      email: string().email(),
      password: string().min(5).max(20).required(),
      image: string().required(),
    });
    try {
      await registerSchema.validate(user, { abortEarly: false });
      return true;
    } catch (error) {
      console.log("validation error", error.errors);
      setErrors(error.errors);
      return false;
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const validate = await validateData();
    console.log(validate);
    const formData = new FormData();
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("image", user.image);
    try {
      const { data } = await axios.post(`/auth/signup`, formData);
      setUser({
        userName: "",
        email: "",
        password: "",
        image: "",
      });
      if (data.message == "success") {
        toast.success("Account Successfully", {
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
        navigate("/login");
      }
    } catch (error) {
      if (error.response.status === 409) {
        toast.error("already email exist message", {
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
      }
      setLoader(false);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="padding-bottom">
      {errors.length > 0 ? errors.map((error) => <p>{error}</p>) : ""}
      <form className="form p-2" onSubmit={handelSubmit}>
        <h2 className="acount pt-4">Create Acount </h2>
        <div className="input-group my-4 d-block m-auto w-50 ">
          <label className="text-center">User Name</label>
          <input
            className="form-control rounded-1 w-100"
            type="text"
            name="userName"
            value={user.userName}
            onChange={handelChange}
          />
        </div>
        <div className="input-group my-4 d-block m-auto w-50 ">
          <label>User Email</label>
          <input
            className="form-control rounded-1 w-100"
            type="email"
            name="email"
            value={user.email}
            onChange={handelChange}
          />
        </div>
        <div className="input-group my-4 d-block m-auto w-50 ">
          <label> User Password </label>
          <input
            className="form-control rounded-1 w-100"
            type="password"
            name="password"
            value={user.password}
            onChange={handelChange}
          />
        </div>

        <div className="input-group my-4 d-block m-auto w-50 ">
          <label>User Image</label>
          <input
            className="form-control w-100"
            type="file"
            name="image"
            onChange={handelChangeImage}
          />
        </div>

        <div className="input-group my-4 d-block m-auto w-50 d-flex justify-content-sm-center ">
          <button
            type="submit"
            className="submit rounded-1 btn btn-outline-secondary w-100"
            disabled={loader ? "disabled" : null}
          >
            {!loader ? "Submit" : "wait...."}{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
