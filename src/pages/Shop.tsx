import ProductItem from "./product/ProductItem";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types/types.ts";
import { Container, Row, Col } from "react-bootstrap";

function Shop() {
  const { data: apiResponse, isLoading, error } = useProducts();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const products: Product[] = apiResponse || [];

  console.log("data:", apiResponse);

  return (
    <main>
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} lg={12}>
            <header className="text-center mb-4 mb-md-5">
              <h1
                className="fw-bold"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                }}
              >
                Välkommen till Amazing shirts!
              </h1>
            </header>

            <section>
              <ProductItem products={products} />
            </section>
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default Shop;
