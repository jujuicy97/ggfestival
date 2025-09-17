import { useLocation } from 'react-router-dom'; 
import React, { useState } from 'react';

const NavItem = ({ name, DefaultIcon, ActiveIcon, to }) => {
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === to;

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
