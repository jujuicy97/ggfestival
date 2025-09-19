import { useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from "moment";
import "moment/locale/ko";
import Scrapicon01 from "../../icons/ScrapIcon-off.svg";
import Scrapicon02 from "../../icons/ScrapIcon-on.svg";
import { FaTrash } from "react-icons/fa6";


const CalendarList = ({ selectDate, festivals }) => {
  const navigate = useNavigate();
  const [scraps, setScraps] = useState({});

  // 날짜에 맞는 축제 필터링
const filteredFestivals = festivals.filter((festival) => {
  const start = moment(festival.startdate, "YYYY-MM-DD");
  const end = moment(festival.enddate, "YYYY-MM-DD");
  const target = moment(selectDate, "YYYY-MM-DD");
  return target.isSameOrAfter(start, "day") && target.isSameOrBefore(end, "day");
});

  // 축제 상태 계산: 진행 중 / D-N
const getFestivalStatus = (festival) => {
  const today = new Date(); // 오늘 날짜
  const start = new Date(festival.startdate);
  const end = new Date(festival.enddate);

  if (today >= start && today <= end) {
    return { isOngoing: true, daysLeft: 0 }; // 진행 중
  } else if (today < start) {
    const diffTime = start - today; // ms 차이
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return { isOngoing: false, daysLeft: diffDays }; // D-day
  } else {
    return { isOngoing: false, daysLeft: 0 }; // 이미 종료
  }
};

  // 스크랩 토글 버튼
  const toggleScrap = (id) => {
    setScraps((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="calendar-list">
      <div className="list-title">
        <div className="list-left">
          <h3><span>{moment(selectDate).locale("ko").format("M/D(ddd)")}</span> 축제 리스트</h3>
        </div>
        <p><span>{filteredFestivals.length}</span>개의 축제가 있어요</p>
      </div>
      <div className="card-wrap">
        {filteredFestivals.map((item) => (
          <div
            className="festival-card"
            key={item.id}
            onClick={() => navigate(`/festivals/${item.contentid}`)}
          >
            <img src={item.firstimage} alt={item.title} />
            <div className="card-badge">
              {(() => {
                const { isOngoing, daysLeft } = getFestivalStatus(item);
                return isOngoing ? (
                  <p className="status-on">진행 중</p>
                ) : daysLeft > 0 ? (
                  <p className="status-off">D-{daysLeft}</p>
                ) : (
                  <p className="status-end">행사 종료</p>
                );
              })()}
              <img
                src={scraps[item.id] ? Scrapicon02 : Scrapicon01}
                alt="scrap-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleScrap(item.id);
                }}
              />
            </div>

            <div className="card-content">
              <h2>{item.title}</h2>
              <p>
                {`${moment(item.startdate).format("YYYY.MM.DD")} ~ ${moment(item.enddate).format("MM.DD")}`}
              </p>
              <p>{item.addr1.split(" ").slice(0, 3).join(" ")}</p>
            </div>
          </div>
        ))}

        {filteredFestivals.length === 0 && (
          <div className="empty-festival">
            <FaTrash />
            <h4>해당 날짜에 진행하는 축제가 없어요</h4>
            <p>다른 날짜를 선택해 주세요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CalendarList;
