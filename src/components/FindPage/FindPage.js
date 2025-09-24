import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import FindInformation from "./FindInformation";
import FindComplete from "./FindComplete";
import FindPwEdit from "./FindPwEdit";

const FindPage = () => {
  const [resultId, setResultId] = useState('');
  const [userId, setUserId] = useState('');

  return (
    <Routes>
      <Route index element={<FindInformation setResultId={setResultId} setUserId={setUserId}/>} />
      <Route path="/pw/edit" element={<FindPwEdit userId={userId}/> } />
      <Route path="/id/result" element={<FindComplete message="입력하신 정보와 일치하는 아이디를 찾았어요." mainText={resultId} />} />
      <Route path="/pw/result" element={<FindComplete message="비밀번호 재설정을 완료했어요." mainText="" />} />
    </Routes>
  );
};

export default FindPage;