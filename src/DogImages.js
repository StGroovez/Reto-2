import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DogImages.css'
import chems from './pngwing.com.png';

function DogImages() {
  const [dogImage, setDogImage] = useState('');
  const [favoriteImage, setFavoriteImage] = useState(null);
  const [selectedBreed, setSelectedBreed] = useState('');
  const [breedsList, setBreedsList] = useState([]);
  const [isChemsVisible, setIsChemsVisible] = useState(true);


  useEffect(() => {
      axios.get('https://dog.ceo/api/breeds/list/all')
        .then(response => {
          const breeds = Object.keys(response.data.message);
          setBreedsList(breeds);
      })
        .catch(error => {
          console.error('Error fetching breeds:', error);
      });
      setIsChemsVisible(true);

  }, []); // Dependencia vacía para ejecutar una vez al inicio

  const fetchRandomImage = () => {
    setIsChemsVisible(false);
    const apiUrl = 
      selectedBreed ? `https://dog.ceo/api/breed/${selectedBreed}/images/random`: 'https://dog.ceo/api/breeds/image/random';

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
    <div className='dog-images'>
      
      <div className='header'>Boris & Friends</div>
      
      {isChemsVisible && <img className='chems-img' src={chems} alt="Chems" />}
      

        <div>
          {dogImage && (
            <div className='dog-img'>
              <img className='real-img' src={dogImage} alt="Perro aleatorio" width="300" height="300" />
              <button className='favorite' onClick={markAsFavorite}>Fav</button>
            </div>      
          )}          
        </div>

      <select 
        className='breed-selector'
        onChange={e => setSelectedBreed(e.target.value)}
        value={selectedBreed}
        >
        <option value="">Raza Aleatoria</option>
        {breedsList.map(breed => (
          <option key={breed} value={breed}>{breed}</option>
        ))}
      </select>

      <div className='buttons-container'>
          <button  className='button-random' onClick={fetchRandomImage}>Obtener Perrito</button>
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