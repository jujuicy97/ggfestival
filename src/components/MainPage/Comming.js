import { useEffect, useState } from 'react';
import { fetchFavorites } from '../../utils/FestivalAPI';
import { getUserInfo } from '../../utils/LocalStorage';
import { useNavigate } from 'react-router-dom';
import LoadFind from './LoadFind';
import moment from 'moment';
import 'moment/locale/ko';


const Comming = ({baseLocate}) => {
  const navigate = useNavigate();
  const [festival, setFestival] = useState(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0 });

  useEffect(() => {
    const loadData = async () => {
      // ✅ 현재 위치 가져오기

      // ✅ 축제 불러오기
      const user = getUserInfo();
      if (!user) return;

      const { data, error } = await fetchFavorites(user.id);
      if (error) {
        console.error(error);
        return;
      }

      if (data && data.length > 0) {
        const now = new Date();
        const sorted = data
          .filter(f => f.festivals?.startdate)
          .sort((a, b) =>
            new Date(a.festivals.startdate) - new Date(b.festivals.startdate)
          );

        const upcoming = sorted.find(f => new Date(f.festivals.startdate) >= now);
        const fest = upcoming?.festivals || null;
        setFestival(fest);

        // ✅ 카운트다운 업데이트
        if (fest) {
          const updateCountdown = () => {
            const now = new Date();
            const startDate = new Date(fest.startdate);
            const diff = startDate - now;

            if (diff <= 0) {
              setCountdown({ days: 0, hours: 0, minutes: 0 });
              return;
            }

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / (1000 * 60)) % 60);

            setCountdown({ days, hours, minutes });
          };

          updateCountdown(); // 초기 실행
          const interval = setInterval(updateCountdown, 1000 * 60);
          return () => clearInterval(interval);
        }
      }
    };

    loadData();
  }, []); // 처음에만 실행

  if (!festival) return null;

  return (
    <div className='comming'>
      <div className='title'>
        <h3>다가오는 축제</h3>
        <p>나의 축제가 곧 열려요!</p>
      </div>
      <div className='comming-item' onClick={() => navigate(`/festivals/${festival.contentid}`)}>
        <div className='left'>
          <span>
            {festival.firstimage ? (
              <img src={festival.firstimage} alt={festival.title} />
            ) : (
              '이미지 없음'
            )}
          </span>
        </div>
        <div className='right'>
          <div className='top'>
            <div className='wrap'>
              <p>{festival.title}</p>
              <span>
                 {festival.startdate === festival.enddate
    ? moment(festival.startdate).format('MM.DD(ddd)')
    : `${moment(festival.startdate).format('MM.DD(ddd)')} - ${moment(festival.enddate).format('MM.DD(ddd)')}`}
              </span>
            </div>
            <LoadFind baseLocate={baseLocate} festival={festival} />
          </div>

          <div className='countdown-container'>
            <div className="countdown-item">
              <div className="countdown-label">Days</div>
              <div className="countdown-value">{countdown.days}</div>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <div className="countdown-label">Hours</div>
              <div className="countdown-value">{countdown.hours}</div>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <div className="countdown-label">Minutes</div>
              <div className="countdown-value">{countdown.minutes}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comming;
