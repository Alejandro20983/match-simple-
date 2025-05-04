import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Necesitamos usar el hook useNavigate para la navegación

const EditProfile = () => {
  const navigate = useNavigate(); // Crear la instancia de navegación
  // Datos de ejemplo del perfil, aquí los datos vendrían de un API o un estado global como Redux
  const initialProfile = {
    name: "María",
    age: 28,
    bio: "Amante de los gatos, el arte y las buenas conversaciones.",
    children: "no",
    city: "Madrid",
    instagram: "@maria_vida",
    phone: "+34 600 123 456",
    photo1: "https://via.placeholder.com/150",
    photo2: "https://via.placeholder.com/150",
  };

  // Estados para el formulario
  const [photos, setPhotos] = useState({ photo1: null, photo2: null });
  const [mainPhoto, setMainPhoto] = useState(null);
  const [name, setName] = useState(initialProfile.name);
  const [age, setAge] = useState(initialProfile.age);
  const [bio, setBio] = useState(initialProfile.bio);
  const [children, setChildren] = useState(initialProfile.children);
  const [city, setCity] = useState(initialProfile.city);
  const [instagram, setInstagram] = useState(initialProfile.instagram);
  const [phone, setPhone] = useState(initialProfile.phone);

  // Función para manejar el cambio de fotos
  const handleImageChange = (e, photoNum) => {
    const file = e.target.files[0];
    setPhotos((prevPhotos) => ({
      ...prevPhotos,
      [photoNum]: file,
    }));
  };

  // Función para establecer la foto principal
  const handleMainImageChange = (photoNum) => {
    setMainPhoto(photoNum);
  };

  // Función de submit para guardar los cambios
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí se podría hacer una llamada a la API para guardar los cambios
    console.log("Perfil editado", { name, age, mainPhoto, bio, children, city, instagram, phone });
    navigate("/myprofile"); // Redirige al perfil una vez se guardan los cambios
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Editar Perfil</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.imageContainer}>
          <div style={styles.imageBox}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "photo1")}
              style={styles.input}
            />
            {photos.photo1 ? (
              <img
                src={URL.createObjectURL(photos.photo1)}
                alt="Foto 1"
                style={styles.image}
              />
            ) : (
              <img src={initialProfile.photo1} alt="Foto 1" style={styles.image} />
            )}
            <button
              type="button"
              onClick={() => handleMainImageChange("photo1")}
              style={styles.button}
            >
              Seleccionar como principal
            </button>
          </div>
          <div style={styles.imageBox}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, "photo2")}
              style={styles.input}
            />
            {photos.photo2 ? (
              <img
                src={URL.createObjectURL(photos.photo2)}
                alt="Foto 2"
                style={styles.image}
              />
            ) : (
              <img src={initialProfile.photo2} alt="Foto 2" style={styles.image} />
            )}
            <button
              type="button"
              onClick={() => handleMainImageChange("photo2")}
              style={styles.button}
            >
              Seleccionar como principal
            </button>
          </div>
        </div>

        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Edad"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          style={styles.input}
        />
        <textarea
          placeholder="BIO"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
          style={{ ...styles.input, height: "100px" }}
        />
        <label style={styles.label}>
          ¿Tienes hijos?
          <select
            value={children}
            onChange={(e) => setChildren(e.target.value)}
            style={styles.input}
          >
            <option value="yes">Sí</option>
            <option value="no">No</option>
          </select>
        </label>
        <input
          type="text"
          placeholder="Ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Instagram"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="tel"
          placeholder="Número de Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Guardar Cambios
        </button>
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
  // Media queries for responsiveness
  '@media (max-width: 768px)': {
    form: {
      padding: '1rem',
      maxWidth: '90%',
    },
    input: {
      fontSize: '0.9rem',
      padding: '0.6rem',
    },
  },
  '@media (max-width: 480px)': {
    form: {
      padding: '0.5rem',
      maxWidth: '100%',
    },
    input: {
      fontSize: '0.8rem',
      padding: '0.5rem',
    },
  },
};


export default EditProfile;
