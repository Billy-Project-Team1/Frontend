// React import
import React, { useRef, useState } from 'react';
// Component import
import KakaoMap from './KakaoMap';
import MapModalheader from '../header/MapModalheader';
// Icon import
import { HiSearch } from 'react-icons/hi';
import { FiX } from 'react-icons/fi';

const SearchPlace = ({ setSearchMapModal, setData, data, position }) => {
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
			className="kakaoMap_modal"
			ref={outSection}
			onClick={(e) => {
				if (outSection.current === e.target) {
					setSearchMapModal(false);
				}
			}}
		>
			<div
				className="kakaoMap_wrap
    "
			>
				<div className="kakaoMap_header">
					<MapModalheader
						pageName="지도에서 주소 찾기"
						setSearchMapModal={setSearchMapModal}
					/>
				</div>
				<form className="kakaoMap_input_form" onSubmit={handleSubmit}>
					<input
						type="text"
						className="kakaoMap_input_place"
						placeholder="거래 장소를 입력 해주세요."
						onChange={onChange}
						value={inputText}
					/>
					<div className="kakaoMap_input_icon_box">
						<HiSearch className="KakaoMap_input_icon" />
					</div>
					{inputText === '' ? (
						''
					) : (
						<FiX
							className="kakaoMap_input_place_Xbutton"
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
					position={position}
				/>

				<button className="kakaoMap_submit_button" onClick={onSubmitSearchMap}>
					선택한 위치로 설정
				</button>
			</div>
		</div>
	);
};

export default SearchPlace;
