import { useContext } from "react";
import { Button } from "react-bootstrap";
import { ShopContext } from "../context/ShopContext";
import type { AddToCartButtonTypes } from "../types/types";

function AddToCartButton({ id, text, stockQuantity }: AddToCartButtonTypes) {
  const shopContext = useContext(ShopContext);

  if (!shopContext) return null;

  const { addToCart, cartItems } = shopContext;

  const cartItemCount = cartItems[id] || 0;
  const isOutOfStock = stockQuantity <= 0;

  return (
    <div>
      <Button
        disabled={isOutOfStock}
        onClick={() => addToCart(id)}
        className="rounded-pill border-0 fw-bold shadow-sm px-4 py-2"
        style={{
          background: isOutOfStock
            ? "#d1d5db"
            : "linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)",
          color: isOutOfStock ? "#6b7280" : "#fff",
          cursor: isOutOfStock ? "not-allowed" : "pointer",
          transition: "all 0.2s ease",
          minWidth: "140px",
        }}
      >
        {isOutOfStock ? (
          "Slut i lager"
        ) : (
          <>
            {text}
            {cartItemCount > 0 && (
              <span className="ms-1">({cartItemCount})</span>
            )}
          </>
        )}
      </Button>
    </div>
  );
}

export default AddToCartButton;
