import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import { Allfestival } from "../../utils/FestivalAPI";
import CalendarList from "./CalendarList";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import CalendarBottomSheet from "./CalendarBottomSheet";

const FestivalCalendar = () => {
  const [value, setValue] = useState(new Date()); // 선택된 날짜
  const [activeStartDate, setActiveStartDate] = useState(new Date()); // 현재 보고 있는 달
  const [festivals, setFestivals] = useState([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const prevMonth = () => {
    const newDate = new Date(
      activeStartDate.getFullYear(),
      activeStartDate.getMonth() - 1,
      1
    );
    setActiveStartDate(newDate);
  };

  const nextMonth = () => {
    const newDate = new Date(
      activeStartDate.getFullYear(),
      activeStartDate.getMonth() + 1,
      1
    );
    setActiveStartDate(newDate);
  };
  useEffect(() => {
    const fetchFestivals = async () => {
      const res = await Allfestival();
      const data = Array.isArray(res) ? res : res?.data ?? [];
      setFestivals(data);
    };
    fetchFestivals();
  }, []);

  // 날짜별 진행 중인 축제 개수 구하기
  const getFestivalCount = (date) => {
    const target = moment(date);
    return festivals.filter((festival) => {
      const start = moment(festival.startdate, "YYYY-MM-DD");
      const end = moment(festival.enddate, "YYYY-MM-DD");
      return (
        target.isSameOrAfter(start, "day") && target.isSameOrBefore(end, "day")
      );
    }).length;
  };

  return (
    <div
      id="calendar"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/images/calendar-bg.png)`,
      }}
    >
      <div
        className="calendar-wrap"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/calendar-bg.png)`,
        }}
      >
        {/* 커스텀 네비게이션 */}
        <div className="calendar-navigation">
          <button onClick={prevMonth} className="nav-arrow">
            {<IoIosArrowBack />}
          </button>
          <div className="year-month-wrap">
            <p className="year">{activeStartDate.getFullYear()}</p>
            <h4 className="month">{activeStartDate.getMonth() + 1}월</h4>
          </div>
          <button onClick={nextMonth} className="nav-arrow">
            {<IoIosArrowForward />}
          </button>
        </div>
        <Calendar
          calendarType="gregory"
          value={value}
          onChange={(date) => {
            setValue(date);
            setIsSheetOpen(true); // 날짜 선택하면 바텀 시트 열기
          }}
          activeStartDate={activeStartDate}
          onActiveStartDateChange={({ activeStartDate }) =>
            setActiveStartDate(activeStartDate)
          }
          formatDay={(locale, date) => moment(date).format("D")}
          formatMonthYear={() => ""} // 기본 네비게이션 숨김
          tileContent={({ date, view }) =>
            view === "month" && getFestivalCount(date) > 0 ? (
              <div className="length-text">{getFestivalCount(date)}개</div>
            ) : null
          }
          tileClassName={({ date, view }) =>
            view === "month" && date.getMonth() !== activeStartDate.getMonth()
              ? "other-month"
              : ""
          }
        />
      </div>

      {/* 리스트는 현재 선택된 날짜 기준으로 필터링 */}
      {/* <CalendarBottomSheet
        isOpen={isSheetOpen}
        onClose={() => setIsSheetOpen(false)}
      > */}
        <CalendarList
          selectDate={moment(value).format("YYYY-MM-DD")}
          festivals={festivals}
        />
      {/* </CalendarBottomSheet> */}
    </div>
  );
};

export default FestivalCalendar;
