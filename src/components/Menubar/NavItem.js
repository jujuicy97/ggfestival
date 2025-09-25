import { useLocation } from 'react-router-dom'; 
import React, { useState } from 'react';

const NavItem = ({ name, DefaultIcon, ActiveIcon, to }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();

  // to를 배열로 만들고, 배열이면 includes로 체크, 아니면 기존 방식
const paths = to ? (Array.isArray(to) ? to : [to]) : [];
const isActive = paths.some(path => {
  if (!path) return false; // undefined 방지
  if (path.includes(':')) {
    const regex = new RegExp('^' + path.replace(/:\w+/g, '[^/]+') + '$');
    return regex.test(location.pathname);
  }
  return location.pathname === path;
});
  const showActive = isActive || isHovered;

  return (
    <div
      className="nav-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="icon-wrapper">
        <DefaultIcon className={`nav-icon default ${showActive ? "hidden" : ""}`} />
        <ActiveIcon className={`nav-icon active ${showActive ? "visible" : ""}`} />
      </div>
      <span className={`nav-text ${isActive ? "active" : ""}`}>{name}</span>
    </div>
  );
};

export default NavItem;
