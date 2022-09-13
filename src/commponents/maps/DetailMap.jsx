import React, { useState, useEffect } from 'react';
import './DetailMap.scss';
const { kakao } = window;

const DetailMap = ({ data }) => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(37.49802246378239, 127.02758183100684),
      level: 5,
    };
    // 지도를 생성합니다.
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(
      37.49802246378239,
      127.02758183100684
    );
    const marker = new kakao.maps.Marker({
      map: map,
    });
    if (data.latitude !== '') {
      let coords = new kakao.maps.LatLng(data.latitude, data.longitude);
      marker.setMap(map);
      marker.setPosition(coords);
      map.setCenter(coords);
    }
  }, [data.latitude]);

  return (
    <div className="DetailMapWrap">
      <div className="DetailMapTitle">거래 장소</div>
      <div className="DetailMapPlace">{data.location}</div>
      <div id="map" className="DetailMapImg"></div>
    </div>
  );
};

export default DetailMap;
