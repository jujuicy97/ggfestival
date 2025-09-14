
const CalendarList = ( {selectDate} ) => {
  return (
    <div className="calendar-list">
      <div className="list-title">
        <h3>{selectDate}</h3>
        <h4>축제 리스트</h4>
        <p>17개의 축제가 있어요!</p>
      </div>
      <div className="card-wrap">
        <div className="festival-card">
          <div className="img"></div>
          <div className="card-badge">
            <p>진행 중</p>
            <svg />
          </div>
          <div className="card-content">
            <h2>수원 화성 문화제</h2>
            <p>2025.09.27 ~ 10.04</p>
            <p>수원시 팔달구</p>
          </div>
        </div>
        <div className="festival-card">
          <div className="img"></div>
          <div className="card-badge">
            <p>진행 중</p>
            <svg />
          </div>
          <div className="card-content">
            <h2>수원 화성 문화제</h2>
            <p>2025.09.27 ~ 10.04</p>
            <p>수원시 팔달구</p>
          </div>
        </div>
        <div className="festival-card">
          <div className="img"></div>
          <div className="card-badge">
            <p>진행 중</p>
            <svg />
          </div>
          <div className="card-content">
            <h2>수원 화성 문화제</h2>
            <p>2025.09.27 ~ 10.04</p>
            <p>수원시 팔달구</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CalendarList;