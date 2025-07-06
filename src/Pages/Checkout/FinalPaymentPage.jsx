import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";

const FinalPaymentPage = () => {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  // Group items by product
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

  const subtotal = items.reduce(
    (total, item) => total + (item.product_price || item.price) * item.quantity,
    0
  );
  const deliveryFee = items.length > 0 ? 10 : 0;
  const grandTotal = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-20">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="w-full max-w-md bg-white rounded-xl shadow p-4 mb-6">
        {items.length === 0 ? (
          <div className="text-center text-gray-500">No items in cart.</div>
        ) : (
          <div className="space-y-3">
            {items.map((item, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div>
                  <div className="font-semibold text-base truncate">
                    {item.product_title || item.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    Qty: {item.quantity}
                  </div>
                </div>
                <div className="font-bold text-green-600">
                  ${(item.product_price || item.price) * item.quantity}
                </div>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <span>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>${deliveryFee}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <span>Total</span>
              <span>${grandTotal}</span>
            </div>
          </div>
        )}
      </div>
      <button
        className="w-full max-w-md bg-green-500 text-white py-3 rounded-full font-bold shadow hover:bg-green-600 transition disabled:opacity-50"
        disabled={items.length === 0}
        onClick={() => navigate("/checkout/address")}
      >
        Enter Address
      </button>
    </div>
  );
};

export default FinalPaymentPage;
