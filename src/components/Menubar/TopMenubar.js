import { useLocation } from 'react-router-dom';

import DefaultMenu from './DefaultMenu';
import MainMenu from './MainMenu';
import SearchMenuBar from './SearchMenuBar';
import DetailPageMenu from './DetailPageMenu';


const TopMenubar = () => {
  const location = useLocation();

  const renderNavContent = () => {
    switch (location.pathname) {
      case '/':
        return <MainMenu />;
      // case '/':
      //   return <SearchMenuBar/>;
      case '/mypage':
        return <DefaultMenu pagename="마이페이지" />;
      case '/pwcheck':
        return <DefaultMenu pagename="설정" />;
      case '/editinfo':
        return <DefaultMenu pagename="회원 정보" />;
      case '/delete-account':
        return <DefaultMenu pagename="회원 탈퇴" />;
      case '/comment-list':
        return <DefaultMenu pagename="내 댓글 관리"/>;
      default:
        return <DefaultMenu />;
    }
  };

  return (
    <div>
      <nav className="top-menubar">
        {renderNavContent()}
      </nav>
    </div>
  );
};

export default TopMenubar;