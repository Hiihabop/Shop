import React, { useContext } from "react";
import Imges from "../../assets/Imges";
import ProductCard from "../../components/Animation/ProductCard";
import { CartContext } from "../../context/CartContext";
import { defaultProducts } from "../../axios/Axios";

const Home = () => {
  const { products } = useContext(CartContext);

  return (
    <div className="dark:bg-gray-700 transition duration-300">
      <section className="homeSection" id="home">
        <div className="content grid ">
          <div className="homeText">
            <span>WELCOME TO OUR</span>
            <h1 className="introText">Healthy Food Collection</h1>
            <p className="homeParagraph">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Molestias, voluptatem quaerat illum earum suscipit rem excepturi
              nulla sapiente est vitae?
            </p>
            <div className="btn">
              <a href="#shop">Order Now</a>
            </div>
          </div>
          <div className="homeImg">
            <img
              src={Imges.Img_1}
              alt="Home Food Image"
              className="home_Image"
            />
          </div>
        </div>
        <div className="circle" />
      </section>

      <section className="section aboutSection" id="about">
        <div className="sectionContent container mx-auto">
          <div className="sectionIntro">
            <div className="headerInfo">
              <h2 className="title font-semibold">
                Our unique story since 1996
              </h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Molestias eaque fugiat recusandae suscipit, ipsam ullam,
                voluptatum odio itaque quo perferendis cupiditate modi alias
                tempore harum.
              </p>
            </div>
          </div>
          <div className="sectionData">
            <div className="leftImg">
              <img src={Imges.img10} alt="Food Image" />
            </div>
            <div className="rightImgs">
              <div className="rightImg">
                <img src={Imges.img4} alt="Food Image" />
              </div>
              <div className="rightImg">
                <img src={Imges.img1} alt="Food Image" />
              </div>
              <div className="rightImg">
                <img src={Imges.img12} alt="Food Image" />
              </div>
              <div className="rightImg">
                <img src={Imges.img5} alt="Food Image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="sectionContent container mx-auto px-4 max-[400px]:px-0" id="shop">
        <div class="sectionIntro">
          <div class="headerInfo container">
            <h2 class="title font-semibold text-2xl">Our Products</h2>
            <p className="text-sm">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Blanditiis, nulla!
            </p>
          </div>
        </div>
        <div className="contentWrapper grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3 px-2 mb-5">
          {defaultProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
