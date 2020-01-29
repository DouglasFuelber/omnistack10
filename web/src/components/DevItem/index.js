import React from 'react';

import './styles.scss';

export default ({ dev, onDelete }) => (
    <li className="dev-item">
        <header>
            <img src={dev.avatar_url} alt={dev.name} />
            <div className="user-info">
                <strong>{dev.name}</strong>
                <span>{dev.techs.join(', ')}</span>
            </div>
        </header>
        <p>{dev.bio}</p>
        <div className="user-links">
            <a href={`https://github.com/${dev.github_username}`} >Acessar perfil no GitHub</a>
            <button
                className="delete-user"
                onClick={() => onDelete(dev.github_username)}>
                Excluir
            </button>
        </div>
    </li>
);