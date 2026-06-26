import { useCart } from "../context/CartContext";

type Product = {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { addToCart } = useCart();

  return (
    <div style={styles.card}>
      <h3>{product.name}</h3>

      <p>Precio: ${product.price}</p>
      <p>Stock: {product.stock}</p>
      <p>Categoría: {product.category}</p>

      <button
        style={styles.button}
        onClick={() => addToCart(product, 1)}
        disabled={product.stock === 0}
      >
        {product.stock > 0 ? "Agregar al carrito" : "Sin stock"}
      </button>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    padding: "15px",
    margin: "10px",
    borderRadius: "8px",
    width: "220px",
  },
  button: {
    marginTop: "10px",
    padding: "8px",
    cursor: "pointer",
    width: "100%",
  },
};
