import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import "./Navbar.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Navbar() {
  const { setUserToken, setUserName, userToken } = useContext(UserContext);
  const logout = () => {
    setUserToken("");
    setUserName(null);
  };

  return (
    <>
      <nav className=" navbar navbar-expand-lg navbar-light  shadow-sm p-3 mb-5 bg-light ">
        <div className="container  ">
          <NavLink className="navbar-brand">
            {" "}
            <div className="logo fs-2">Shopping</div>{" "}
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse stylenav" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item ">
                <NavLink className="nav-link fs-4" to="/">
                  Home{" "}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link fs-4" to="/categories">
                  Categories
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link fs-4" to="/products">
                  {" "}
                  Products{" "}
                </NavLink>
              </li>
            </ul>
            <div className="d-flex align-items-center gap-3 ">
              <div>
                <NavLink to="/cart">
                  <FaShoppingCart className="style-Icons" />
                </NavLink>
              </div>
              <div>
                <ul className="navbar-nav  mb-lg-0">
                  <li className="nav-item dropdown">
                    <NavLink
                      className="dropdown-toggle nav-link"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FaUser />
                    </NavLink>
                    <ul className="dropdown-menu unstyled">
                      {userToken ? (
                        <>
                          <li>
                            <NavLink
                              className="dropdown-item text-capitalize"
                              to="/profile"
                            >
                              Profile
                            </NavLink>
                          </li>
                          <li>
                            <button
                              onClick={logout}
                              className="dropdown-item text-capitalize"
                            >
                              Logout
                            </button>
                          </li>
                        </>
                      ) : (
                        <>
                          <li>
                            <NavLink className="dropdown-item" to="/register">
                              Register
                            </NavLink>
                          </li>
                          <li>
                            <NavLink className="dropdown-item" to="/login">
                              Login
                            </NavLink>
                          </li>
                        </>
                      )}
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
