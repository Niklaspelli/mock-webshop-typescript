import { useContext } from "react";
import { useProducts } from "../../hooks/useProducts";
import { ShopContext } from "../../context/ShopContext";
import { CartItem } from "./CartItem";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const { data: apiResponse, isLoading, error } = useProducts();
  const navigate = useNavigate();

  const shopContext = useContext(ShopContext);
  if (!shopContext) return null;
  const { cartItems } = shopContext;
  const totalItemsInCart = Object.values(cartItems).reduce(
    (total, count) => total + count,
    0,
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  const allProducts = apiResponse || [];

  const productsInCart = allProducts.filter((product) => {
    const quantity = cartItems[product.id] || cartItems[product.id] || 0;
    return quantity > 0;
  });

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    productsInCart.forEach((product) => {
      const quantity = cartItems[product.id] || 0;
      totalPrice += product.price * quantity;
    });
    return totalPrice;
  };

  const totalAmount = calculateTotalPrice();

  return (
    <main
      className="container-fluid py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #f8f9fa, #ffffff)",
      }}
    >
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div
            className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4 p-4"
            style={{
              background: "#fff",
              borderRadius: "24px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
            }}
          >
            <div>
              <h1
                className="fw-bold mb-2"
                style={{
                  fontSize: "clamp(2rem, 5vw, 3rem)",
                  color: "#212529",
                }}
              >
                Din Varukorg
              </h1>

              <p className="text-muted mb-0" style={{ fontSize: "1rem" }}>
                Sammanställning:{" "}
                <span className="fw-semibold text-dark">
                  {totalItemsInCart} st artiklar
                </span>
              </p>
            </div>

            {productsInCart.length > 0 && (
              <div
                className="mt-4 mt-md-0 px-4 py-3"
                style={{
                  background: "#212529",
                  borderRadius: "18px",
                  color: "#fff",
                  minWidth: "180px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "0.9rem",
                    opacity: 0.8,
                  }}
                >
                  Totalt
                </div>

                <div
                  style={{
                    fontSize: "2rem",
                    fontWeight: "700",
                  }}
                >
                  {totalAmount}:-
                </div>
              </div>
            )}
          </div>

          <div
            className="p-3 p-md-4"
            style={{
              background: "#fff",
              borderRadius: "24px",
              boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
            }}
          >
            {productsInCart.length === 0 ? (
              <div
                className="text-center py-5"
                style={{
                  color: "#6c757d",
                }}
              >
                <h3 className="fw-bold mt-3">Din varukorg är tom</h3>

                <Button
                  variant="dark"
                  size="lg"
                  className="mt-3 px-4 rounded-pill"
                  onClick={() => navigate("/")}
                >
                  Till shoppen
                </Button>
              </div>
            ) : (
              <>
                <div className="d-flex flex-column gap-3 align-items-center">
                  {productsInCart.map((product) => (
                    <div
                      key={product.id}
                      className="w-100 d-flex justify-content-center p-3"
                      style={{
                        border: "1px solid #f1f3f5",
                        borderRadius: "18px",
                        transition: "0.2s ease",
                        background: "#fafafa",
                      }}
                    >
                      <CartItem data={product} />
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <Button
                    variant="dark"
                    size="lg"
                    className="w-100 py-3 rounded-4 fw-semibold shadow-sm"
                    style={{
                      fontSize: "1.1rem",
                      letterSpacing: "0.5px",
                    }}
                    onClick={() =>
                      navigate("/checkout", {
                        state: {
                          cartProducts: productsInCart,
                          total: totalAmount,
                        },
                      })
                    }
                  >
                    Lägg din order →
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
