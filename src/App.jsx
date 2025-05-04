import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

// Páginas de usuario
import Login from './components/Login';
import Register from './components/Register';
import AccessCodePage from './components/Acesscodepage';
import ProfileCreation from './components/ProfileCreation';
import Likes from './components/Likes';
import Match from './components/Match';
import MyProfilePage from './components/Myprofilepage';
import Home from './components/Home';
import EditProfile from './components/Editprofile';
import CheckEmail from './components/Checkmail';

// Páginas de administrador
import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import GenerateCode from './admin/Generatecode';
import CodeList from './admin/Codelist';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas de usuario */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/acces-code" element={<AccessCodePage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profilecreation" element={<ProfileCreation />} />
        <Route path="/like" element={<Likes />} />
        <Route path="/match" element={<Match />} />
        <Route path="/myprofile" element={<MyProfilePage />} />
        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/check-email" element={<CheckEmail />} />

        {/* Rutas de administrador completamente separadas */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/generate-code" element={<GenerateCode />} />
        <Route path="/admin/code-list" element={<CodeList />} />
      </Routes>
    </Router>
  );
}

export default App;
