import React, { useRef, useState } from 'react';
import KakaoMap from './KakaoMap';
import { HiSearch } from 'react-icons/hi';
import { BsXCircle } from 'react-icons/bs';
import { AiOutlineClose } from 'react-icons/ai';

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
    setPlaceAdress(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(placeAdress);
    setPlaceName('');
  };

  const onSubmitSearchMap = () => {
    if (placeAdress === '') {
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

  const onResetButton = () => {
    setPlaceAdress('');
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
        <form className="KakaoMapinputForm" onSubmit={handleSubmit}>
          <div className="KakaoMapinputIconBox">
            <HiSearch className="KakaoMapinputIcon" />
          </div>
          <input
            type="text"
            className="KakaoMapInputPlace"
            placeholder="거래 장소를 입력 해주세요."
            onChange={onChange}
            value={placeAdress}
          />
          {placeAdress === '' ? (
            ''
          ) : (
            <BsXCircle
              className="KakaoMapInputPlaceXbutton"
              onClick={() => {
                onResetButton();
              }}
            />
          )}
        </form>
        <KakaoMap
          searchPlace={place}
          setPlaceName={setPlaceName}
          setCoordNumber={setCoordNumber}
          coordNumber={coordNumber}
          placeName={placeName}
          setPlaceAdress={setPlaceAdress}
        />

        <button className="KakaoMapSubmitButton" onClick={onSubmitSearchMap}>
          완료
        </button>
        <div className="KakaoMapClose">
          <div
            className="KakaoMapCloseIconBox"
            onClick={() => setSearchMapModal(false)}
          >
            <AiOutlineClose className="KakaoMapCloseIcon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPlace;
