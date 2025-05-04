import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const MyProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: userData, error: userError } = await supabase.auth.getUser();

      if (userError || !userData?.user) {
        setError("No se encontró un usuario autenticado.");
        return;
      }

      const { data: accountData, error: accountError } = await supabase
        .from("accounts")
        .select("id")
        .eq("email", userData.user.email)
        .single();

      if (accountError) {
        setError("Error al obtener los datos de la cuenta.");
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", accountData.id)
        .single();

      if (profileError) {
        setError("No se encontró un perfil. Por favor, crea tu perfil.");
      } else {
        setProfile(profileData);
      }
    };

    fetchProfile();
  }, []);

  const handleEdit = () => {
    navigate("/editprofile");
  };

  const handleHome = () => {
    navigate("/home");
  };

  if (error) {
    return (
      <div style={styles.container}>
        <p style={{ color: "red" }}>{error}</p>
        <button onClick={handleEdit} style={styles.editButton}>
          Crear perfil
        </button>
        <button onClick={handleHome} style={styles.homeButton}>
          Volver al Home
        </button>

        <button style={styles.floatingBackButton} onClick={handleHome}>
          ←
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mi Perfil</h1>
      {profile ? (
        <div style={styles.profileContainer}>
          <div style={styles.imageSection}>
            {profile.imagen_perfil && (
              <div style={styles.imageWrapper}>
                <h3>Imagen de perfil:</h3>
                <img
                  src={`https://your-supabase-url.supabase.co/storage/v1/object/public/avatars/${profile.imagen_perfil}`}
                  alt="Imagen de perfil"
                  style={styles.profileImage}
                />
              </div>
            )}
            {profile.fotos_adicionales?.length > 0 && (
              <div style={styles.additionalPhotosWrapper}>
                <h3>Fotos adicionales:</h3>
                {profile.fotos_adicionales.map((photo, idx) => (
                  <img
                    key={idx}
                    src={`https://your-supabase-url.supabase.co/storage/v1/object/public/avatars/${photo}`}
                    alt={`Foto adicional ${idx + 1}`}
                    style={styles.additionalPhoto}
                  />
                ))}
              </div>
            )}
          </div>

          <div style={styles.profileSection}>
            <h3>Nombre:</h3>
            <p>{profile.nombre}</p>
          </div>
          <div style={styles.profileSection}>
            <h3>Edad:</h3>
            <p>{profile.edad}</p>
          </div>
          <div style={styles.profileSection}>
            <h3>Biografía:</h3>
            <p>{profile.biografia}</p>
          </div>
          <div style={styles.profileSection}>
            <h3>Hijos:</h3>
            <p>{profile.hijos === "yes" ? "Sí" : "No"}</p>
          </div>
          <div style={styles.profileSection}>
            <h3>Ciudad:</h3>
            <p>{profile.ciudad}</p>
          </div>
          <div style={styles.profileSection}>
            <h3>Instagram:</h3>
            <p>{profile.instagram}</p>
          </div>
          <div style={styles.profileSection}>
            <h3>Teléfono:</h3>
            <p>{profile.telefono}</p>
          </div>

          <button onClick={handleEdit} style={styles.editButton}>
            Editar Perfil
          </button>
          <button onClick={handleHome} style={styles.homeButton}>
            Volver al Home
          </button>
        </div>
      ) : (
        <p>Cargando...</p>
      )}

      {/* Botón flotante esquina superior izquierda */}
      <button style={styles.floatingBackButton} onClick={handleHome}>
        ←
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
  profileContainer: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    color: "#004aad",
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  imageSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  imageWrapper: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  additionalPhotosWrapper: {
    display: "flex",
    flexDirection: "row",
    gap: "10px",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "50%",
  },
  additionalPhoto: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  profileSection: {
    marginBottom: "1rem",
    width: "100%",
  },
  editButton: {
    padding: "0.75rem",
    backgroundColor: "#00c2ff",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "1rem",
    width: "100%",
    maxWidth: "200px",
  },
  homeButton: {
    padding: "0.75rem",
    backgroundColor: "#ffc107",
    color: "#004aad",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    marginTop: "0.5rem",
    width: "100%",
    maxWidth: "200px",
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

export default MyProfilePage;
