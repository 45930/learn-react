import { useState, useEffect } from "react";

const localCache: Record<string, Array<string>> = {};
const PETS_API = 'https://pets-v2.dev-apis.com/breeds';

export default (animal: string): [Array<string>, string] => {
  const [breedList, setBreedlist] = useState([]);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if(!animal) {
      return setBreedlist([]);
    }
    const cacheResult = localCache[animal];
    if(cacheResult) {
      setBreedlist(cacheResult);
    } else {
      requestBreedList();
    }
    
    async function requestBreedList() {
      setBreedlist([]);
      setStatus('loading');
      const res = await fetch(
        `${PETS_API}?animal=${animal.toLowerCase()}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedlist(localCache[animal]);
      setStatus('');
    }
  }, [animal]);

  return [breedList, status];
}
