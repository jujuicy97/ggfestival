import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Allfestival } from "../../utils/FestivalAPI";
import Weather from './Weather';

const FestivalDetail = () => {
  const { contentid } = useParams(); // URL에서 :contentid 가져오기
  const [festival, setFestival] = useState(null);

  useEffect(() => {
    const fetchFestival = async () => {
      const { data, error } = await Allfestival();
      if (error) {
        console.error(error);
        return;
      }
      // contentid가 문자열이므로 문자열로 비교
      const selected = data.find(f => f.contentid === contentid);
      setFestival(selected);
    };

    fetchFestival();
  }, [contentid]);

  if (!festival) return <div>축제 로딩 중...</div>;

  return (
    <div className="festival-detail">
      <h2>{festival.title}</h2>
      <p>장소: {festival.addr1}</p>
      <p>기간: {festival.startdate} ~ {festival.enddate}</p>
      <p>시간: {festival.playtime}</p>
      {festival.firstimage && <img src={festival.firstimage} alt={festival.title} style={{ maxWidth: '100%' }} />}
      
      {/* 날씨 컴포넌트: mapy = lat, mapx = lon */}
      <Weather lat={festival.mapy} lon={festival.mapx} />
    </div>
  );
};

export default FestivalDetail;
