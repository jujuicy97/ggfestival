import { TbArrowFork } from "react-icons/tb";
import { fetchMapxy } from "../../utils/FestivalAPI";

const LoadFind = ({ baseLocate, festival }) => {
  const findNavigate = (e) => {
    e.stopPropagation();
    if (!baseLocate || !festival) return;

    const navigate = async () => {
      try {
        const { data, error } = await fetchMapxy(festival.contentid);
        if (error || !data || data.length === 0) {
          alert("지도 좌표를 불러올 수 없습니다.");
          return;
        }

        const { mapx: endLng, mapy: endLat } = data[0];

        const startName = "현재 위치";
        const startLat = Number(baseLocate.lat);
        const startLng = Number(baseLocate.lng);
        const endName = festival.addr1;

        const url = `https://map.kakao.com/link/by/${encodeURIComponent(
          startName
        )},${startLat},${startLng}/to/${encodeURIComponent(
          endName
        )},${endLat},${endLng}`;

        window.open(url, "_blank");
      } catch (err) {
        console.error(err);
      }
    };

    navigate();
  };

  return (
    <button className="road-icon" onClick={findNavigate}>
      <TbArrowFork />
      <p>길찾기</p>
    </button>
  );
};


export default LoadFind;
