import React, { useEffect, useState } from 'react';
const { kakao } = window;

const KakaoMap = ({ searchPlace }) => {
  useEffect(() => {
    const container = document.getElementById('myMap');
    const options = {
      center: new kakao.maps.LatLng(37.50232593365278, 127.04444559870342),
      level: 3,
    };
    // 지도를 생성합니다.
    const map = new kakao.maps.Map(container, options);

    // 주소-좌표 변환 객체를 생성합니다.
    const geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다..
    geocoder.addressSearch(searchPlace, placesSearchCB);
    console.log('순서 확인1')

    function placesSearchCB(result, status) {
      console.log('순서 확인2')
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        console.log('순서확인3')
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 결과값으로 받은 위치를 마커로 표시합니다
        new kakao.maps.Marker({
          map: map,
          position: coords,
        });
        console.log('주소검색'+coords)
        map.setCenter(coords);
      } 

      // 주소로 검색이 안되는 것이라면
      else {
        console.log('순서 확인4')
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(searchPlace, placesSearchPS);
        function placesSearchPS(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

            // 결과값으로 받은 위치를 마커로 표시합니다
            new kakao.maps.Marker({
              map: map,
              position: coords,
            });
            console.log('키워드검색'+coords)
            map.setCenter(coords);
          }
        }
      }
    }
    
  }, [searchPlace]);

  return (
    <>
      <div
        id="myMap"
        style={{
          width: '500px',
          height: '500px',
        }}
      ></div>
    </>
  );
};

export default KakaoMap;
