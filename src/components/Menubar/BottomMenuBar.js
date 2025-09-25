import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import NavItem from './NavItem';
import { getUserInfo } from '../../utils/LocalStorage';

// home
import { ReactComponent as HomeDefault } from '../../icons/home.svg';
import { ReactComponent as HomeActive } from '../../icons/home-2.svg';
// area
import { ReactComponent as AreaDefault } from '../../icons/area.svg';
import { ReactComponent as AreaActive } from '../../icons/area-2.svg';
// map
import { ReactComponent as MapDefault } from '../../icons/map.svg';
import { ReactComponent as MapActive } from '../../icons/map-2.svg';
// carlendar
import { ReactComponent as CalendarDefault } from '../../icons/calendar.svg';
import { ReactComponent as CalendarActive } from '../../icons/calendar-2.svg';
//mark
import { ReactComponent as MarkDefault } from '../../icons/mark.svg';
import { ReactComponent as MarkActive } from '../../icons/mark-2.svg';
import Popup from '../Popup';


const BottomMenuBar = () => {
  const navigate = useNavigate();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const handleMarkClick = (e) => {
    const userInfo = getUserInfo(); // 로그인 정보 가져오기
    if (!userInfo) {
      e.preventDefault();
      setShowLoginPopup(true);
    } else {
      navigate('/my-marks');
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <nav className="bottom-navbar">
        <Link to="/" onClick={() => { window.scrollTo(0, 0) }} className="nav-link">
          <NavItem name="홈" DefaultIcon={HomeDefault} ActiveIcon={HomeActive}  to="/"/>
        </Link>
        <Link to="/list/:regionId" onClick={() => { window.scrollTo(0, 0) }} className="nav-link">
          <NavItem
            name="지역별"
            DefaultIcon={AreaDefault}
            ActiveIcon={AreaActive}
            to={["/list/:regionId","/list/north", "/list/east", "/list/south", "/list/west"]}
          />
        </Link>
        <Link to="/mainMap" onClick={() => { window.scrollTo(0, 0) }} className="nav-link">
          <NavItem name="지도" DefaultIcon={MapDefault} ActiveIcon={MapActive} to="/mainMap"/>
        </Link>
        <Link to="/festivalCalendar" onClick={() => { window.scrollTo(0, 0) }} className="nav-link">
          <NavItem name="달력" DefaultIcon={CalendarDefault} ActiveIcon={CalendarActive} to="/festivalCalendar"/>
        </Link>
        <div className="nav-link" onClick={handleMarkClick}>
          <NavItem name="스크랩" DefaultIcon={MarkDefault} ActiveIcon={MarkActive} to="/my-marks"/>
        </div>
      </nav>

      {showLoginPopup && (
        <Popup
          mainText="로그인이 필요합니다."
          subText="스크랩을 이용하려면 먼저 로그인해주세요."
          btnText="확인"
          onClose={() => setShowLoginPopup(false)}
        />
      )}
    </>
  );
};

export default BottomMenuBar;