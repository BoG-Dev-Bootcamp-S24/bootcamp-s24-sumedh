import "./App.css";
import { useState, useEffect } from "react";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";


const TYPE_COLORS = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

function App() {
  const [index, setIndex] = useState(491);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState('info');
  const [nextData, setNextData] = useState(null);

  async function getData() {
    // setLoading(true);  // Set loading to true when starting to fetch new data
    try {
      const res = await fetch(API_URL + index);
      const nextData = await res.json();
      setData(nextData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
    }
    // setLoading(false);
  }

  useEffect(() => {
    setData(nextData);
    setLoading(false);
  }, [nextData]);

  const leftarrow = '〈';
  const rightarrow = '〉';

  // fetch data at beginning and whenever index changes
  useEffect(() => {
    getData();
  }, [index]);

  return (
    <>
      <h1>Excercise 5: PokeDex!</h1>
      <div className="container">
        <div className="leftContainer">
            {loading ? (
              <div>Loading...</div>
            ) : data ? (
              <>
                <div className="ImageContainer">
                  <img src={data.sprites.front_default} alt={data.name} />
                </div>
                <div className="pokemonName">{data.name}</div>
                <div className="TypeContainer">
                  <h4>Types:</h4>
                  {data.types.map((typeInfo) => (
                    <span
                    key={typeInfo.type.name}
                    className="TypeBadge"
                    style={{ backgroundColor: TYPE_COLORS[typeInfo.type.name] }}
                  >
                    {typeInfo.type.name}
                  </span>
                  ))}
                </div>
              </>
            ) : (
              <div>Error fetching data</div>
            )}
          <button className="LeftArrow"
            onClick={() => {
              if (index > 1) setIndex(index - 1);
            }}
          >
            {leftarrow}
          </button>
          <button className="RightArrow"
            onClick={() => {
              setIndex(index + 1);
            }}
          >
            {rightarrow}
          </button>
        </div>

        <div className="rightContainer">
          <h3>Info</h3>
          {loading ? (
            <div>Loading...</div>
          ) : data ? (
            <>
          {active === 'info' && (
            <div className="InfoBox">
              <div>Height: {data.height}m</div>
              <div>Weight: {data.weight}kg</div>
              {data.stats.map((stat) => (
                <div key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </div>
              ))}
            </div>
          )}
           {active === 'moves' && (
            <div className="InfoBox">
              {data.moves.map((move) => (
                <div key={move.move.name}>
                  {move.move.name}
                </div>
              ))}
          </div>
        )}
        </>
          ) : (
            <div>Error fetching data</div>
          )}
          <button
            className={`InfoButton ${active === 'info' ? 'active' : ''}`}
            onClick={() => setActive('info')}
          >
            Info
          </button>
          <button
            className={`MovesButton ${active === 'moves' ? 'active' : ''}`}
            onClick={() => setActive('moves')}
          >
            Moves
          </button>
        </div>
      </div>
    </>
  );
}

export default App;