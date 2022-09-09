import React, { useState, useEffect } from 'react';
import './PostingMap.scss';
import { HiSearch } from 'react-icons/hi';
const { kakao } = window;

const PostingMap = () => {
  const initialState = {
    latitude: '',
    longitude: '',
  };
  const [mapData, setMapData] = useState(initialState);
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.49802246378239, 127.02758183100684),
      level: 3,
    };
    // 지도를 생성합니다.
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(37.49802246378239, 127.02758183100684);
    const marker = new kakao.maps.Marker({
      map: map,
    });
    map.setCenter(markerPosition);

  }, [mapData]);
  return (
    <div className="PostingMapWrap">
      <div className="PostingMapTitle">
        거래 장소 검색
        <div className="PostingMapIconBox">
          <div className="PostingMapIcon">
            <HiSearch className="PostingMapHiIcon" />
          </div>
        </div>
      </div>
      <div id="map" className="PostingMapImg"></div>
    </div>
  );
};

export default PostingMap;
