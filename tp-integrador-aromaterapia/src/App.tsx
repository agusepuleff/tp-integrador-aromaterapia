import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import { CarritoProvider } from "./context/CartContext";

const App = () => {
  return (
    <CarritoProvider>
      <div style={styles.container}>
        <Navbar />
        <Home />
        <Footer />
      </div>
    </CarritoProvider>
  );
};

export default App;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
};
