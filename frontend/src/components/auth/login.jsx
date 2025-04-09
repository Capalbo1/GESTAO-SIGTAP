import React, { useState } from 'react';
import { login } from '../../services/api';
import '../../styles/main.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password);
      console.log('Login bem-sucedido:', response.data);
      // Redirecionar para dashboard
    } catch (err) {
      setError('Credenciais inválidas');
    }
  };

  return (
   <main>
    <section className='login'>
    <h1>Faça seu Login</h1>
    <form onSubmit={handleSubmit}>
     <input
      type='email'
      placeholder='Email'
      value={email}
      onChange={(e) => setEmail(e.target.value)}
     />
     <input
      type='password'
      placeholder='Senha'
      value={password}
      onChange={(e) => setPassword(e.target.value)}
     />
     <div className='check+a'>
        <input type='checkbox' id='check' />
        <label htmlFor='check'>Lembrar-me</label>
        <a href='#'>Esqueci minha senha</a>
     </div>
     <button type='submit'>Entrar</button>
     {error && <p className='error'>{error}</p>}
    </form>
    </section>
    <section className='cadastro'></section>
    <section className='anuncio'></section>
   </main>
  )
}