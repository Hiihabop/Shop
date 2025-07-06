import { useState } from "react";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Home from "./Pages/Home/Home.jsx";
import Footer from "./components/Footer/Footer.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import CartPage from "./Pages/Cart/CartPage.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import FinalPaymentPage from "./Pages/Checkout/FinalPaymentPage.jsx";
import AddressPage from "./Pages/Checkout/AddressPage.jsx";
import PaymentTypePage from "./Pages/Checkout/PaymentTypePage.jsx";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const showHeaderAndFooter = location.pathname !== "/cart";

  return (
    <CartProvider>
      {showHeaderAndFooter && (
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout/summary" element={<FinalPaymentPage />} />
        <Route path="/checkout/address" element={<AddressPage />} />
        <Route path="/checkout/payment" element={<PaymentTypePage />} />
      </Routes>
      {showHeaderAndFooter && <Footer />}
    </CartProvider>
  );
}

export default App;
