import { useState, useEffect } from "react";
import { fetchFavorites } from "../../utils/FestivalAPI";
import { getUserInfo } from '../../utils/LocalStorage';
import { MdOutlineFestival } from "react-icons/md";

const MyMarks = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = getUserInfo();
  const Id = userInfo?.id;

  useEffect(() => {
    const getFavorites = async () => {
      setLoading(true);
      const { data, error } = await fetchFavorites(Id);
      if (!error && data) {
        // created_at 기준 내림차순 정렬
        const sorted = data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        setFavorites(sorted);
      }
      setLoading(false);
    };

    if (Id) getFavorites();
  }, [Id]);

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="my-marks-wrap">
      {favorites.length > 0 ? (
        <div className="mark-list">
          {favorites.map((fav) => (
            <div className="mark-item" key={fav.id}>
              <div className="left">
                <img 
                  src={fav.festivals.firstimage2} 
                  alt={fav.festivals.title} 
                />
              </div>
              <div className="right">
                <h4>{fav.festivals.title}</h4>
                <p>{fav.festivals.startdate} ~ {fav.festivals.enddate}</p>
                <p>{fav.festivals.addr1}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-mark">
          <MdOutlineFestival size={50} />
          <div className="text">
            <p>아직 스크랩한 축제가 없어요</p>
            <span>마음에 드는 축제를 스크랩하면 여기에서 모두 확인할 수 있어요.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyMarks;
