import { useParams } from "react-router-dom";
import { useProductsDetails } from "../../hooks/useProductDetails";
import { Card, Row, Col, Container } from "react-bootstrap";

import AddToCartButton from "../../components/AddToCartButton";

function ProductDetails() {
  const { id } = useParams();
  const { data: product, isLoading, error } = useProductsDetails(id || "");

  if (isLoading) return <p>Laddar produktdetaljer...</p>;
  if (error) return <p>Fel: {error.message}</p>;
  if (!product) {
    return <p>Produkten kunde inte hittas.</p>;
  }

  return (
    <main
      className="container-fluid py-4 py-md-5"
      style={{
        background: "linear-gradient(to bottom, #f8f9fa, #ffffff)",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col xs={10} md={10} lg={8}>
            <Card
              as="article"
              className="border-0 shadow-sm rounded-4 overflow-hidden bg-white text-dark"
            >
              <Row className="g-0">
                <Col xs={12} md={6}>
                  <div className="bg-light h-100">
                    <Card.Img
                      src={`https://www.bortakvall.se/${product.images?.thumbnail}`}
                      alt={product.name}
                      className="img-fluid w-100 h-100"
                      style={{
                        objectFit: "cover",
                        minHeight: "300px",
                        maxHeight: "500px",
                      }}
                    />
                  </div>
                </Col>

                <Col xs={12} md={6}>
                  <Card.Body className="d-flex flex-column p-4 p-lg-5">
                    <header className="mb-4">
                      <Card.Title
                        as="h1"
                        className="fw-bold mb-3"
                        style={{
                          fontSize: "clamp(2rem, 5vw, 3rem)",
                          lineHeight: "1.2",
                        }}
                      >
                        {product?.name}
                      </Card.Title>

                      <div
                        className="fw-bold"
                        style={{
                          color: "#4f46e5",
                          fontSize: "2rem",
                        }}
                      >
                        {product.price} kr
                      </div>
                    </header>

                    <section className="mb-4 flex-grow-1">
                      <p
                        className="text-muted mb-0"
                        style={{
                          lineHeight: "1.8",
                          fontSize: "1rem",
                        }}
                      >
                        {product.description}
                      </p>
                    </section>

                    <footer className="mt-auto">
                      <div className="d-grid">
                        <AddToCartButton
                          id={product.id}
                          stockQuantity={product.stock_quantity}
                          text="Lägg till i varukorgen"
                        />
                      </div>
                    </footer>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default ProductDetails;
