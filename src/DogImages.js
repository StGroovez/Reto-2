import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DogImages() {
  const [dogImage, setDogImage] = useState('');
  const [favoriteImage, setFavoriteImage] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [breedsList, setBreedsList] = useState([]);

  useEffect(() => {
    // Obtener lista de razas al cargar la aplicación
    axios.get('https://dog.ceo/api/breeds/list/all')
      .then(response => {
        const breeds = Object.keys(response.data.message);
        setBreedsList(breeds);
      })
      .catch(error => {
        console.error('Error fetching breeds:', error);
      });
  }, []);

  const fetchRandomImage = () => {
    const apiUrl = selectedBreed
      ? `https://dog.ceo/api/breed/${selectedBreed}/images/random`
      : 'https://dog.ceo/api/breeds/image/random';

    axios.get(apiUrl)
      .then(response => {
        setDogImage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching dog image:', error);
      });
  };

  const markAsFavorite = () => {
    setFavoriteImage(dogImage);
  };

  return (
    <div>
      <h1>Imágenes Aleatorias de Perros</h1>
      <div>
        <button onClick={fetchRandomImage}>Obtener imagen aleatoria</button>
        <select
          onChange={e => setSelectedBreed(e.target.value)}
          value={selectedBreed}
        >
          <option value="">Raza Aleatoria</option>
          {breedsList.map(breed => (
            <option key={breed} value={breed}>{breed}</option>
          ))}
        </select>
        <button onClick={fetchRandomImage}>Obtener imagen por raza</button>
      </div>
      <div>
        {dogImage && (
          <div>
            <img src={dogImage} alt="Perro aleatorio" width="300" height="300" />
            <p>Enlace para copiar: {dogImage}</p>
            <button onClick={markAsFavorite}>Marcar como favorita</button>
          </div>
        )}
      </div>
      <div>
        {favoriteImage && (
          <div>
            <h2>Imagen Favorita</h2>
            <img src={favoriteImage} alt="Perro favorito" width="150" height="150" />
          </div>
        )}
      </div>
    </div>
  );
}

export default DogImages;