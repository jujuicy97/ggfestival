
import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mainpage from "./components/MainPage/Mainpage";
import BottomMenuBar from './components/Menubar/BottomMenuBar';
import TopMenubar from './components/Menubar/TopMenubar';
import MyPage from './components/MyPage/MyPage';
import PasswordCheck from './components/MyPage/PasswordCheck';
import EditInfo from './components/MyPage/EditInfo';
import DeleteAccount from './components/MyPage/DeleteAccount';
import DeleteComplete from './components/MyPage/DeleteComplete';
import CommentList from './components/MyPage/CommentList';
import MyMarks from './components/MyPage/MyMarks';
import MainMap from './components/FestivalMap/MainMap'
import MainPageTest from './components/MainPageTest';
import FestivalDetail from "./components/FestivalDetail/FestivalDetail";
import { useEffect, useState } from "react";

const App = () => {

//현재 위치 설정
const [baseLocate, setBaseLocate] = useState({
  lat: 37.54699,
  lng: 127.09598,
}); //기본 설정 위치
const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setBaseLocate({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
        },
        () => setErrorMsg("위치 정보를 불러올 수 없어 기본 위치로 설정합니다.")
      );
    } else {
      setErrorMsg("브라우저가 위치 정보를 지원하지 않습니다.");
    }
  }, []);

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<MainPageTest/>}/>
        <Route path="/mainMap" element={<MainMap baseLocate={baseLocate}/>}/>
        <Route path="/festivals/:contentid" element={<FestivalDetail baseLocate={baseLocate}/>} />
      </Routes>

      <TopMenubar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/mainMap" element={<MainMap />}/>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/pwcheck" element={<PasswordCheck />} />
          <Route path="/editinfo" element={<EditInfo />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/delete-complete" element={<DeleteComplete />} />
          <Route path="/comment-list" element={<CommentList/>} />
          <Route path="/my-marks" element={<MyMarks />} />
        </Routes>
      </div>
      <BottomMenuBar />

    </BrowserRouter>
  );
};

export default App;
