export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>Mi Proyecto</h2>
      <div>
        <a href="#">Inicio</a>
        <a href="#">Productos</a>
        <a href="#">Contacto</a>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    backgroundColor: "#222",
    color: "white",
  },
};
