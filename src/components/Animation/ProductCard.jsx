import React, { useContext, useRef } from "react";
import { CartContext } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { product_imgs, product_title, product_price, product_weight } =
    product;
  const { addToCart } = useContext(CartContext);
  const productImageRef = useRef(null);

  const handleAddToCart = () => {
    addToCart(productImageRef, product);
  };

  return (
    <div className="boxDiv w-full p-2 flex flex-col items-center justify-center rounded-md shadow-md transition duration-300 overflow-hidden hover:-translate-y-1">
      {/* Image */}
      <div
        ref={productImageRef}
        className="imgDiv h-[150px] w-[170px] md:h-[250px] md:w-[270px] overflow-hidden rounded-xl transform rotate-[10deg] -translate-x-[45px] -translate-y-2"
      >
        <img
          src={product_imgs[0]}
          alt="Food Image"
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Description */}
      <div className="imgDesc w-full px-1 py-2 text-sm">
        <span className="commentCount block text-gray-500 mb-1">
          872 <i className="bx bxs-chat comIcon" />
        </span>

        <span className="stars text-yellow-500 flex gap-0.5 mb-1 text-sm">
          {[...Array(5)].map((_, i) => (
            <i key={i} className="bx bxs-star starIcon" />
          ))}
        </span>

        <span className="text text-xs font-medium text-[#3a3a3a] block mb-1">
          {product_title}
        </span>

        <span className="Gtext bg-gray-300 text-[#3a3a3a] px-2 py-[2px] rounded-full inline-block mb-2 text-xs">
          {product_weight}
        </span>

        <span className="price flex justify-between items-center text-[rgb(0,188,126)] text-base font-semibold font-[Montserrat]">
          <div>${product_price}</div>
          <button
            onClick={handleAddToCart}
            type="button"
            className="bg-[rgb(0,188,126)] border border-[rgb(0,188,126)] text-white px-2 py-1 md:px-3 md:py-2 rounded-full text-xs mt-1 hover:bg-orange-600 focus:outline-none"
          >
            Add to cart
          </button>
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
