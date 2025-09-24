import { TbArrowFork } from "react-icons/tb";

const LoadFind = ({ baseLocate, festival }) => {
  const findNavigate = (e) => {
  e.stopPropagation(); // 부모 클릭 막기

  if (!baseLocate || !festival) return;

  const startName = "현재 위치";
  const startLat = Number(baseLocate.lat);
  const startLng = Number(baseLocate.lng);

  const endName = festival.addr1;
  const endLat = festival.mapy;
  const endLng = festival.mapx;

  const url = `https://map.kakao.com/link/by/${encodeURIComponent(
    startName
  )},${startLat},${startLng}/to/${encodeURIComponent(
    endName
  )},${endLat},${endLng}`;

  window.open(url, "_blank");
};

  return (
    <button className="road-icon" onClick={findNavigate}>
      <TbArrowFork />
      <p>길찾기</p>
    </button>
  );
};

export default LoadFind;
