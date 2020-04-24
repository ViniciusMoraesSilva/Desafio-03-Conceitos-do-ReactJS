import React, { useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositorys, setRepositorys] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositorys(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "url": "https://github.com/Rocketseat/ViniciusMoraesAdicionar",
      "title": `ViniciusMoraesAdicionar ${Date.now()}`,
      "techs": ["Node", "Express", "TypeScript"]
    })

    const repository = response.data;

    setRepositorys([...repositorys, repository]);
  };
  
  async function handleRemoveRepository(id) {
    
    await api.delete(`repositories/${id}`);

    // const repositoryIndex = repositorys.findIndex(repository => repository.id === id);
    // const repository = repositorys;
    // repository.splice(repositoryIndex, 1);

    const repository = repositorys.filter(repository => {
      return repository.id !== id;
    })
    
    setRepositorys([...repository]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositorys.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
          )
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
