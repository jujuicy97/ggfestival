import { useLocation, matchPath } from 'react-router-dom';
import DefaultMenu from './DefaultMenu';
import MainMenu from './MainMenu';
import DetailPageMenu from './DetailPageMenu';
import SearchMenuBar from './SearchMenuBar';
import MypageMenuBar from './MypageMenuBar';

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
        return <MypageMenuBar/>;
      case location.pathname === '/delete-account':
        return <DefaultMenu pagename="회원 탈퇴" />;
      case location.pathname === '/delete-complete':
        return <SearchMenuBar pagename="회원 탈퇴" />;
      case location.pathname === '/comment-list':
        return <DefaultMenu pagename="내 댓글 관리" />;
      case location.pathname === '/my-marks':
        return <SearchMenuBar pagename="스크랩 목록" />;
      case location.pathname === '/find':
        return <SearchMenuBar pagename="아이디 찾기 / 비밀번호 재설정" />;
      case location.pathname === '/find/pw/edit':
        return <SearchMenuBar pagename="비밀번호 재설정" />;
      case location.pathname === '/find/id/result':
        return;
      case location.pathname === '/find/pw/result':
        return;
      case location.pathname === '/festivalCalendar':
        return <SearchMenuBar pagename="축제 달력" />;
      case location.pathname === '/list/:regionId':
        return null;
      case location.pathname === '/list/north':
        return null;
      case location.pathname === '/list/west':
        return null;
      case location.pathname === '/list/east':
        return null;
      case location.pathname === '/list/south':
        return null;
      case location.pathname === '/search':
        return null;
      case location.pathname.includes('/signup'):
        return <DefaultMenu pagename="회원가입" />;
      case location.pathname === '/login':
        return <DefaultMenu pagename="로그인" />
      case location.pathname === '/find':
        return <DefaultMenu pagename="아이디/비밀번호 찾기"/>

      // 수정: match 객체에서 params.contentid를 가져와 props로 전달
      case !!matchPath({ path: '/festivals/:contentid', end: true }, location.pathname):
        const match = matchPath({ path: '/festivals/:contentid', end: true }, location.pathname);
        return <DetailPageMenu contentid={match?.params?.contentid} />;
      case location.pathname === '/mainMap':
        return <DefaultMenu pagename="지도에서 찾기"/>  

      default:
        return <DefaultMenu />;
    }
  };

  return (
    <>
      {renderNavContent() && (
        <nav className="top-menubar">
          {renderNavContent()}
        </nav>
      )}
    </>
  );
};

export default TopMenubar;
