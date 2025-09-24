import { useRef, useState, useEffect } from 'react';
import { Allfestival } from '../../utils/FestivalAPI';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const FestivalWrap = () => {
  const navigate = useNavigate();

  const [festivals, setFestivals] = useState([]);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  

  // 현재 날짜를 YYYYMMDD 형식으로 가져오는 함수
  const getToday = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.pageX - containerRef.current.offsetLeft;
    const walk = (currentX - startX) * 1.5;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (containerRef.current) containerRef.current.scrollLeft = 0;

    const fetchFestivals = async () => {
      try {
        const result = await Allfestival(); // 반환값이 배열이면 이대로, {data} 형태면 구조 분해
        const data = Array.isArray(result) ? result : result.data;

        if (!data || data.length === 0) {
          console.log('축제 데이터가 없습니다.');
          return;
        }

        const today = getToday();

        // 진행 중인 축제 필터
        const ongoing = data.filter(f => {
          const start = f.startdate.replace(/-/g, '');
          const end = f.enddate.replace(/-/g, '');
          return start <= today && end >= today;
        });

        // 랜덤 섞기
        const shuffled = ongoing.sort(() => 0.5 - Math.random());

        // 최대 5개 선택
        const selected = shuffled.slice(0, 5);

        setFestivals(selected);

      } catch (e) {
        console.error('축제 불러오기 오류:', e);
      }
    };

    fetchFestivals();
  }, []);

  return (
    <div
      className='festivalitem-wrap'
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {festivals.length > 0 ? (
        festivals.map(festival => (
          <div className='festivalitem' 
          key={festival.contentid}
          onClick={() => navigate(`/festivals/${festival.contentid}`)}
          >
            <div className='top'>
              <span>{festival.sigungucode}</span>
              <img src={festival.firstimage} alt={festival.title} />
            </div>
            <div className='bottom'>
              <p>{festival.title}</p>
              <span>
                {moment(festival.startdate).format('MM.DD')} - {moment(festival.enddate).format('MM.DD')}
                </span>
            </div>
          </div>
        ))
      ) : (
        <p>축제 정보를 불러오는 중입니다...</p>
      )}
    </div>
  );
};

export default FestivalWrap;
