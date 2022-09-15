import React, { useState, useEffect } from 'react';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';
import './DetailMap.scss';
const { kakao } = window;

const DetailMapView = ({ data }) => {
  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(data.latitude, data.longitude),
      level: 5,
    };
    // 지도를 생성합니다.
    const map = new kakao.maps.Map(container, options);
    const markerPosition = new kakao.maps.LatLng(data.latitude, data.longitude);
    const marker = new kakao.maps.Marker({
      map: map,
      position: markerPosition,
    });
  }, [data]);

  return <div id="map" className="DetailMap_Img" />;
};

export default DetailMapView;
