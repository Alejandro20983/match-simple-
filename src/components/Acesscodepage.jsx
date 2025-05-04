import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const AccessCodePage = () => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { data, error: dbError } = await supabase
      .from("accesscode")
      .select("*")
      .eq("code", code.trim())
      .single();

    if (dbError || !data) {
      setError("Código inválido. Intenta nuevamente.");
      return;
    }

    if (data.role && data.role.trim().toLowerCase() === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/home");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ingresa tu código de acceso</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Código de acceso</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Entrar
        </button>
        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#004aad",
    minHeight: "100vh",
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "300px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "-0.5rem",
    color: "white",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    fontSize: "16px",
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#00c2ff",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    marginTop: "1rem",
  },
};

export default AccessCodePage;
