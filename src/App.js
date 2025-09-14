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

const App = () => {
  return (
    <BrowserRouter>
      <TopMenubar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Mainpage />} />
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
