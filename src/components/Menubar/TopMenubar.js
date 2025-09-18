import { useLocation, matchPath } from 'react-router-dom';
import DefaultMenu from './DefaultMenu';
import MainMenu from './MainMenu';
import DetailPageMenu from './DetailPageMenu';
import SearchMenuBar from './SearchMenuBar';

const TopMenubar = () => {
  const location = useLocation();

  const renderNavContent = () => {
    switch (true) {
      case location.pathname === '/':
        return <MainMenu />;
      case location.pathname === '/mypage':
        return <DefaultMenu pagename="마이페이지" />;
      case location.pathname === '/pwcheck':
        return <DefaultMenu pagename="설정" />;
      case location.pathname === '/editinfo':
        return <DefaultMenu pagename="회원 정보" />;
      case location.pathname === '/delete-account':
        return <DefaultMenu pagename="회원 탈퇴" />;
      case location.pathname === '/comment-list':
        return <DefaultMenu pagename="내 댓글 관리" />;
      case location.pathname === '/my-marks':
        return <SearchMenuBar pagename="스크랩 목록" />;
      case location.pathname === '/find':
        return <SearchMenuBar pagename="아이디 찾기 / 비밀번호 재설정" />;
      case location.pathname === '/find/pw/edit':
        return <SearchMenuBar pagename="비밀번호 재설정" />;
      case location.pathname === '/festivalCalendar':
        return <SearchMenuBar pagename="축제 달력" />;

      // 수정: match 객체에서 params.contentid를 가져와 props로 전달
      case !!matchPath({ path: '/festivals/:contentid', end: true }, location.pathname):
        const match = matchPath({ path: '/festivals/:contentid', end: true }, location.pathname);
        return <DetailPageMenu contentid={match?.params?.contentid} />;

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
