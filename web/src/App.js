import React from 'react';

import './global.scss'
import './App.scss'
import './Sidebar.scss'
import './Main.scss'

function App() {
  return (
    <div id="app">

      <aside>
        <strong>Cadastrar</strong>
        <form>

          <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input name="github_username" id="github_username" required />
          </div>

          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required />
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude</label>
              <input name="latitude" id="latitude" required />
            </div>

            <div className="input-block">
              <label htmlFor="longitude">Longitude</label>
              <input name="longitude" id="longitude" required />
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
