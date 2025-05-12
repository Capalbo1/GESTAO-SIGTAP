// CORREÇÃO DO COMPONENTE
import React, { useState } from 'react';
import { login } from '../../services/api';
import '../../styles/main.css'; // Caminho corrigido

export default function Login() { // Nome do componente em maiúscula
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log('Login bem-sucedido:', response.data);
    } catch (err) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <main className="auth-container">
      <section className="auth-card">
  <h1>Gestão Sigtap</h1>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label className="form-label">Email</label>
      <input className="form-input" type="email" />
    </div>
    
    <div className="form-group">
      <label className="form-label">Senha</label>
      <input className="form-input" type="password" />
    </div>

    <div className="checkbox-group">
      <input type="checkbox" id="remember" />
      <label htmlFor="remember">Lembrar-me</label>
      <a className="forgot-password" href="#">Esqueci minha senha</a>
    </div>

    <button className="btn btn--primary">Entrar</button>

    {error && <div className="error-message">{error}</div>}
  </form>
</section>
    </main>
  );
}