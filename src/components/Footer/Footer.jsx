import React from "react";
import Imges from "../../assets/Imges";

const Footer = ({ darkMode }) => {
  return (
    <div>
      <section className="footerSection dark:bg-gray-800">
        <div className="contentContainer container">
          <div className="footerIntro">
            <div className="footerLogoDiv">
              <p className="text-white text-2xl font-semibold">Logo</p>
              <span className="hotelName dark:text-orange-400">
                Isra Restaurant
              </span>
            </div>
            <p className="dark:text-gray-300">
              NutriNature ek bharosemand online food store hai jahan aapko
              milegi sehatmand aur tasty khane ki variety — sab kuch ek click
              pe. Freshness, quality aur fast delivery hamari pehchaan hai.
              Hamesha swadisht aur surakshit khana aap tak pahunchana hi hamara
              mission hai.
            </p>
            <div className="footContactDetails">
              <div className="info">
                <div className="iconDiv dark:bg-gray-700">
                  <i className="bx bx-mail-send dark:text-orange-400" />
                </div>
                <span className="dark:text-gray-300">dshoop@gmail.com</span>
              </div>
              <div className="info">
                <div className="iconDiv dark:bg-gray-700">
                  <i className="bx bxs-phone-outgoing dark:text-orange-400" />
                </div>
                <span className="dark:text-gray-300">+234 (0) 345589000</span>
              </div>
              <div className="info">
                <div className="iconDiv dark:bg-gray-700">
                  <i className="bx bx-current-location dark:text-orange-400" />
                </div>
                <span className="dark:text-gray-300">
                  Level 14 Willisn Street floor No.41 - Uganda.
                </span>
              </div>
            </div>
          </div>
          <div className="linksDiv">
            <div className="footersectionTitle">
              <h5 className="dark:text-white">USEFUL LINKS</h5>
            </div>
            <ul>
              <li className="navItem">
                <a
                  href="#Home"
                  className="navLink dark:text-gray-300 dark:hover:text-orange-400"
                >
                  Home
                </a>
              </li>
              <li className="navItem">
                <a
                  href="#about"
                  className="navLink dark:text-gray-300 dark:hover:text-orange-400"
                >
                  About Us
                </a>
              </li>
              <li className="navItem">
                <a
                  href="#services"
                  className="navLink dark:text-gray-300 dark:hover:text-orange-400"
                >
                  Services
                </a>
              </li>
              <li className="navItem">
                <a
                  href="#store"
                  className="navLink dark:text-gray-300 dark:hover:text-orange-400"
                >
                  Store
                </a>
              </li>
            </ul>
          </div>
          <div className="linksDiv">
            <div className="footersectionTitle">
              <h5 className="dark:text-white">OUR SERVICES</h5>
            </div>
            <ul>
              <span className="dark:text-gray-300">Online shopping</span>
              <span className="dark:text-gray-300">Free Home Delivery</span>
              <span className="dark:text-gray-300">Return Money</span>
              <span className="dark:text-gray-300">Delivery On Place</span>
              <span className="dark:text-gray-300">Wishlist</span>
              <span className="dark:text-gray-300">Discount</span>
            </ul>
          </div>
          <div className="linksDiv footerForm">
            <div className="footersectionTitle">
              <h5 className="dark:text-white"> OUR NEWSLETTER</h5>
            </div>
            <form action="#">
              <label className="dark:text-gray-300">
                {" "}
                Subscribe To Our Newsletter...
              </label>
              <input
                type="text"
                placeholder="Name"
                required
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              />
              <button
                type="submit"
                className="dark:bg-orange-600 dark:hover:bg-orange-700"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
        <div className="copyrightDiv dark:bg-gray-900">
          <span className="dark:text-gray-300">Designed and Developed by</span>{" "}
          <span className="dark:text-orange-400">Israel Abaho</span>
        </div>
      </section>
    </div>
  );
};

export default Footer;
