import { useEffect } from "react";
import authStore from "../stores/authStore";
import "../components/style.css";
// import { Link } from "react-router-dom";
import image1 from "../components/images/lMfmeO.jpg";

export default function LogoutPage() {
  const store = authStore();

  useEffect(() => {
    store.logout();
  }, []);
  return (
    <div className="has-bg-img" 
    style={{
      backgroundImage: `url(${image1})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      height: "100vh", // Set the height of the container to the full viewport height
    }}
    >
      <div className="position-absolute top-50 start-50 translate-middle text-light">
        <h1 className="font-italic">You are now logged out!</h1>
        <div className="">
          {/* <button className="btn btn-primary ">
            <Link className="link-light" to="/login">
              Login
            </Link>
          </button> */}
        </div>
      </div>
      
    </div>
  );
}
