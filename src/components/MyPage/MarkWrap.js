import { useState, useEffect } from "react";
import { ReactComponent as Mark } from '../../icons/mark-nonestroke.svg';
import { IoIosArrowForward } from "react-icons/io";
import { MdOutlineFestival } from "react-icons/md";
import { fetchFavorites } from "../../utils/FestivalAPI";
import { useNavigate } from 'react-router-dom';

const MarkWrap = ({ Id }) => {
  const [favorites, setFavorites] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getFavorites = async () => {
      setLoading(true);
      const { data, error } = await fetchFavorites(Id);
      if (!error && data) {
        // 전체 개수 저장
        setTotalCount(data.length);

        // 최신순 정렬 → 2개만 저장
        const sorted = data
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .slice(0, 2);
        setFavorites(sorted);
      }
      setLoading(false);
    };

    if (Id) getFavorites();
  }, [Id]);


  const isMark = favorites.length > 0;

  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="mark-wrap">
      <div className="title">
        <div className="title-text">
          <Mark className="markicon" />
          <p>스크랩 목록</p>
          {isMark && <span>{totalCount}개</span>}
        </div>
        <IoIosArrowForward
          className="nexticon"
          onClick={() => navigate('/my-marks')}
        />
      </div>

      {isMark ? (
        <div className="mark-list">
          {favorites.map((fav) => (
            <div className="mark-item"
            key={fav.id}
            onClick={() => navigate(`/festivals/${fav.festivals.contentid}`)}
            >
              <div className="left">
                <img
                  src={fav.festivals.firstimage}
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
          <MdOutlineFestival />
          <div className="text">
            <p>아직 스크랩한 축제가 없어요</p>
            <span>마음에 드는 축제를 스크랩하면 여기에서 모아볼 수 있어요.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarkWrap;
