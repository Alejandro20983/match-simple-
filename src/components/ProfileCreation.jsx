import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

const ProfileCreation = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState({ photo1: null, photo2: null });
  const [mainPhoto, setMainPhoto] = useState(null);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [biografia, setBiografia] = useState("");
  const [hijos, setHijos] = useState("no");
  const [ciudad, setCiudad] = useState("");
  const [instagram, setInstagram] = useState("");
  const [telefono, setTelefono] = useState("");
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);

        const { data: accountData, error: accountError } = await supabase
          .from("accounts")
          .select("id")
          .eq("email", data.user.email)
          .single();

        if (accountError) {
          setError("Error al obtener el usuario desde la base de datos.");
        } else {
          setUserId(accountData.id);
        }
      } else {
        setError("Usuario no autenticado.");
      }
    };
    fetchUser();
  }, []);

  const handleImageChange = (e, photoNum) => {
    const file = e.target.files[0];
    setPhotos((prevPhotos) => ({
      ...prevPhotos,
      [photoNum]: file,
    }));
  };

  const handleMainImageChange = (photoNum) => {
    setMainPhoto(photoNum);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user || !userId) {
      setError("No se ha encontrado un usuario autenticado.");
      return;
    }

    if (!nombre || !edad || !biografia || !ciudad || !instagram || !telefono) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    const uploadPhoto = async (photo, photoName) => {
      if (!photo) return null;
      const filePath = `${user.id}/${photoName}-${Date.now()}`;
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(filePath, photo);

      if (error) throw new Error("Error al subir la imagen: " + error.message);
      return data.path;
    };

    try {
      const photo1Path = photos.photo1 ? await uploadPhoto(photos.photo1, "photo1") : null;
      const photo2Path = photos.photo2 ? await uploadPhoto(photos.photo2, "photo2") : null;

      const imagenPerfil =
        mainPhoto === "photo1" ? photo1Path : mainPhoto === "photo2" ? photo2Path : photo1Path;

      const { error: insertError } = await supabase.from("user_profiles").upsert([
        {
          user_id: userId,
          nombre,
          edad,
          biografia,
          hijos,
          ciudad,
          instagram,
          telefono,
          imagen_perfil: imagenPerfil || null,
          fotos_adicionales: photo1Path && photo2Path ? [photo1Path, photo2Path] : null,
        },
      ]);

      if (insertError) throw new Error("Error al guardar los datos: " + insertError.message);

      navigate("/myprofile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Crear Perfil</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.imageContainer}>
          {["photo1", "photo2"].map((photoNum) => (
            <div key={photoNum} style={styles.imageBox}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e, photoNum)}
                style={styles.input}
              />
              {photos[photoNum] && (
                <img
                  src={URL.createObjectURL(photos[photoNum])}
                  alt={photoNum}
                  style={styles.image}
                />
              )}
              <button
                type="button"
                onClick={() => handleMainImageChange(photoNum)}
                style={styles.button}
              >
                Seleccionar como principal
              </button>
            </div>
          ))}
        </div>

        <label style={styles.label}>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Edad</label>
        <input
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Biografía</label>
        <textarea
          value={biografia}
          onChange={(e) => setBiografia(e.target.value)}
          required
          style={{ ...styles.input, height: "100px" }}
        />

        <label style={styles.label}>¿Tienes hijos?</label>
        <select
          value={hijos}
          onChange={(e) => setHijos(e.target.value)}
          style={styles.input}
        >
          <option value="yes">Sí</option>
          <option value="no">No</option>
        </select>

        <label style={styles.label}>Ciudad</label>
        <input
          type="text"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Instagram</label>
        <input
          type="text"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          required
          style={styles.input}
        />

        <label style={styles.label}>Número de Teléfono</label>
        <input
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Guardar
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
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
  imageContainer: {
    display: "flex",
    gap: "1rem",
    marginBottom: "1rem",
  },
  imageBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
  },
  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
  },
};

export default ProfileCreation;
