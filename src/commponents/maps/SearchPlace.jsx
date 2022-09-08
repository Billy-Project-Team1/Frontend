import React, { useState } from 'react';
import KakaoMap from './KakaoMap';

const SearchPlace = () => {
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [coordNumber, setCoordNumber] = useState({
    latitude: '',
    longitude: '',
  });
  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText('');
  };
  if (placeName !== '') {
    console.log(placeName);
    console.log(coordNumber);
  }

  return (
    <div
      className="KakaoMapwrap
    "
    >
      <KakaoMap
        searchPlace={place}
        setPlaceName={setPlaceName}
        setCoordNumber={setCoordNumber}
        coordNumber={coordNumber}
        placeName={placeName}
      />
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="ex.강남역 10번 출구..."
          onChange={onChange}
          value={inputText}
        />
        <button type="submit">검색</button>
      </form>
    </div>
  );
};

export default SearchPlace;
