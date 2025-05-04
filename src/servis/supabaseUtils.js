// supabaseUtils.js
import { supabase } from '../supabaseClient';  // Importamos el cliente de Supabase

// Función para registrar un nuevo usuario
export const registerUser = async (email, password, name) => {
  // Registrar al usuario en Supabase
  const { user, error } = await supabase.auth.signUp({
    email,
    password,
  });

  // Si hay un error durante el registro
  if (error) {
    throw new Error(error.message);  // Lanzamos el error si ocurre
  }

  // Crear el perfil del usuario en la tabla 'profiles' después del registro
  const { data, error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: user.id,  // ID del usuario registrado
        email: user.email,  // Email del usuario
        name: name,  // Nombre proporcionado en el registro
        enabled: true,  // Puedes ajustarlo según la lógica de tu aplicación
      },
    ]);

  // Si hubo un error al crear el perfil
  if (profileError) {
    throw new Error(profileError.message);  // Lanzamos el error si ocurre
  }

  return data;  // Retornamos los datos del perfil creado
};
