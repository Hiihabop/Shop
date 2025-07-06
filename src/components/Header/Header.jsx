import { FaBars } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Header = ({ sidebarOpen, setSidebarOpen }) => {
  const { cartIconRef, cartCount } = useContext(CartContext);
  return (
    <div>
      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay fixed inset-0 bg-black bg-opacity-40 z-50"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <header className="header headerBG">
        <div className="logoDiv flex items-center">
          <div className="toggleDiv pr-2" onClick={() => setSidebarOpen(true)}>
            <FaBars />
          </div>
          <a href="#home">
            <p className="text-3xl font-bold">Logo</p>
          </a>
        </div>
        <div
          className={`navBar ${sidebarOpen ? "showNavBar" : ""}`}
          id="nav_bar"
          onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing when clicking inside sidebar
        >
          {/* Close button at top inside sidebar */}

          <ul className="navList mt-4">
            <div
              className="closeIconDiv flex justify-end items-center"
              id="closeId"
              style={{ height: "48px" }}
              onClick={() => setSidebarOpen(false)}
            >
              <IoCloseSharp className="text-4xl cursor-pointer text-white" />
            </div>
            <li className="navItem">
              <a href="#home" className="navLink">
                Home
              </a>
            </li>
            <li className="navItem">
              <a href="#about" className="navLink">
                About
              </a>
            </li>
            <li className="navItem">
              <a href="#staff" className="navLink">
                Staff
              </a>
            </li>
            <li className="navItem">
              <a href="#shop" className="navLink">
                Shop
              </a>
            </li>
            <li className="navItem">
              <a href="#contact" className="navLink">
                Contact
              </a>
            </li>
            <div className="headerFooterDiv">
              <p>
                <b>Isra Restaurant</b> has stored prepared and served for 25
                years.
              </p>
            </div>
          </ul>
        </div>
        <div className="contactBtn">
          <a href="#contact" className="contactLink">
            Contact Us
          </a>
          <div className="cartDiv" ref={cartIconRef}>
            <Link to="/cart">
              <FaCartShopping className="cartIcon text-[45px] p-3 rounded-full" />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
