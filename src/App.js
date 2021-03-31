import './App.css';
import React, {useState, useEffect } from 'react';
import {colorPokemon, getPokemonData, colorAgradable} from './api';
import Pagination from './components/pagination';



function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const lastPage = () => {
    const nextPage = Math.max(page - 1, 0);
    setPage(nextPage);
  };
  const nextPage = () => {
    const nextPage = Math.min(page + 1,  total- 1);
    setPage(nextPage);
  };

  const fetchPokemons = async () => {
    try{
      setLoading(true);
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${24*page}&limit=${24}`);
      const data = await response.json();
      const promises = data.results.map(async (poke) => {
        const p = await getPokemonData(poke.url);
        const color = await colorPokemon(p.species.url);
        p.color = colorAgradable(color);
        return p;
      });
      const results = await Promise.all(promises);
      setPokemons(results);
      setTotal(Math.ceil(data.count / 24));
      setLoading(false);
    }catch (err) {
      console.log(err)
    }
  }
  
  useEffect(() => {
    fetchPokemons()
  }, [page]);

  return (
    <>
      <div className="container">
        <div className="Logo">
          <img src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"/>
        </div>
        {loading ?
          <div className="loader">Loading...</div>
          :
          <> 
          <Pagination 
          onLeftClick={lastPage}
          onRightClick={nextPage}
          />
          <div className="pokedex">
              {pokemons.map((poke, idx)=>{
                return(
                  <>
                    <div style={{backgroundColor: poke.color}} className="pokemon-card">
                      <h1 className="pokemon-name">{poke.name.replace(/^\w/, (c) => c.toUpperCase())}</h1>
                      <div className="container-numero">
                        <div className="numero">#{poke.id}</div>
                      </div>
                      <div className="container-img">
                        <img className="pokemon-img" src={poke.sprites.front_default} alt={poke.name}/> 
                      </div>
                      <p className="pokemon-item"><strong>Hp:</strong> {poke.stats[0].base_stat}</p>
                      <p className="pokemon-item pokemon-types"><strong>Type:</strong> {poke.types.map((t,indx) =>{
                        return <div key={indx} className="pokemon-type">{t.type.name}</div>
                      })}</p>
                      <p className="pokemon-item"><strong>Attack:</strong> {poke.stats[1].base_stat}</p>
                      <p className="pokemon-item"><strong>Defense:</strong> {poke.stats[2].base_stat}</p>
                      <p className="pokemon-item"><strong>Weight:</strong> {poke.weight}kg</p>
                    </div> 
                  </>
                )
              })}
          </div>
          </>
        }
        <Pagination 
          onLeftClick={lastPage}
          onRightClick={nextPage}
        />
      </div>
    </>
  );
}

export default App;