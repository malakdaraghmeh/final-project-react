import React, { useContext, useState } from "react";
import "../register/Register.css";
import { object, string } from "yup";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUserToken } = useContext(UserContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
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
  const validateData = async () => {
    const loginSchema = object({
      email: string().email(),
      password: string().min(5).max(20).required(),
    });
    try {
      await loginSchema.validate(user, { abortEarly: false });
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
    try {
      const { data } = await axios.post(`/auth/signin`, {
        email: user.email,
        password: user.password,
      });
      setUser({
        email: "",
        password: "",
      });
      if (data.message == "success") {
        toast.success("Signin Successfully", {
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
      navigate("/");
      setUserToken(data.token);
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
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="padding-bottom">
      {errors.length > 0 ? errors.map((error) => <p>{error}</p>) : ""}
      <form className="form p-2" onSubmit={handelSubmit}>
        <h2 className="acount pt-4">Login</h2>
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
        <div className="input-group my-4 d-block m-auto w-50 d-flex justify-content-sm-center gap-3 ">
          <button
            type="submit"
            className="submit rounded-1 btn btn-outline-secondary w-100"
            disabled={loader ? "disabled" : null}
          >
            {!loader ? "Login" : "wait...."}{" "}
          </button>
          <NavLink
            className="text-decoration-none ms-4 forgetpassword  "
            to="/sendCode"
          >
            Forget Password?
          </NavLink>
        </div>
      </form>
    </div>
  );
}
