import React, { useEffect, useState } from 'react';
import api from './services/api';

import './global.scss'
import './App.scss'
import './Sidebar.scss'
import './Main.scss'

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

function App() {

  const [devs, setDevs] = useState([]);

  useEffect(() => {
    const loadDevs = async () => {
      const response = await api.get('/devs');
      setDevs(response.data);
    }

    loadDevs();
  }, []);

  const handleAddDev = async (data) => {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">

      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>

        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>

        {devs.length === 0 ? <strong className="empty-list">Nenhum item cadastrado</strong> : ''}
      </main>

    </div>
  );
}

export default App;
