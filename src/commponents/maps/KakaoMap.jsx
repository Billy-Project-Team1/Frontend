import React, { useEffect, useState } from 'react';
import './KakaoMap.scss';
const { kakao } = window;

const KakaoMap = ({
  searchPlace,
  setPlaceName,
  setCoordNumber,
  coordNumber,
  placeName,
  setPlaceAdress,
}) => {
  useEffect(() => {
    const container = document.getElementById('Mymap');
    const options = {
      center: new kakao.maps.LatLng(37.50232593365278, 127.04444559870342),
      level: 3,
    };

    // 지도를 생성합니다.
    const map = new kakao.maps.Map(container, options);

    // 주소-좌표 변환 객체를 생성합니다.
    const geocoder = new kakao.maps.services.Geocoder();
    const marker = new kakao.maps.Marker({
      map: map,
    });

    // 주소로 좌표를 검색합니다..

    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      marker.setMap(null);
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          const adresscoder = new kakao.maps.services.Geocoder();

          marker.setMap(map);
          marker.setPosition(mouseEvent.latLng);
          setPlaceName(`${result[0].address_name}`);
          setCoordNumber({
            latitude: mouseEvent.latLng.Ma,
            longitude: mouseEvent.latLng.La,
          });

          adresscoder.coord2Address(
            mouseEvent.latLng.La,
            mouseEvent.latLng.Ma,
            callAddressFinal
          );
          function callAddressFinal(result, status) {
            if (status === kakao.maps.services.Status.OK) {
              setPlaceAdress(`${result[0].address.address_name}`);
            }
          }
        }
      });
    });

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 행정동 상세 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    geocoder.addressSearch(searchPlace, placesSearchCB);
    function placesSearchCB(result, status) {
      // 정상적으로 검색이 완료됐으면
      if (status === kakao.maps.services.Status.OK) {
        console.log(result);
        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
        console.log(coords);
        const adresscoder = new kakao.maps.services.Geocoder();
        // 결과값으로 받은 위치를 마커로 표시합니다
        marker.setMap(map);
        marker.setPosition(coords);
        map.setCenter(coords);
        adresscoder.coord2RegionCode(
          coords.getLng(),
          coords.getLat(),
          callAddressName
        );
        function callAddressName(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            setPlaceName(`${result[0].address_name}`);
            setCoordNumber({ latitude: coords.Ma, longitude: coords.La });

            adresscoder.coord2Address(
              coords.getLng(),
              coords.getLat(),
              callAddressFinal
            );
            function callAddressFinal(result, status) {
              if (status === kakao.maps.services.Status.OK) {
                setPlaceAdress(`${result[0].address.address_name}`);
              }
            }
          }
        }
      }

      // 주소로 검색이 안되는 것이라면
      else {
        const ps = new kakao.maps.services.Places();
        ps.keywordSearch(searchPlace, placesSearchPS);
        function placesSearchPS(result, status) {
          if (status === kakao.maps.services.Status.OK) {
            let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            const adresscoder = new kakao.maps.services.Geocoder();
            // 결과값으로 받은 위치를 마커로 표시합니다
            marker.setMap(map);
            marker.setPosition(coords);
            map.setCenter(coords);
            adresscoder.coord2RegionCode(
              coords.getLng(),
              coords.getLat(),
              callAddressName
            );

            function callAddressName(result, status) {
              if (status === kakao.maps.services.Status.OK) {
                console.log(result);
                setPlaceName(`${result[0].address_name}`);
                setCoordNumber({ latitude: coords.Ma, longitude: coords.La });

                adresscoder.coord2Address(
                  coords.getLng(),
                  coords.getLat(),
                  callAddressFinal
                );
                function callAddressFinal(result, status) {
                  if (status === kakao.maps.services.Status.OK) {
                    setPlaceAdress(`${result[0].address.address_name}`);
                  }
                }
              }
            }
          }
        }
      }
    }
  }, [searchPlace]);

  return <div id="Mymap" className="KakaoMapImg"></div>;
};

export default KakaoMap;
