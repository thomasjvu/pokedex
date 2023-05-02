import { useState } from "react";
import Loader from "./components/Loader";

interface PokemonData {
    name: string;
    sprites: {
        front_default: string;
        back_default: string;
    };
    id: number;
    height: number;
    weight: number;
}

function App() {
    const [pokemon, setPokemon] = useState<string>("bulbasaur");
    const [pokemonData, setPokemonData] = useState<PokemonData | null>(null);
    const [pokemonTypes, setPokemonTypes] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getPokemonData = () => {
        setIsLoading(true);
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setPokemonData(data);
                setPokemonTypes(data.types.map((type: any) => type.type.name));
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            getPokemonData();
        }
    };

    return (
        <div>
            <h1>Pokédex</h1>
            <div className="formGroup">
                <label htmlFor="pokemonInput">Pokemon Name or ID:</label>
                <input
                    id="pokemonInput"
                    type="text"
                    value={pokemon}
                    onChange={(e) => setPokemon(e.target.value.toLowerCase())}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <button onClick={getPokemonData}>Get Pokemon</button>
            {isLoading ? (
                <Loader />
            ) : (
                pokemonData && (
                    <div id="pokemonContainer">
                        <h2 id="pokemonName">{pokemonData.name.toUpperCase()}</h2>
                        <div className="pokemonImages">
                            <img id="pokemonImageFront" src={pokemonData.sprites.front_default} alt="`${pokemonData.name} Front`" />
                            {pokemonData.sprites.back_default ? (
                                <img id="pokemonImageBack" src={pokemonData.sprites.back_default} alt="`${pokemonData.name} Back`" />
                            ) : null}
                        </div>
                        <p id="pokemonId">ID: {pokemonData.id} </p>
                            <h3>Types:</h3>
                            <ul>
                                {pokemonTypes.map((type) => (
                                    <li key={type}>{type.toUpperCase()}</li>
                                ))}
                            </ul>
                        <p id="pokemonHeight">Height: {pokemonData.height / 10} m</p>
                        <p id="pokemonWeight">Weight: {pokemonData.weight / 10} kg</p>
                    </div>
                )
            )}
        </div>
    );
}

export default App;
