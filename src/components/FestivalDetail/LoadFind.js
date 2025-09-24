import { IoNavigate } from "react-icons/io5";

const LoadFind = ({ baseLocate, festival }) => {
  const findNavigate = () => {
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
  // console.log(Number(baseLocate.lat), Number(baseLocate.lng));
  return (
    <div className="load-find" onClick={findNavigate} >
      <p>길찾기</p>
      <IoNavigate />
    </div>
  );
};

export default LoadFind;
