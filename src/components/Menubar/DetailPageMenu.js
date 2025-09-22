import { useNavigate} from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { ReactComponent as Mark } from '../../icons/ScrapIcon-off.svg';
import { ReactComponent as MarkActive } from '../../icons/ScrapIcon-on.svg';
import { IoShareSocialOutline } from "react-icons/io5";
import { useState, useEffect } from 'react';
import { fetchFavorites, addFavorites, Allfestival } from '../../utils/FestivalAPI';
import { getUserInfo } from '../../utils/LocalStorage';
import Popup from '../Popup';

const DetailPageMenu = ({ contentid }) => {
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [showPopup, setShowPopup] = useState(false);


  useEffect(() => {
    const checkFavorite = async () => {
      const user = getUserInfo();
      if (!user) return;

      const { data } = await fetchFavorites(user.id);
      const favorited = data?.some(
        fav => String(fav.festivals?.contentid) === String(contentid)
      );
      setIsFavorited(favorited);
    };
    checkFavorite();
  }, [contentid]);

  const handleToggleFavorite = async () => {
    const user = getUserInfo();
    if (!user) {
      setShowPopup(true); // 로그인 팝업 띄우기
      return;
    }
    const result = await addFavorites(user.id, contentid);
    if (result.success) {
      const { data } = await fetchFavorites(user.id);
      const favorited = data?.some(
        fav => String(fav.festivals?.contentid) === String(contentid)
      );
      setIsFavorited(favorited);
    } else {
      console.error(result.message);
    }
  };

  const handleShare = async () => {
    try {
      const { data, error } = await Allfestival();
      if (error || !data) {
        alert('축제 정보를 불러올 수 없습니다.');
        return;
      }

      const festival = data.find(f => String(f.contentid) === String(contentid));
      if (!festival) {
        alert('축제 정보를 불러올 수 없습니다.');
        return;
      }

      const shareData = {
        title: "✨경축 축제 정보✨",
        text: `"${festival.title}" 열립니다!🎉\n🗓️ 언제? ${festival.startdate} ~ ${festival.enddate}\n📍어디서?  ${festival.addr1}\n\n👉 자세히 보기 ${window.location.href}`
      };

      if (navigator.share) {
        await navigator.share(shareData);
        console.log('공유 완료');
      }
      // else 부분 제거 → 지원 안 되면 그냥 아무 동작 안 함
    } catch (err) {
      console.error('공유 실패', err);
    }
  };

  return (
    <div className='detail-page-menu'>
      <IoIosArrowBack className="back-icon" onClick={() => navigate(-1)} />
      <div className="icon-wrap">
        {isFavorited ? (
          <MarkActive style={{ width: "auto", height: "2.3rem" }} onClick={handleToggleFavorite} />
        ) : (
          <Mark style={{ width: "auto", height: "2.3rem" }} onClick={handleToggleFavorite} />
        )}
        <IoShareSocialOutline
          className="share-icon"
          onClick={handleShare}
        />
      </div>

      {showPopup && (
        <Popup
          mainText="로그인이 필요합니다"
          subText="스크랩을 이용하려면 먼저 로그인해주세요."
          onClose={() => {
            setShowPopup(false);
          }}
        />
      )}
    </div>
  );
};
export default DetailPageMenu;
