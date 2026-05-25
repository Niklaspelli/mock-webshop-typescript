import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext.tsx";
import { Link } from "react-router-dom";
import { Card, Button, Row, Col, InputGroup, Form } from "react-bootstrap";
import type { Product } from "../../types/types.ts";

export const CartItem = ({ data }: { data: Product }) => {
  const { id, name, price, images, stock_quantity } = data;

  const shopContext = useContext(ShopContext);
  if (!shopContext) return null;

  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    shopContext;

  return (
    <>
      <Card
        as="article"
        className="border-0 shadow-sm rounded-4 overflow-hidden bg-white text-dark mx-auto"
        style={{
          width: "100%",
          maxWidth: "850px",
          transition: "0.25s ease",
        }}
      >
        <Row className="g-0 flex-column flex-lg-row">
          {/* IMAGE */}
          <Col xs={12} lg="auto">
            <div
              className="bg-light overflow-hidden h-100"
              style={{
                width: "100%",
                maxHeight: "260px",
              }}
            >
              <Link
                to={`/productdetails/${id}`}
                className="text-decoration-none"
              >
                <Card.Img
                  src={`https://www.bortakvall.se/${images?.thumbnail}`}
                  alt={name}
                  className="img-fluid w-100 h-100"
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Link>
            </div>
          </Col>

          {/* CONTENT */}
          <Col>
            <Card.Body className="d-flex flex-column h-100 p-3 p-md-4">
              {/* TITLE */}
              <div className="mb-3 text-center text-lg-start">
                <Card.Title
                  as="h3"
                  className="fw-bold mb-2"
                  style={{
                    fontSize: "1.25rem",
                    lineHeight: "1.4",
                  }}
                >
                  {name}
                </Card.Title>

                <p
                  className={`fw-medium mb-0 ${
                    stock_quantity > 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {stock_quantity > 0 ? "✅ I lager" : "❌ Ej i lager"}
                </p>
              </div>

              {/* BOTTOM */}
              <div className="mt-auto pt-3 border-top">
                <Row className="gy-4 align-items-center">
                  {/* PRICE */}
                  <Col
                    xs={12}
                    md={6}
                    lg={6}
                    className="
                text-center
                text-md-start
              "
                  >
                    <div
                      className="fw-bold"
                      style={{
                        color: "#4f46e5",
                        fontSize: "1.4rem",
                      }}
                    >
                      {price} kr
                    </div>

                    <div className="small text-muted">
                      Totalt:{" "}
                      <span className="fw-bold text-dark">
                        {(cartItems[id] * price).toFixed(2)} kr
                      </span>
                    </div>
                  </Col>

                  {/* CONTROLS */}
                  <Col
                    xs={12}
                    md={6}
                    lg={6}
                    className="
                d-flex
                justify-content-center
                justify-content-md-end
              "
                  >
                    <InputGroup
                      className="align-items-center"
                      style={{
                        maxWidth: "250px",
                      }}
                    >
                      <Button
                        variant="light"
                        className="rounded-circle border shadow-sm fw-bold"
                        onClick={() => removeFromCart(id)}
                        style={{
                          width: "42px",
                          height: "42px",
                        }}
                      >
                        -
                      </Button>

                      <Form.Control
                        type="number"
                        min="1"
                        value={cartItems[id]}
                        onChange={(e) =>
                          updateCartItemCount(Number(e.target.value), id)
                        }
                        className="text-center fw-bold rounded-pill mx-2"
                      />

                      <Button
                        onClick={() => addToCart(id)}
                        className="rounded-circle border-0 shadow-sm fw-bold"
                        style={{
                          width: "42px",
                          height: "42px",
                          background:
                            "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
                        }}
                      >
                        +
                      </Button>
                    </InputGroup>
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </>
  );
};
