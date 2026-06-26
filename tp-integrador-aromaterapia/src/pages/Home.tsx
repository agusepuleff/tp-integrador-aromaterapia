export default function Home() {
  return (
    <main style={styles.main}>
      <h1>Bienvenido al proyecto</h1>
      <p>Este es el home principal de la aplicación.</p>
    </main>
  );
}

const styles = {
  main: {
    padding: "40px",
    textAlign: "center",
  },
};
