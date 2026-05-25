import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Container } from "react-bootstrap";

import ProductDetails from "./pages/product/ProductDetails";
import Shop from "./pages/Shop";
import { Navbar } from "./components/Navbar";
import { ShopContextProvider } from "./context/ShopContextProvider";
import { Cart } from "./pages/cart/Cart";
import { Checkout } from "./pages/cart/Checkout";

function App() {
  return (
    <ShopContextProvider>
      <Router>
        <Navbar />

        <main
          className="py-4 py-md-5"
          style={{
            minHeight: "100vh",
            background: "linear-gradient(to bottom, #f8f9fa, #ffffff)",
          }}
        >
          <Container fluid>
            <Routes>
              <Route path="/productdetails/:id" element={<ProductDetails />} />

              <Route path="/cart" element={<Cart />} />

              <Route path="/checkout" element={<Checkout />} />

              <Route path="/" element={<Shop />} />
            </Routes>
          </Container>
        </main>
      </Router>
    </ShopContextProvider>
  );
}

export default App;
