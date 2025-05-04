import React, { useState } from "react";
import { supabase } from "../supabaseClient";  // Asegúrate de tener supabaseClient configurado correctamente
import { useNavigate } from "react-router-dom";

const GenerateCode = () => {
  const navigate = useNavigate();
  const [code, setCode] = useState("");  // Para almacenar el código generado
  const [error, setError] = useState("");  // Para manejar errores
  const [loading, setLoading] = useState(false);  // Para manejar el estado de carga

  // Función para generar un código aleatorio
  const generateRandomCode = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Caracteres que pueden ser usados en el código
    let randomCode = "";
    for (let i = 0; i < 8; i++) {
      randomCode += characters.charAt(Math.floor(Math.random() * characters.length));  // Selección aleatoria de caracteres
    }
    setCode(randomCode);  // Establece el código generado en el estado
  };

  // Función para guardar el código en la tabla 'accesscode' de Supabase
  const handleSaveCode = async () => {
    if (!code) {
      setError("Genera un código antes de guardar.");  // Si no hay código, muestra un error
      return;
    }

    setLoading(true);  // Muestra el estado de carga mientras se guarda el código

    try {
      // Inserta el código en la tabla 'accesscode' de Supabase
      const { error } = await supabase
        .from("accesscode")
        .insert([{ code }]);

      if (error) {
        setError("Error al guardar el código.");  // Si hay un error, muestra el mensaje de error
      } else {
        setError("");  // Limpia cualquier mensaje de error
      }
    } catch (err) {
      setError("Error al conectar con la base de datos.");  // En caso de error en la conexión
    } finally {
      setLoading(false);  // Al finalizar, oculta el estado de carga
    }
  };

  // Función para ir a la página de la lista de códigos
  const goToCodeList = () => {
    navigate("/admin/code-list");
  };

  // Función para ir al Dashboard
  const goToDashboard = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Generar Código de Acceso</h1>
      <div style={styles.card}>
        <button onClick={generateRandomCode} style={styles.button}>
          Generar Código Aleatorio
        </button>

        {code && <p style={styles.code}>Código generado: <strong>{code}</strong></p>}  {/* Muestra el código generado */}

        <button onClick={handleSaveCode} style={styles.button} disabled={loading}>
          {loading ? "Guardando..." : "Guardar Código"}  {/* Muestra el estado de carga si está guardando */}
        </button>

        {error && <p style={styles.error}>{error}</p>}  {/* Muestra los errores si los hay */}

        <button onClick={goToCodeList} style={styles.button}>
          Ir a la Lista de Códigos
        </button>  {/* Botón para ir a la lista de códigos */}
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
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  button: {
    padding: "0.75rem",
    backgroundColor: "#00c2ff",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  code: {
    fontSize: "1.1rem",
  },
  error: {
    color: "red",
    marginTop: "1rem",
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

export default GenerateCode;
