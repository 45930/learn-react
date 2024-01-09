import { useState, useEffect } from "react";
import useBreedList from "../hooks/useBreedList";
import Results from "./Results";

const ANIMALS = ['', 'Dog', 'Cat', 'Horse'];
const PETS_API = 'https://pets-v2.dev-apis.com/pets'

const SearchParams = () => {
  const [location, setLocation] = useState("");
  const [animal, setAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal.toLowerCase());

  useEffect(() => {
    requestPets();
  }, []);

  const requestPets = async () => {
    const res = await fetch(
      `${PETS_API}?animal=${animal.toLowerCase()}&location=${location.toLowerCase()}&breed=${breed}`
    );
    const json = await res.json();
    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form onSubmit={(e) => {
        e.preventDefault();
        requestPets();
      }}>
        <label htmlFor="location">
          Location
          <input
            onChange={e => setLocation(e.target.value)}
            id="location"
            value={location}
            placeholder="Location"
            />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            onChange={(e) => {
              setAnimal(e.target.value);
              setBreed("");
            }}
            id="animal"
            value={animal}
            >
              {ANIMALS.map(animal => {
                return <option key={animal}>{animal}</option>
              })}
            </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  )
}

export default SearchParams;