// src/pages/HomePage.jsx
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido a Social Match</h1>
      <p style={styles.subtitle}>¿Qué te gustaría hacer?</p>

      <div style={styles.buttonsContainer}>
        <button onClick={() => navigate("/like")} style={styles.button}>
          Buscar match
        </button>
        <button onClick={() => navigate("/match")} style={styles.button}>
          Lista de Matches
        </button>
        <button onClick={() => navigate("/myprofile")} style={styles.button}>
          Mi perfil
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#004aad",
    color: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "2rem",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color:'white',
  },
  subtitle: {
    fontSize: "1.25rem",
    marginBottom: "2rem",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems:"center",
    gap: "1rem",
    width: "100%",
    maxWidth: "300px",
  },
  button: {
    padding: "1rem",
    fontSize: "1.25rem",
    backgroundColor: "white",
    color: "#004aad",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    maxWidth: "200px",
    transition: "background-color 0.3s ease",
  },
};

export default HomePage;
