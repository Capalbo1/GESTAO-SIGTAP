import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />  ✅ Rota padrão mostra login
        {/* Adicione outras rotas depois (ex.: /dashboard) */}
      </Routes>
    </BrowserRouter>
  );
}