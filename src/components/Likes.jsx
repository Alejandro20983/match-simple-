import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const LikePage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [likedUsers, setLikedUsers] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Crear un ID anónimo fijo si no existe
    let storedId = localStorage.getItem("anonymous_user_id");
    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem("anonymous_user_id", storedId);
    }
    setUserId(storedId);
    fetchUsers(storedId);
  }, []);

  const fetchUsers = async (currentUserId) => {
    setLoading(true);
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .neq('user_id', currentUserId); // Excluir al usuario anónimo

    if (error) {
      setError('Error al cargar los usuarios.');
    } else {
      setUsers(data);
    }
    setLoading(false);
  };

  const handleLike = async (likedUserId) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('likes')
        .insert([{ sender_id: userId, receiver_id: likedUserId }]);

      if (error) {
        setError('Error al guardar el like.');
        return;
      }

      setLikedUsers([...likedUsers, likedUserId]);
      checkForMatch(userId, likedUserId);
    } catch {
      setError('Ocurrió un error al procesar el like.');
    }
  };

  const checkForMatch = async (userId1, userId2) => {
    const { data } = await supabase
      .from('likes')
      .select('*')
      .eq('sender_id', userId2)
      .eq('receiver_id', userId1)
      .single();

    if (data) {
      await supabase.from('matches').insert([
        {
          user1_id: userId1,
          user2_id: userId2,
          match_date: new Date().toISOString(),
        },
      ]);
      alert('¡Match encontrado!');
      navigate('/match');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Perfiles</h1>
      <div style={styles.card}>
        {loading ? (
          <p>Cargando...</p>
        ) : error ? (
          <p style={styles.error}>{error}</p>
        ) : users.length > 0 ? (
          users.map((user) => (
            <div key={user.user_id} style={styles.userCard}>
              <p><strong>{user.nombre}</strong>, {user.edad}</p>
              <p>{user.ciudad}</p>
              <div style={styles.buttons}>
                <button
                  style={styles.dislikeButton}
                  onClick={() => {}}
                >
                  No me gusta
                </button>
                <button
                  style={styles.likeButton}
                  onClick={() => handleLike(user.user_id)}
                  disabled={likedUsers.includes(user.user_id)}
                >
                  {likedUsers.includes(user.user_id) ? 'Ya diste like' : 'Me gusta'}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay usuarios disponibles.</p>
        )}
      </div>

      <button
        style={styles.arrowButton}
        onClick={() => navigate('/home')}
      >
        ←
      </button>
    </div>
  );
};

// ... tus estilos quedan igual ...


const styles = {
  container: {
    backgroundColor: '#004aad',
    color: 'white',
    minHeight: '100vh',
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
  },
  card: {
    backgroundColor: 'white',
    color: '#004aad',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
    width: '100%',
    maxWidth: '600px',
    marginBottom: '2rem',
  },
  userCard: {
    marginBottom: '1.5rem',
    borderBottom: '1px solid #ddd',
    paddingBottom: '1rem',
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    marginTop: '0.5rem',
  },
  likeButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#00c2ff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  dislikeButton: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ff4d4d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  arrowButton: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    padding: '0.3rem',  // Reducimos el padding
    backgroundColor: 'white',
    color: '#004aad',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    fontSize: '1.5rem',  // Tamaño más pequeño para la flecha
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35px',  // Hacemos el botón más pequeño en tamaño
    height: '35px',  // Botón redondo y pequeño
  },
  error: {
    color: 'red',
  },
};

export default LikePage;
