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
    setInputText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setPlaceName('');
  };

  const onSubmitSearchMap = () => {
    if (placeName === '') {
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
    setInputText('');
  };

  return (
    <div
      className="kakaoMap_Modal"
      ref={outSection}
      onClick={(e) => {
        if (outSection.current === e.target) {
          setSearchMapModal(false);
        }
      }}
    >
      <div
        className="KakaoMap_wrap
    "
      >
        <form className="KakaoMap_input_Form" onSubmit={handleSubmit}>
          <div className="KakaoMap_input_IconBox">
            <HiSearch className="KakaoMap_input_Icon" />
          </div>
          <input
            type="text"
            className="KakaoMap_Input_Place"
            placeholder="거래 장소를 입력 해주세요."
            onChange={onChange}
            value={inputText}
          />
          {placeAdress === '' ? (
            ''
          ) : (
            <BsXCircle
              className="KakaoMap_Input_Place_Xbutton"
              onClick={() => {
                onResetButton();
              }}
            />
          )}
        </form>
        <KakaoMap
          searchPlace={place}
          setPlaceName={setPlaceName}
          setInputText={setInputText}
          setCoordNumber={setCoordNumber}
          coordNumber={coordNumber}
          placeName={placeName}
          setPlaceAdress={setPlaceAdress}
        />

        <button className="KakaoMap_Submit_Button" onClick={onSubmitSearchMap}>
          완료
        </button>
        <div className="KakaoMap_Close">
          <div
            className="KakaoMap_Close_IconBox"
            onClick={() => setSearchMapModal(false)}
          >
            <AiOutlineClose className="KakaoMap_Close_Icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPlace;
