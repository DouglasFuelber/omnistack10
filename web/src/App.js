import React, { useEffect, useState } from 'react';
import api from './services/api';

import './global.scss'
import './App.scss'
import './Sidebar.scss'
import './Main.scss'

function App() {

  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => { console.error(err); },
      { timeout: 30000 }
    );
  }, []);

  const handleAddDev = async (e) => {
    e.preventDefault();

    const response = await api.post('/devs', {
      github_username,
      techs,
      latitude,
      longitude
    });

    console.log(response.data)
  }

  return (
    <div id="app">

      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>

          <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input
              name="github_username"
              id="github_username"
              required
              value={github_username}
              onChange={e => setGithubUsername(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input
              name="techs"
              id="techs"
              required
              value={techs}
              onChange={e => setTechs(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input
                name="latitude"
                id="latitude"
                type="number"
                required
                value={latitude}
                onChange={e => setLatitude(e.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input
                name="longitude"
                id="longitude"
                type="number"
                required
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
              />
            </div>
          </div>

          <button type="submit">Salvar</button>

        </form>
      </aside>

      <main>
        <ul>

          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/15067098?s=460&v=4" alt="Douglas Fuelber" />
              <div className="user-info">
                <strong>Douglas Fuelber</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>Full Stack Web Developer</p>
            <a href="https://github.com/DouglasFuelber">Acessar perfil no GitHub</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/15067098?s=460&v=4" alt="Douglas Fuelber" />
              <div className="user-info">
                <strong>Douglas Fuelber</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>Full Stack Web Developer</p>
            <a href="https://github.com/DouglasFuelber">Acessar perfil no GitHub</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars0.githubusercontent.com/u/15067098?s=460&v=4" alt="Douglas Fuelber" />
              <div className="user-info">
                <strong>Douglas Fuelber</strong>
                <span>ReactJS, React Native, Node.js</span>
              </div>
            </header>
            <p>Full Stack Web Developer</p>
            <a href="https://github.com/DouglasFuelber">Acessar perfil no GitHub</a>
          </li>

        </ul>
      </main>

    </div>
  );
}

export default App;
