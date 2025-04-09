import React, { useState } from 'react';
import { login } from '../../services/api';
import '../../styles/main.css';  // Estilos SMACSS/OOCSS

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log('Token:', response.data.token);
      // Redirecionar para /dashboard após login
    } catch (err) {
      setError('E-mail ou senha inválidos');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="text-2xl font-bold text-center mb-6">Acesse o Sistema</h1>
        <form onSubmit={handleSubmit}>
          {/* Seus inputs e botão com classes OOCSS */}
        </form>
      </div>
    </div>
  );
}