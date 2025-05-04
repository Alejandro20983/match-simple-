import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckEmail = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>¡Revisa tu correo!</h1>
      <p style={styles.text}>
        Hemos enviado un enlace mágico a tu correo electrónico. Haz clic en el enlace para iniciar sesión.
      </p>
      <button onClick={() => navigate("/login")} style={styles.button}>
        Volver al inicio
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#004aad",
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "white",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "white",
  },
  text: {
    color: "white",
    marginBottom: "1rem",
    fontSize: "1rem",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#004aad",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
  },
};

export default CheckEmail;
