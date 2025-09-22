import { useState, useEffect } from "react";
import { fetchFavorites, addFavorites } from "../../utils/FestivalAPI";
import { getUserInfo } from '../../utils/LocalStorage';
import { MdOutlineFestival } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Mark } from '../../icons/ScrapIcon-off.svg';
import { ReactComponent as MarkActive } from '../../icons/ScrapIcon-on.svg';

const MyMarks = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const userInfo = getUserInfo();
  const Id = userInfo?.id;

  const getFavorites = async () => {
    setLoading(true);
    const { data, error } = await fetchFavorites(Id);
    if (!error && data) {
      const sorted = data
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        // 처음 불러올 때 모두 찜 상태 true로 세팅
        .map(fav => ({ ...fav, isFavorited: true }));
      setFavorites(sorted);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (Id) getFavorites();
  }, [Id]);

  // 찜 토글 함수
  const handleToggleFavorite = async (contentid) => {
    const res = await addFavorites(Id, contentid);
    if (res.success) {
      // 배열에서 해당 아이템의 isFavorited 상태만 토글
      setFavorites(prev =>
        prev.map(fav =>
          fav.festivals.contentid === contentid
            ? { ...fav, isFavorited: res.action === "added" }
            : fav
        )
      );
    } else {
      alert(res.message);
    }
  };

  if (loading) return <p>로딩 중...</p>;


  return (
    <div className="my-marks-wrap">
      {favorites.length > 0 ? (
        <div className="mark-list">
          {favorites.map((fav) => (
            <div className="mark-item"
              key={fav.id}
              onClick={() => navigate(`/festivals/${fav.festivals.contentid}`)}
            >
              <div className="top">
                <img
                  src={fav.festivals.firstimage || "/placeholder.png"}
                  alt={fav.festivals.title}
                />
                <button
                  className="mark-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite(fav.festivals.contentid);
                  }}
                >
                  {fav.isFavorited
                    ? <MarkActive style={{ width: "auto", height: "2.5rem" }} />
                    : <Mark style={{ width: "auto", height: "2.5rem" }} />}
                </button>
              </div>
              <div className="bottom">
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