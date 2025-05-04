import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient"; // Asegúrate de que la ruta de supabaseClient es correcta
import { useNavigate } from "react-router-dom"; // Importa useNavigate

const CodeList = () => {
  const [codes, setCodes] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Inicializa useNavigate

  // Función para obtener los códigos desde Supabase
  useEffect(() => {
    const fetchCodes = async () => {
      const { data, error } = await supabase.from("accesscode").select("*");
      if (error) {
        setError("Error al obtener los códigos.");
      } else {
        setCodes(data);
      }
    };

    fetchCodes();
  }, []);

  // Función para eliminar un código de la base de datos
  const handleDelete = async (id) => {
    const { error } = await supabase.from("accesscode").delete().eq("id", id);
    if (error) {
      setError("Error al eliminar el código.");
    } else {
      const filteredCodes = codes.filter((code) => code.id !== id);
      setCodes(filteredCodes);
    }
  };

  // Función para redirigir a la página de GenerateCode
  const handleGenerateCode = () => {
    navigate("/admin/generate-code"); // Redirige a GenerateCode
  };

  // Función para ir al Dashboard
  const goToDashboard = () => {
    navigate("/admin/dashboard"); // Redirige al Dashboard
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Lista de Códigos de Acceso</h1>
      <div style={styles.card}>
        {error && <p style={styles.error}>{error}</p>}
        {codes.length > 0 ? (
          <>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Código</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {codes.map((code) => (
                  <tr key={code.id}>
                    <td>{code.id}</td>
                    <td>{code.code}</td>
                    <td>
                      <button
                        style={styles.button}
                        onClick={() => handleDelete(code.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p>No hay códigos de acceso disponibles.</p>
        )}
        {/* Botón siempre visible para generar código */}
        <div style={styles.buttonContainer}>
          <button onClick={handleGenerateCode} style={styles.generateButton}>
            Ir a Generar Código
          </button>
        </div>
      </div>

      {/* Botón flotante para ir al Dashboard */}
      <button style={styles.floatingBackButton} onClick={goToDashboard}>
        🏠
      </button>
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
  },
  card: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    color: "#004aad",
    width: "100%",
    maxWidth: "600px",
    textAlign: "center",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "1.5rem",
  },
  button: {
    backgroundColor: "#ff4d4d",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginBottom: "1rem",
  },
  buttonContainer: {
    marginTop: "2rem", // Añadir espacio entre la tabla y el botón
  },
  generateButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#00c2ff",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  floatingBackButton: {
    position: "fixed",
    top: "1rem",
    left: "1rem",
    backgroundColor: "white",
    color: "#004aad",
    border: "none",
    borderRadius: "50%",
    width: "35px",
    height: "35px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
    zIndex: 1000,
  },
};

export default CodeList;
