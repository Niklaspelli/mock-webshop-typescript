import { Link } from "react-router-dom";
import AddToCartButton from "../../components/AddToCartButton";
import { Card, Row, Col, Container } from "react-bootstrap";
import type { Product } from "../../types/types.ts";

function ProductItem({ products }: { products: Product[] }) {
  return (
    <Container>
      <Row className="justify-content-center">
        {products?.map(
          ({ id, name, price, images, stock_quantity }: Product) => (
            <Col key={id} xs={12} sm={6} lg={6} xl={3} className="m-2">
              <Row className="justify-content-center">
                <Card
                  as="article"
                  className="border-0 shadow-sm rounded-4 overflow-hidden bg-white text-dark h-100"
                  style={{
                    width: "100%",
                    transition: "all 0.2s ease",
                    cursor: "pointer",
                  }}
                >
                  <Link
                    to={`/productdetails/${id}`}
                    className="text-decoration-none"
                  >
                    <div
                      style={{
                        height: "240px",
                        overflow: "hidden",
                        background: "#f8f9fa",
                      }}
                    >
                      <Card.Img
                        variant="top"
                        src={images[0]?.thumbnail}
                        alt={name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.3s ease",
                        }}
                      />
                    </div>
                  </Link>

                  <Card.Body className="p-4 d-flex flex-column">
                    {/* TOP */}
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div className="flex-grow-1 me-2">
                        <Card.Title
                          as="h2"
                          className="fw-bold text-dark mb-2"
                          style={{
                            fontSize: "1.1rem",
                            lineHeight: "1.4",
                            minHeight: "48px",
                          }}
                        >
                          {name}
                        </Card.Title>

                        <div className="d-flex flex-wrap gap-2 text-muted small">
                          <span>
                            {stock_quantity > 0
                              ? "✅ I lager"
                              : "❌ Ej i lager"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center pt-3 mt-3 border-top border-light">
                      <div>
                        <div
                          className="fw-bold"
                          style={{
                            color: "#4f46e5",
                            fontSize: "1.4rem",
                          }}
                        >
                          {price} kr
                        </div>

                        <div className="small text-muted">per styck</div>
                      </div>

                      <AddToCartButton
                        id={id}
                        text="Köp"
                        stockQuantity={stock_quantity}
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Row>
            </Col>
          ),
        )}
      </Row>
    </Container>
  );
}

export default ProductItem;
