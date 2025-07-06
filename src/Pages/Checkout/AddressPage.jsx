import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save address to localStorage or context if needed
    localStorage.setItem("checkoutAddress", JSON.stringify(form));
    navigate("/checkout/payment");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 pt-20">
      <h2 className="text-2xl font-bold mb-4">Delivery Address</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-xl shadow p-4 space-y-4"
      >
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          required
          placeholder="Full Name"
          className="w-full border rounded p-2"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          required
          placeholder="Phone Number"
          className="w-full border rounded p-2"
        />
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          required
          placeholder="Address"
          className="w-full border rounded p-2"
        />
        <input
          name="city"
          value={form.city}
          onChange={handleChange}
          required
          placeholder="City"
          className="w-full border rounded p-2"
        />
        <input
          name="pincode"
          value={form.pincode}
          onChange={handleChange}
          required
          placeholder="Pincode"
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-full font-bold shadow hover:bg-green-600 transition"
        >
          Select Payment Type
        </button>
      </form>
    </div>
  );
};

export default AddressPage;
