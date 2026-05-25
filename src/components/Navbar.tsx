import { useContext } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "phosphor-react";
import { ShopContext } from "../context/ShopContext";
import {
  Navbar as BootstrapNavbar,
  Container,
  Nav,
  Badge,
} from "react-bootstrap";

export function Navbar() {
  const { cartItems } = useContext(ShopContext)!;
  const totalItemsInCart = Object.values(cartItems).reduce(
    (total, count) => total + count,
    0,
  );

  return (
    <BootstrapNavbar
      as="nav"
      bg="dark"
      variant="dark"
      expand="lg"
      sticky="top"
      className="py-2 shadow-sm"
    >
      <Container>
        <BootstrapNavbar.Brand
          as={Link}
          to="/"
          className="fw-bold"
          style={{ color: "#ffdf00" }}
        >
          Bortakväll
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="main-navbar-nav" />

        <BootstrapNavbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto align-items-center gap-3 mt-2 mt-lg-0">
            <Nav.Link
              as={Link}
              to="/cart"
              className="d-flex align-items-center position-relative text-white"
              aria-label={`Varukorg, ${totalItemsInCart} artiklar`}
              style={{ paddingRight: "10px" }}
            >
              <ShoppingCart size={26} /> Varukorg
              {totalItemsInCart > 0 && (
                <Badge
                  pill
                  className="position-absolute top-10 start-100 translate-middle"
                  style={{
                    backgroundColor: "#ffdf00",
                    color: "#000000",
                    fontSize: "0.7rem",
                  }}
                >
                  {totalItemsInCart}
                </Badge>
              )}
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}
