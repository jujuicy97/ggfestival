//지도와 마커, 오버레이 랜더링 컴포넌트

import { useEffect, useState } from "react";
import { Circle, CustomOverlayMap, Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import Swipe from "./Swipe";
import { BsQuestionCircleFill } from "react-icons/bs";
import Popup from "../Popup";

//useKakaoLoader훅 사용하지 않을 때 스크립트로 동적 로딩하는 방법
// //카카오 지도 api 스크립트 로드 함수
// const kakaoMapScript = (callback) => {
//   if (window.kakao && window.kakao.maps) {
//     // 이미 로드되어 있으면 바로 실행
//     callback();
//     return;
//   }
//   const script = document.createElement("script");
//   script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_API_KEY}&libraries=getDistance,services`;
//   script.async = true;
//   script.onload = callback;
//   document.head.appendChild(script);
// };

//1. 반경 계산 함수
// getDistance 두 지점 간 거리를 미터단위로 계산해주는 함수

const getDistance = (lat1, lng1, lat2, lng2) => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371000; // 지구 반경 (미터)
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // 거리(미터)
};

const MainMap = () => {
  //지도 중심 좌표(내 위치) 및 에러 상태 관리
  //카카오 지도를 불러와주는 훅 : useKakaoLoader
  const [loading, error] = useKakaoLoader({
    appkey: process.env.REACT_APP_KAKAO_APP_KEY,
    libraries: ["services"], // 필요한 라이브러리 등록
  });
  //   console.log(process.env.REACT_APP_KAKAO_MAP_API_KEY);
  const [baseLocate, setBaseLocate] = useState({
    lat: 37.54699,
    lng: 127.09598,
  }); //기본 설정 위치
  const [errorMsg, setErrorMsg] = useState("");
  const [showPopup, setShowPopup] = useState(false);


  //현재 위치를 가져오는 geolocation 외부 API
  //avigator.geolocation 객체로 접근하여 getCurrentPosition 메서드를 호출하면 현재 위치를 비동기식으로 가져올 수 있음
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setBaseLocate({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => setErrorMsg("위치 정보를 불러올 수 없어 기본 위치로 설정합니다.")
      );
    } else {
      setErrorMsg("브라우저가 위치 정보를 지원하지 않습니다.");
    }
  }, []);

  if (loading) return <div>지도 로딩 중...</div>;
  if (error) return <div>지도 로딩 실패: {error.message}</div>;

  //거리 및 임시 데이터
  const km = 20;
  const latOffset = km / 111; // 위도 20km 이동
  const lngOffset = km / (111 * Math.cos((baseLocate.lat * Math.PI) / 180)); // 경도 20km 이동

  const festivalData = [
    {
      name: "화성행궁야간개장",
      lat: baseLocate.lat + 0.09,
      lng: baseLocate.lng,
    },
    {
      name: "재즈페스티벌",
      lat: baseLocate.lat,
      lng: baseLocate.lng + lngOffset,
    },
  ];

//팝업 노출 함수
const noteClick = ()=>{
    setShowPopup(true);
}


  //카카오가 제공하는 객체 Map, MapMarker, CustomOverlayMap, Circle
  return (
    <div className="main-map-wrap">
      <div className="map-notice" onClick={noteClick}>
        주변<span>20km</span>내 축제를 확인해보세요!
        <BsQuestionCircleFill className="question" />
      </div>
    {/* 팝업 노출 */}
      {showPopup && (
      <Popup 
        popup
        mainText="내 주변에서 찾기 사용시 유의사항" 
        sub1Text="1. 위치 정보를 기반으로 주변 축제를 보여드립니다."
        sub2Text="2. 정확한 결과를 위해 기기의 위치 서비스(GPS)를 켜주세요."
        sub3Text="3. 네트워크 환경이나 위치 정확도에 따라 결과가 달라질 수 있습니다."
        onClose={() => setShowPopup(false)}
      />
    )}

      <Map
        center={baseLocate}
        style={{ width: "100%", height: "750px" }}
        level={6}
      >
        {!loading && (
          <>
            {/* 마커 */}
            <MapMarker
              position={baseLocate}
              image={{
                src: process.env.PUBLIC_URL + "/baseLocate.png",
                size: { width: 30, height: 30 },
                options: { offset: { x: 15, y: 20 } },
              }}
              title="현재 위치"
              onClick={() =>
                window.open(
                  `https://map.kakao.com/link/map/${baseLocate.lat},${baseLocate.lng}`,
                  "_blank"
                )
              }
            />
            {/* 마커 위의 설명 div overlay */}
            <CustomOverlayMap position={baseLocate} yAnchor={1}>
              <div className="base-customoverlay">
                <a
                  href={`https://map.kakao.com/link/map/${baseLocate.lat},${baseLocate.lng}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {/* <span className="title">현재 위치</span> */}
                </a>
              </div>
            </CustomOverlayMap>
            {/* 20km 반경 원  */}
            <Circle
              center={baseLocate} //원의 중심좌표
              radius={20000} //미터 단위의 원의 반지름
              strokeWeight={3} //선의 두께
              strokeColor="#FF0000" //선의 색깔
              strokeOpacity={0.5} //선의 불투명도 1에서 0 사이의 값이며 0에 가까울수록 투명
              strokeStyle="dashed" //선의 스타일
              fillColor="#FFCCC" //채우기 색깔
              fillOpacity={0.2}
            />
            {festivalData.map((festival) => {
              const distance = getDistance(
                baseLocate.lat,
                baseLocate.lng,
                festival.lat,
                festival.lng
              );
              if (distance > 21000) return null;

              return (
                <div key={festival.name}>
                  {/* 마커
                <MapMarker
                  position={{lat: festival.lat, lng: festival.lng}}
                  image={{
                    src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
                    size: { width: 64, height: 69 },
                    options: { offset: { x: 27, y: 69 } },
                  }}
                  title={festival.name}
                /> */}
                  {/* 마커 위의 설명 div overlay */}
                  <CustomOverlayMap
                    position={{ lat: festival.lat, lng: festival.lng }}
                    yAnchor={1}
                  >
                    <div className="surround-customoverlay">
                      <a href="#" target="_blank" rel="noreferrer">
                        <img
                          src={process.env.PUBLIC_URL + "/surroundFestival.png"}
                          alt={festival.name}
                          style={{ width: 100, height: 50 }}
                        />
                        <span className="title">{festival.name}</span>
                      </a>
                    </div>
                  </CustomOverlayMap>
                </div>
              );
            })}
            {errorMsg && (
              <CustomOverlayMap position={baseLocate} yAnchor={1.1}>
                <span
                  style={{
                    fontSize: 13,
                    color: "red",
                    background: "#fff",
                    borderRadius: 4,
                    padding: "7px 13px",
                    border: "1px solid #ddd",
                  }}
                >
                  {errorMsg}
                </span>
              </CustomOverlayMap>
            )}
          </>
        )}
      </Map>
      {/* <PullRelease /> */}
      <Swipe />
    </div>
  );
};

export default MainMap;
