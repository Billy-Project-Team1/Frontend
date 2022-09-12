import React, { useRef, useState } from 'react';
import KakaoMap from './KakaoMap';

const SearchPlace = ({ setSearchMapModal, setData, data }) => {
  const outSection = useRef();
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');
  const [placeName, setPlaceName] = useState('');
  const [placeAdress, setPlaceAdress] = useState('');
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

  const onSubmitSearchMap = () => {
    if (coordNumber.latitude === '') {
      alert('장소를 입력하세요!!');
    } else {
      setData({
        ...data,
        location: placeName,
        detailLocation: placeAdress,
        latitude: coordNumber.latitude,
        longitude: coordNumber.longitude,
      });
      setSearchMapModal(false);
    }
  };

  return (
    <div
      className="kakaoMapModal"
      ref={outSection}
      onClick={(e) => {
        if (outSection.current === e.target) {
          setSearchMapModal(false);
        }
      }}
    >
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
          setPlaceAdress={setPlaceAdress}
        />
        <form className="KakaoMapinputForm" onSubmit={handleSubmit}>
          <input
            className="KakaoMapInputPlace"
            placeholder="ex.강남역 10번 출구..."
            onChange={onChange}
            value={inputText}
          />
          <button type="submit" className="KakaoMapButtonPlace">
            검색
          </button>
        </form>
        <button className="KakaoMapSubmitButton" onClick={onSubmitSearchMap}>
          완료
        </button>
      </div>
    </div>
  );
};

export default SearchPlace;
