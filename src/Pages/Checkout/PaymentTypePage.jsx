import React, { useState } from "react";
import {
  FaGooglePay,
  FaPhone,
  FaMoneyCheckAlt,
  FaUniversity,
} from "react-icons/fa";
import { SiPaytm } from "react-icons/si";

const upiId = "your-upi-id@bank"; // Replace with your UPI ID
const site_name = "YourSite";
const tmp_site_name = "Order Payment";

const paymentOptions = [
  {
    type: "Google Pay",
    icon: <FaGooglePay className="text-3xl" />,
  },
  {
    type: "PhonePe",
    icon: <FaPhone className="text-3xl" />,
  },
  {
    type: "Paytm",
    icon: <SiPaytm className="text-3xl" />,
  },
  {
    type: "All UPI APP",
    icon: <FaUniversity className="text-3xl" />,
  },
];

const PaymentTypePage = () => {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState("");
  const [amount] = useState(() => {
    const cart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const subtotal = cart.reduce(
      (total, item) => total + (item.product_price || item.price),
      0
    );
    return cart.length > 0 ? subtotal + 10 : 0;
  });

  let upiUrl = "";
  if (selected === "Google Pay") {
    upiUrl = `tez://upi/pay?pa=${upiId}&pn=${site_name}&am=${amount}&cu=INR&tn=${tmp_site_name}`;
  } else if (selected === "PhonePe") {
    upiUrl = `phonepe://pay?pa=${upiId}&pn=${site_name}&am=${amount}&cu=INR&tn=${tmp_site_name}`;
  } else if (selected === "Paytm") {
    upiUrl = `paytmmp://pay?pa=${upiId}&pn=${site_name}&am=${amount}&cu=INR&tn=${tmp_site_name}`;
  } else if (selected === "All UPI APP") {
    upiUrl = `upi://pay?pa=${upiId}&pn=${site_name}&am=${amount}&cu=INR&tn=${tmp_site_name}`;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-10 mt-6 ">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Select Payment Type
            </h2>
            <div className="space-y-4 mb-6">
              {paymentOptions.map((opt) => (
                <button
                  key={opt.type}
                  className={`w-full flex items-center gap-4 py-4 px-4 rounded-xl shadow transition text-lg border-2 focus:outline-none ${
                    selected === opt.type
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-white text-green-600 border-green-500 hover:bg-green-50"
                  }`}
                  onClick={() => setSelected(opt.type)}
                  type="button"
                >
                  <span>{opt.icon}</span>
                  <span className="flex-1 text-left font-semibold">
                    {opt.type}
                  </span>
                  {selected === opt.type && (
                    <span className="ml-auto font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
            <button
              className={`w-full py-3 rounded-full font-bold text-lg transition mt-2 ${
                selected
                  ? "bg-green-500 text-white shadow hover:bg-green-600"
                  : "bg-green-200 text-green-700 cursor-not-allowed"
              }`}
              disabled={!selected}
              onClick={() => setStep(2)}
            >
              Next
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Confirm & Pay
            </h2>
            <div className="flex flex-col items-center mb-6">
              <div className="mb-2 text-green-500">
                {paymentOptions.find((opt) => opt.type === selected)?.icon}
              </div>
              <div className="text-lg font-semibold mb-1">{selected}</div>
              <div className="text-gray-500 text-sm mb-2">Amount to pay</div>
              <div className="text-3xl font-bold text-green-500 mb-4">
                ₹{amount}
              </div>
            </div>
            <a
              href={upiUrl}
              className="block w-full bg-green-500 text-white py-3 rounded-full font-bold shadow hover:bg-green-600 transition text-center mb-3"
            >
              Pay Now
            </a>
            <button
              className="w-full py-2 rounded-full font-bold text-green-600 border border-green-500 bg-white hover:bg-green-50 transition"
              onClick={() => setStep(1)}
              type="button"
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentTypePage;
