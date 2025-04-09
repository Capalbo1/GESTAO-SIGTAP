import axios from 'axios';

// URL do backend Flask (ajuste se necessário)
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Porta 5000 é a padrão do Flask
});

export const getProcedimentos = () => {
  return api.get('/procedimentos'); // Rota definida no Flask
};

// Exemplo de função para login
export const login = (email, password) => {
  return api.post('/login', { email, password });
};