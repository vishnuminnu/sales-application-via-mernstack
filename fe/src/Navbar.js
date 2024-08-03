import "./Navbar.css";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "./context/auth";
import { CgProfile } from "react-icons/cg";
import logo from "./components/logo.png"

function Navbar() {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  return (
    <div className="continer">
      <nav className="navbar navbar-expand-sm bg-primary navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand me-5 icon" to="/" style={{fontWeight:"800"}}>
            SALES APP
            
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item me-4">
                <Link to="/" className="nav-link">
                  ADD SALES
                </Link>
              </li>
              <li className="nav-item me-4">
                <Link to="/Top5sales" className="nav-link">
                  TOP 5 SALES
                </Link>
              </li>
              <li className="nav-item me-4">
                <Link to="/Totalrevenue" className="nav-link">
                  TODAY'S TOTAL REVENUE
                </Link>
              </li>
              </ul>
              <ul className="navbar-nav ms-auto">
              {auth?.token ? (
                <li className="nav-item dropdown me-4 nav-link text-white" style={{background: "none"}}>
                  <span
                    className="dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{fontSize: "17px"}}
                  >
                    <CgProfile /> {auth?.user?.firstname}
                  </span>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{backgroundColor: "black"}}>
                    <li className="text-center">
                      <Link className="dropdown-item text-white" onClick={handleLogout}>
                        LOGOUT
                      </Link>
                    </li>
                  </ul>
                </li>
              ) : (
                <>
                  <li className="nav-item me-4">
                    <Link to="/login" className="nav-link">
                      LOGIN
                    </Link>
                  </li>
                  <li className="nav-item me-4">
                    <Link to="/register" className="nav-link">
                      REGISTER
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
