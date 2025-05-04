import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Registra el nuevo usuario con email y contraseña
      const { user, error: signupError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signupError) {
        setError(`Error al registrar el usuario: ${signupError.message}`);
        return;
      }

      // Si el registro es exitoso, redirige directamente a la creación de perfil
      setMessage("Cuenta creada exitosamente. Redirigiendo a crear tu perfil...");
      
      // Aquí rediriges al usuario a la página de creación de perfil
      navigate("/profilecreation");
    } catch (err) {
      setError(`Algo salió mal: ${err.message || err}`);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Registro</h1>
      <form onSubmit={handleRegister} style={styles.form}>
        <label style={styles.label}>Correo electrónico</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.label}>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <label style={styles.label}>Confirmar contraseña</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={styles.input}
          required
        />
        {error && <p style={styles.error}>{error}</p>}
        {message && <p style={styles.success}>{message}</p>}
        <button type="submit" style={styles.button}>
          Registrarse
        </button>
      </form>
      <p style={styles.link}>
        ¿Ya tienes cuenta?{" "}
        <span onClick={() => navigate("/login")} style={styles.loginLink}>
          Inicia sesión
        </span>
      </p>
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
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    color: "#004aad",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
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
    marginTop: "1rem",
  },
  label: {
    fontWeight: "bold",
    color: "#004aad",
  },
  error: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
  },
  success: {
    color: "green",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
  },
  link: {
    marginTop: "1rem",
    fontSize: "0.95rem",
  },
  loginLink: {
    color: "#ffc107",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Register;
