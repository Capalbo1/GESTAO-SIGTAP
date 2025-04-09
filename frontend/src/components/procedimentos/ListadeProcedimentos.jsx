import React, { useState, useEffect } from 'react';
import { getProcedimentos } from '../../services/api';

function ListaProcedimentos() {
  const [procedimentos, setProcedimentos] = useState([]);
  const [cid, setCid] = useState('');

  const buscarDados = async () => {
    const response = await getProcedimentos(cid);
    setProcedimentos(response.data);
  };

  useEffect(() => { buscarDados(); }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Filtrar por CID"
        value={cid}
        onChange={(e) => setCid(e.target.value)}
      />
      <button onClick={buscarDados}>Buscar</button>
      <ul>
        {procedimentos.map((proc) => (
          <li key={proc.codigo}>
            {proc.nome} - R$ {proc.valor.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaProcedimentos;