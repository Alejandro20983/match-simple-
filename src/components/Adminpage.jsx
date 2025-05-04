import React from 'react';
import { generateAccessCode } from '../services/supabaseUtils';  // Ajusta la ruta si es necesario

const AdminPage = () => {
  const handleGenerateCode = async () => {
    const newCode = await generateAccessCode();
    if (newCode) {
      alert('Código generado exitosamente!');
    } else {
      alert('Error al generar el código.');
    }
  };

  return (
    <div>
      <button onClick={handleGenerateCode}>Generar Código</button>
    </div>
  );
};

export default AdminPage;
