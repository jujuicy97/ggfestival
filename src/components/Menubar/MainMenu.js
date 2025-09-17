import { useEffect, useState } from 'react';
import { getUserInfo} from '../../utils/LocalStorage';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Logo } from '../../icons/main-logo.svg';
import { FaBell } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";

const MainMenu = () => {
  const [userInfo, setUserInfo] = useState(getUserInfo());
  const navigate = useNavigate();

  useEffect(() => {
    setUserInfo(getUserInfo());
  }, []);

  const handleGoHome = () => {
    navigate('/');
  }




  return (
    <div className='main-menu'>
      <Logo className="main-logo" onClick={handleGoHome} />
      {userInfo ? (
        <div className='after-login'>
          <FaBell />
          <Link to="/mypage">
            <FaUserLarge />
          </Link>
        </div>) : (
        <Link to="/login">
          <div className='before-login'>
            <p>로그인</p>
            <FaLock />
          </div>
        </Link>
      )}
    </div>
  );
};

export default MainMenu;