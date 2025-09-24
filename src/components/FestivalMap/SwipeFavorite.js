//찜하기 컴포넌트
//지도에서 찾기 -> 스와이프 -> 찜하기 컴포넌트

import { fetchFavorites, addFavorites } from "../../utils/FestivalAPI";
import { getUserInfo } from "../../utils/LocalStorage";
import { ReactComponent as Mark } from '../../icons/ScrapIcon-off.svg';
import { ReactComponent as MarkActive } from '../../icons/ScrapIcon-on.svg';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Popup from "../Popup";


const SwipeFavorite = ({festival}) => {

    const navigate = useNavigate();
    const [isFavorited, setIsFavorited] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
  
    useEffect(() => {
      const checkFavorite = async () => {
        const user = getUserInfo();
        if (!user) return;
        const { data } = await fetchFavorites(user.id);
        const favorited = data?.some(
          fav => String(fav.festivals?.contentid) === String(festival.contentid)
        );
        setIsFavorited(favorited);
      };
      checkFavorite();
    }, [festival.contentid]);
  
    const handleToggleFavorite = async (e) => {
      e.stopPropagation();
      const user = getUserInfo();
      if (!user) {
        setShowPopup(true);
        return;
      }
      const result = await addFavorites(user.id, festival.contentid);
      if (result.success) {
        const { data } = await fetchFavorites(user.id);
        const favorited = data?.some(
          fav => String(fav.festivals?.contentid) === String(festival.contentid)
        );
        setIsFavorited(favorited);
      }
    };

    return (
        <div 
        className="surround-customoverlay"
        style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}
        onClick={() => navigate(`/festivals/${festival.contentid}`)}
      >
        {isFavorited ? (
          <MarkActive style={{ width: "1.5rem", height: "1.5rem" }} onClick={handleToggleFavorite} />
        ) : (
          <Mark style={{ width: "1.5rem", height: "1.5rem" }} onClick={handleToggleFavorite} />
        )}
        {showPopup && (
          <Popup
            mainText="로그인이 필요합니다"
            subText="스크랩을 이용하려면 먼저 로그인해주세요."
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>
    );
  };

export default SwipeFavorite;