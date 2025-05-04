import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdminAuthenticated");

    if (isAdmin !== "true") {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Panel de Administrador</h1>
      <div style={styles.card}>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <a href="/admin/generate-code" style={styles.link}>Generar Código</a>
          </li>
          <li style={styles.listItem}>
            <a href="/admin/code-list" style={styles.link}>Ver Códigos</a>
          </li>
          <li style={styles.listItem}>
            <button
              onClick={() => {
                localStorage.removeItem("isAdminAuthenticated");
                navigate("/admin/login");
              }}
              style={{ ...styles.link, backgroundColor: "red" }}
            >
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#004aad",
    minHeight: "100vh",
    padding: "2rem",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "white",
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    color: "#004aad",
    width: "100%",
    maxWidth: "500px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  listItem: {
    textAlign: "center",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontWeight: "bold",
    fontSize: "1.1rem",
    backgroundColor: "#004aad",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    display: "inline-block",
    transition: "background-color 0.3s",
    border: "none",
    cursor: "pointer"
  },
};

export default AdminDashboard;
