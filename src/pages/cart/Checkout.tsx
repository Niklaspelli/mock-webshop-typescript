import { useState, useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Container, Button, Col, Row, Card } from "react-bootstrap";
import type { Product } from "../../types/types";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { useCreateOrder } from "../../hooks/useCreateOrder";

interface CheckoutTypes {
  cartProducts: Product[];
  total: number;
  maxLength?: string;
}

export const Checkout = () => {
  const { mutate, isPending } = useCreateOrder();
  const { cartItems, clearCart } = useContext(ShopContext)!;
  const navigate = useNavigate();
  const location = useLocation();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [customer, setCustomer] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    email: "",
    phone: "",
  });

  const state = location.state as CheckoutTypes | null;

  const cartProducts = state?.cartProducts || [];
  const totalAmount = state?.total || 0;

  const prepareOrderData = () => {
    const orderItems = cartProducts.map((product: Product) => {
      const quantity = cartItems[product.id] || 0;
      return {
        product_id: product.id,
        qty: cartItems[product.id] || 0,
        item_price: product.price,
        item_total: product.price * quantity,
      };
    });

    return {
      customer_first_name: customer.firstName,
      customer_last_name: customer.lastName,
      customer_address: customer.address,
      customer_city: customer.city,
      customer_postcode: customer.postalCode,
      customer_phone: customer.phone,
      customer_email: customer.email,
      order_items: orderItems,
      order_total: totalAmount,
    };
  };

  const handleShippingInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setCustomer((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalOrder = prepareOrderData();

    mutate(finalOrder, {
      onSuccess: () => {
        clearCart();
        setOrderPlaced(true);
      },
      onError: (error) => {
        console.error("Något gick fel:", error.message);
      },
    });
  };

  return (
    <main
      className="container-fluid py-4 py-md-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8f9fa, #ffffff)",
      }}
    >
      <Container>
        {orderPlaced ? (
          <Row className="justify-content-center">
            <Col xs={12} md={10} lg={7}>
              <Card className="border-0 shadow-sm rounded-4 text-center p-4 p-md-5">
                <Card.Body>
                  <Card.Title
                    as="h1"
                    className="fw-bold mt-3 mb-3"
                    style={{
                      fontSize: "clamp(2rem, 5vw, 3rem)",
                    }}
                  >
                    Tack för din beställning!
                  </Card.Title>

                  <p
                    className="text-muted mb-4"
                    style={{
                      fontSize: "1.1rem",
                    }}
                  >
                    Din order skickas inom 3–5 arbetsdagar 🚚
                  </p>

                  <Button
                    variant="dark"
                    size="lg"
                    className="rounded-pill px-4 py-3"
                    onClick={() => navigate("/")}
                  >
                    Fortsätt handla
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row className="justify-content-center g-4">
              <Col xs={12} lg={7}>
                <Card className="border-0 shadow-sm rounded-4 h-100">
                  <Card.Body className="p-4 p-md-5">
                    <header className="mb-4">
                      <h1
                        className="fw-bold mb-2"
                        style={{
                          fontSize: "clamp(2rem, 5vw, 3rem)",
                        }}
                      >
                        Checkout
                      </h1>

                      <p className="text-muted mb-0">
                        Fyll i dina uppgifter för att slutföra köpet.
                      </p>
                    </header>

                    <Row className="g-3">
                      <Col xs={12} md={6}>
                        <Form.Group controlId="checkoutFirstName">
                          <Form.Label>Förnamn</Form.Label>

                          <Form.Control
                            type="text"
                            maxLength={255}
                            name="firstName"
                            value={customer.firstName}
                            onChange={handleShippingInputChange}
                            size="lg"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={6}>
                        <Form.Group controlId="checkoutLastName">
                          <Form.Label>Efternamn</Form.Label>

                          <Form.Control
                            type="text"
                            maxLength={255}
                            name="lastName"
                            value={customer.lastName}
                            onChange={handleShippingInputChange}
                            size="lg"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12}>
                        <Form.Group controlId="checkoutAddress">
                          <Form.Label>Gatuadress</Form.Label>

                          <Form.Control
                            type="text"
                            maxLength={255}
                            name="address"
                            value={customer.address}
                            onChange={handleShippingInputChange}
                            size="lg"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={6}>
                        <Form.Group controlId="checkoutCity">
                          <Form.Label>Stad</Form.Label>

                          <Form.Control
                            type="text"
                            maxLength={255}
                            name="city"
                            value={customer.city}
                            onChange={handleShippingInputChange}
                            size="lg"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12} md={6}>
                        <Form.Group controlId="checkoutPostalCode">
                          <Form.Label>Postnummer</Form.Label>

                          <Form.Control
                            type="text"
                            maxLength={6}
                            name="postalCode"
                            value={customer.postalCode}
                            onChange={handleShippingInputChange}
                            size="lg"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12}>
                        <Form.Group controlId="checkoutPhone">
                          <Form.Label>Telefon</Form.Label>

                          <Form.Control
                            type="number"
                            maxLength={255}
                            name="phone"
                            value={customer.phone}
                            onChange={handleShippingInputChange}
                            size="lg"
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col xs={12}>
                        <Form.Group controlId="checkoutEmail">
                          <Form.Label>E-post</Form.Label>

                          <Form.Control
                            type="email"
                            name="email"
                            maxLength={255}
                            value={customer.email}
                            onChange={handleShippingInputChange}
                            size="lg"
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col xs={12} lg={5}>
                <Card className="border-0 shadow-sm rounded-4">
                  <Card.Body className="p-4 p-md-5">
                    <header className="mb-4">
                      <h2 className="fw-bold mb-2">Din beställning</h2>

                      <p className="text-muted mb-0">
                        Kontrollera din order innan köp.
                      </p>
                    </header>

                    <div className="table-responsive">
                      <Table borderless className="align-middle">
                        <thead>
                          <tr>
                            <th>Artikel</th>
                            <th>Antal</th>
                            <th>Pris</th>
                          </tr>
                        </thead>

                        <tbody>
                          {cartProducts.map((product: Product) => (
                            <tr key={product.id}>
                              <td>{product.name}</td>

                              <td>
                                {cartItems[product.id] || 0}
                                st
                              </td>

                              <td>
                                {product.price * (cartItems[product.id] || 0)}
                                kr
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>

                    <div className="border-top pt-4 mt-4">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="fw-medium">Total summa</span>

                        <span
                          className="fw-bold"
                          style={{
                            color: "#4f46e5",
                            fontSize: "1.5rem",
                          }}
                        >
                          {totalAmount} kr
                        </span>
                      </div>
                    </div>

                    <div className="d-grid gap-3 mt-4">
                      <Button
                        type="submit"
                        variant="dark"
                        size="lg"
                        className="rounded-4 py-3 fw-semibold"
                        disabled={isPending}
                      >
                        {isPending ? "Skickar..." : "Slutför köp"}
                      </Button>

                      <Button
                        variant="outline-secondary"
                        size="lg"
                        className="rounded-4 py-3"
                        onClick={() => navigate("/")}
                      >
                        Fortsätt handla
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </main>
  );
};
