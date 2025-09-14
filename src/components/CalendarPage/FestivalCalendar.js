import moment from "moment";
import { useState } from "react";
import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css"; // 리액트 캘린더 기본 css
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import CalendarList from "./CalendarList";



const FestivalCalendar = () => {
  const [value, onChange] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());

  const prevMonth = () => {
    const newDate = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() - 1, 1);
    setActiveStartDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(activeStartDate.getFullYear(), activeStartDate.getMonth() + 1, 1);
    setActiveStartDate(newDate);
  };

  return (
    <div
      id="calendar"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/bg.png)`,
      }}
    >
      {/* 커스텀 네비게이션 */}
      <div className="calendar-navigation">
        <button onClick={prevMonth} className="nav-arrow">{<IoIosArrowBack />
}</button>
        <div className="year-month-wrap">
          <p className="year">{activeStartDate.getFullYear()}</p>
          <h4 className="month">{activeStartDate.getMonth() + 1}월</h4>
        </div>
        <button onClick={nextMonth} className="nav-arrow">{<IoIosArrowForward />
}</button>
      </div>

      <Calendar
        calendarType="gregory"
        formatDay={(locale, date) => moment(date).format("D")}
        onChange={onChange}
        value={value}
        activeStartDate={activeStartDate} // 달력 기준 날짜
        onActiveStartDateChange={({ activeStartDate }) => setActiveStartDate(activeStartDate)}
        formatMonthYear={() => ""} // 기존 네비게이션 숨김
        tileContent={({ date, view }) => {
          if(view === "month") {
            return <div className="langth-text">2개</div>;
          }
        }}
        tileClassName={({ date, view }) => {
          if (view === "month") {
            // 현재 달과 다르면 클래스 추가
            return date.getMonth() !== activeStartDate.getMonth() ? "other-month" : "";
          }
        }}
      />

      <CalendarList 
        selectDate={moment(value).format("M/D")} // 선택한 날짜
      />
    </div>
  );
};

export default FestivalCalendar;
