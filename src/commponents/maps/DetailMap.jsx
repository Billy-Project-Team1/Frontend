// React import
import React, { useState } from 'react';
// style & Icon import
import './DetailMap.scss';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
// Page import
import DetailMapView from './DetailMapView';

const { kakao } = window;

const DetailMap = ({ data }) => {
	const [toggleOn, setToggleOn] = useState(true);
	const [openData, setOpenData] = useState('1');

	const toggleMode = () => {
		setToggleOn((a) => !toggleOn);
		setOpenData(openData + 1);
	};

	return (
		<div className="detailMap_wrap">
			<div className="detailMap_containers">
				<div className="detailMap_text_box">
					<div className="detailMap_title">거래 장소</div>
					<div className="detailMap_place_box">
						<div className="detailMap_place">{data.detailLocation}</div>
					</div>
					<div
						className="detailmap_toggle_icon"
						onClick={() => {
							toggleMode();
						}}
					>
						{toggleOn === true ? (
							<HiOutlineChevronUp
								style={{ margin: 'auto', color: '#212121' }}
							/>
						) : (
							<HiOutlineChevronDown
								style={{ margin: 'auto', color: '#212121' }}
							/>
						)}
					</div>
				</div>
			</div>
			{toggleOn === true ? <DetailMapView data={data} /> : ''}
		</div>
	);
};

export default DetailMap;
