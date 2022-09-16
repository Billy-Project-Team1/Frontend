import React, { useState, useEffect } from 'react';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import './DetailMap.scss';
import DetailMapView from './DetailMapView';
const { kakao } = window;

const DetailMap = ({ data }) => {
  const [toggleOn, setToggleOn] = useState(true);
  const [openData, setOpenData] = useState('1');

  const toggleMode = () => {
    setToggleOn((a) => !toggleOn);
	setOpenData(openData+1);
  };

  

  return (
		<div className="DetailMap_Wrap">
			<div className="DetailMap_Container">
				<div className="DetailMap_TextBox">
					<div className="DetailMap_Title">거래 장소</div>
					<div className="DetailMapPlaceBox">
						<div className="DetailMap_Place">{data.detailLocation}</div>
					</div>
					<div
						className="calendar-toggleIcon"
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
