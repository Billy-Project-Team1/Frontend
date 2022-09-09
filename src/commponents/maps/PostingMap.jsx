import React, { useState } from 'react';
import { useEffect } from 'react';
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
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(33.450701, 126.570667);
    const marker = new kakao.maps.Maker({
      position: markerPosition,
    });
    marker.setMap(map);
  }, []);
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
