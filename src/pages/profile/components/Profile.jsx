import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Loader from "../../loader/Components/Loader";
import "../../createOrder/components/CreateOrder.jsx";
import GetOrder from "../../createOrder/components/GetOrder";
import "./profile.css";
import { UserContext } from "../../../context/UserContext";

export default function Profile() {
  const [profile, setProfile] = useState([]);
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");

  const { userToken: token } = useContext(UserContext);
  const getProfile = async () => {
    try {
      const { data } = await axios.get(`/user/profile`, {
        headers: {
          Authorization: `Tariq__${token}`,
        },
      });
      setProfile(data.user);
      setError("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  if (loader) {
    return <Loader />;
  }

  return (
    <div className="padding-bottom">
      {error.length > 0 ? error.map((errors) => <p>{errors}</p>) : ""}
      <div className={`${profile.userData} pt-4`}>
        <div className="container d-flex flex-column shadow p-3 mb-5 bg-body rounded gap-4">
          <div className="d-flex  align-items-center gap-2">
            <img
              className="profileImg rounded-circle"
              src={profile.image.secure_url}
            ></img>
            <h2 className="text-capitalize">{profile.userName}</h2>
          </div>
          <p> Email: {profile.email}</p>
          <p> {profile.status}</p>

          <div>
            <h2>My Orders:</h2>
            <GetOrder />
          </div>
        </div>
      </div>
    </div>
  );
}
