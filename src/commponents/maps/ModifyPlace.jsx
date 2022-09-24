import React, { useRef, useState } from 'react';
import ModifyKakaoMap from './ModifyKakaoMap';
import { HiSearch } from 'react-icons/hi';
import { FiX } from 'react-icons/fi';
import { AiOutlineClose } from 'react-icons/ai';
import Headers2 from '../../commponents/header/Headers2';

const ModifyPlace = ({ setSearchMapModal, setData, data }) => {
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
        <div className="KakaoMap_Header">
          <Headers2 pageName="지도에서 주소 찾기" />
        </div>
        <form className="KakaoMap_input_Form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="KakaoMap_Input_Place"
            placeholder="거래 장소를 입력 해주세요."
            onChange={onChange}
            value={inputText}
          />
          <div className="KakaoMap_input_IconBox">
            <HiSearch className="KakaoMap_input_Icon" />
          </div>
          {inputText === '' ? (
            ''
          ) : (
            <FiX
              className="KakaoMap_Input_Place_Xbutton"
              onClick={() => {
                onResetButton();
              }}
            />
          )}
        </form>
        <ModifyKakaoMap
          searchPlace={place}
          setPlaceName={setPlaceName}
          setInputText={setInputText}
          setCoordNumber={setCoordNumber}
          coordNumber={coordNumber}
          placeName={placeName}
          setPlaceAdress={setPlaceAdress}
        />

        <button className="KakaoMap_Submit_Button" onClick={onSubmitSearchMap}>
          선택한 위치로 설정
        </button>
        {/* <div className="KakaoMap_Close">
					<div
						className="KakaoMap_Close_IconBox"
						onClick={() => setSearchMapModal(false)}
					>
						<AiOutlineClose className="KakaoMap_Close_Icon" />
					</div>
				</div> */}
      </div>
    </div>
  );
};

export default ModifyPlace;
