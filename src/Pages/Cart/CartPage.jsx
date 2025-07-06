import React, { useContext } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const CartPage = () => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Group items by product (assuming product_title is unique)
  const groupedItems = cartItems.reduce((acc, item) => {
    const key = item.product_title || item.name;
    if (!acc[key]) {
      acc[key] = { ...item, quantity: 1 };
    } else {
      acc[key].quantity += 1;
    }
    return acc;
  }, {});
  const items = Object.values(groupedItems);

  // Handle quantity change
  const handleQuantity = (key, delta) => {
    setCartItems((prev) => {
      let newCart = [];
      let found = false;
      for (let item of prev) {
        if ((item.product_title || item.name) === key && !found) {
          let count = prev.filter(
            (i) => (i.product_title || i.name) === key
          ).length;
          if (count + delta > 0) {
            newCart = [...newCart, ...Array(count + delta).fill(item)];
          }
          found = true;
        } else if ((item.product_title || item.name) !== key) {
          newCart.push(item);
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(newCart));
      return newCart;
    });
  };

  const subtotal = items.reduce(
    (total, item) => total + (item.product_price || item.price) * item.quantity,
    0
  );
  const deliveryFee = items.length > 0 ? 10 : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="w-full min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="p-4 bg-green-500 text-white flex items-center justify-between sticky top-0 z-10 shadow-md">
        <Link to="/" className="text-2xl flex items-center">
          <IoArrowBack />
        </Link>
        <h2 className="text-xl font-bold text-center flex-grow">
          Shopping Bag
        </h2>
        <div className="w-6"></div>
      </div>

      <div className="flex flex-col lg:flex-row flex-grow max-w-4xl mx-auto w-full">
        {/* Left Column */}
        <div className="lg:w-2/3 w-full px-2 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-80 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16 mb-4 opacity-30"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75h19.5M6.75 6.75V5.25A2.25 2.25 0 019 3h6a2.25 2.25 0 012.25 2.25v1.5m-9 0h9m-9 0v12.75A2.25 2.25 0 009 21h6a2.25 2.25 0 002.25-2.25V6.75"
                />
              </svg>
              <div className="text-lg font-semibold">Your cart is empty</div>
              <div className="text-sm mt-2">
                Looks like you haven't added anything yet.
              </div>
              <Link
                to="/"
                className="mt-6 px-6 py-2 bg-green-500 text-white rounded-full font-bold shadow hover:bg-green-600 transition"
              >
                Go Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div
                  key={item.product_title || item.name || idx}
                  className="flex items-center bg-white rounded-xl shadow p-3 gap-3"
                >
                  <img
                    src={item.product_imgs ? item.product_imgs[0] : item.image}
                    alt={item.product_title || item.name}
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="truncate">
                        <h3 className="font-bold text-base truncate">
                          {item.product_title || item.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          Size: {item.product_weight || item.size}
                        </p>
                        <p className="font-bold text-green-600 mt-1">
                          ${item.product_price || item.price}
                        </p>
                      </div>
                      <button
                        className="text-xl text-gray-400 hover:text-red-500 ml-2"
                        aria-label="Remove item"
                        onClick={() =>
                          handleQuantity(
                            item.product_title || item.name,
                            -item.quantity
                          )
                        }
                      >
                        &times;
                      </button>
                    </div>
                    <div className="flex items-center mt-3">
                      <button
                        className="border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-gray-100"
                        onClick={() =>
                          handleQuantity(item.product_title || item.name, -1)
                        }
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-4 text-base font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        className="border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-lg font-bold hover:bg-green-100 text-green-600"
                        onClick={() =>
                          handleQuantity(item.product_title || item.name, 1)
                        }
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column (Order Summary) */}
        <div className="lg:w-1/3 w-full px-2 py-4 lg:sticky lg:top-24">
          <div className="bg-white rounded-xl shadow p-5 mb-4 lg:mb-0 lg:mt-8">
            <div className="flex justify-between mb-2 text-base">
              <span>Sub total</span>
              <span className="font-semibold">${subtotal}</span>
            </div>
            <div className="flex justify-between mb-2 text-base">
              <span>Delivery Fee</span>
              <span className="font-semibold">${deliveryFee}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-4 mt-4">
              <span>Grand Total</span>
              <span>${grandTotal}</span>
            </div>
            <button
              className="w-full bg-green-500 text-white py-3 rounded-full font-bold mt-6 shadow hover:bg-green-600 transition disabled:opacity-50"
              disabled={items.length === 0}
              onClick={() => navigate("/checkout/summary")}
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>

      {/* Sticky order summary for mobile */}
      {items.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-inner p-3 flex items-center justify-between lg:hidden z-20 border-t">
          <div>
            <div className="text-xs text-gray-500">Total</div>
            <div className="text-lg font-bold text-green-600">
              ${grandTotal}
            </div>
          </div>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded-full font-bold shadow hover:bg-green-600 transition"
            onClick={() => navigate("/checkout/summary")}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
