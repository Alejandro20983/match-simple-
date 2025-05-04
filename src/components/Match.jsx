import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useLocation, useNavigate } from "react-router-dom";

const MatchPageList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const lastMatchProfile = location.state?.matchProfile || null;

  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Función para obtener el ID de cuenta basado en el correo electrónico
  const fetchAccountId = async (userEmail) => {
    const { data, error } = await supabase
      .from("accounts")
      .select("id")
      .eq("email", userEmail)
      .single();
    if (error) throw error;
    return data.id;
  };

  // Cargar los matches al montar el componente
  useEffect(() => {
    const loadMatches = async () => {
      try {
        setLoading(true);
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();
        if (userError || !user) throw new Error("Usuario no autenticado");

        const accountId = await fetchAccountId(user.email);

        const { data: rawMatches, error: matchesError } = await supabase
          .from("matches")
          .select("user1_id, user2_id, match_date")
          .or(`user1_id.eq.${accountId},user2_id.eq.${accountId}`);
        if (matchesError) throw matchesError;

        if (rawMatches.length === 0) {
          setMatches([]);
          setLoading(false);
          return;
        }

        const otherIds = rawMatches.map((m) =>
          m.user1_id === accountId ? m.user2_id : m.user1_id
        );

        const { data: profiles, error: profilesError } = await supabase
          .from("user_profiles")
          .select("user_id, nombre, imagen_perfil")
          .in("user_id", otherIds);
        if (profilesError) throw profilesError;

        const enriched = rawMatches.map((m) => {
          const otherId = m.user1_id === accountId ? m.user2_id : m.user1_id;
          const profile = profiles.find((p) => p.user_id === otherId) || {};
          return {
            ...m,
            partner: profile,
          };
        });

        setMatches(enriched);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error al cargar los matches");
      } finally {
        setLoading(false);
      }
    };

    loadMatches();
  }, [location.state]);

  if (loading) {
    return (
      <div style={styles.container}>
        <p style={{ color: "white" }}>Cargando matches...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.matchTitle}>💖 Tus Matches 💖</h1>

      {lastMatchProfile && (
        <div style={styles.lastMatch}>
          <h2 style={{ marginBottom: "0.5rem" }}>Último match:</h2>
          <p>
            <strong>{lastMatchProfile.nombre}</strong> — ¡Conéctate!
          </p>
        </div>
      )}

      {error && <p style={styles.error}>{error}</p>}

      {matches.length > 0 ? (
        <ul style={styles.list}>
          {matches.map(({ partner, match_date }, idx) => (
            <li key={idx} style={styles.matchItem}>
              {partner.imagen_perfil && (
                <img
                  src={`https://YOUR_SUPABASE_URL.supabase.co/storage/v1/object/public/avatars/${partner.imagen_perfil}`}
                  alt={partner.nombre}
                  style={styles.avatar}
                />
              )}
              <div>
                <p style={{ margin: 0 }}>
                  <strong>{partner.nombre}</strong>
                </p>
                <small>
                  Match el{" "}
                  {new Date(match_date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </small>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: "white" }}>Aún no tienes matches.</p>
      )}

      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/like")}>
          Seguir viendo perfiles
        </button>
      </div>

      {/* Botón flotante en la esquina superior izquierda */}
      <button style={styles.floatingBackButton} onClick={() => navigate("/home")}>
        ←
      </button>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#004aad",
    color: "white",
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  matchTitle: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
  },
  lastMatch: {
    backgroundColor: "#ffffff20",
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1.5rem",
    textAlign: "center",
    width: "100%",
    maxWidth: "400px",
    color: "white",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    width: "100%",
    maxWidth: "400px",
  },
  matchItem: {
    backgroundColor: "white",
    color: "#004aad",
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    padding: "0.75rem",
    borderRadius: "8px",
    marginBottom: "0.75rem",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  buttonContainer: {
    display: "flex",
    gap: "1rem",
    marginTop: "2rem",
  },
  button: {
    padding: "0.5rem 1rem",
    backgroundColor: "white",
    color: "#004aad",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    marginBottom: "1rem",
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

export default MatchPageList;
