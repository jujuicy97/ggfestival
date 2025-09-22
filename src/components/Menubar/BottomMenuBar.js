import { Link } from 'react-router-dom';
import NavItem from './NavItem';

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


const BottomMenuBar = () => {
  return (
    <nav className="bottom-navbar">
       <Link to="/" className="nav-link">
        <NavItem name="홈" DefaultIcon={HomeDefault} ActiveIcon={HomeActive} to="/" />
      </Link>
      <Link to="/a" className="nav-link">
        <NavItem name=" 지역별" DefaultIcon={AreaDefault} ActiveIcon={AreaActive} to="/a" />
      </Link>
      <Link to="/mainMap" className="nav-link">
        <NavItem name="지도" DefaultIcon={MapDefault} ActiveIcon={MapActive} to="/b" />
      </Link>
      <Link to="/c" className="nav-link">
        <NavItem name="달력" DefaultIcon={CalendarDefault} ActiveIcon={CalendarActive} to="/c" />
      </Link>
      <Link to="/my-marks" className="nav-link">
        <NavItem name="스크랩" DefaultIcon={MarkDefault} ActiveIcon={MarkActive} to="/d" />
      </Link>
    </nav>
  );
};

export default BottomMenuBar;