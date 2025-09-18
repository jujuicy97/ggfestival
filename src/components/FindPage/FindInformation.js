import { useState } from "react";
import FindId from "./FindId";
import FindPw from "./FindPw";

const FindInformation = ( { setUserId }) => {
  const [activeTab, setActiveTab] = useState("id");

  return (
    <div id="find-idpw">
      <ul>
        <li onClick={() => setActiveTab("id")} className={activeTab === "id" ? "active" : ""}>아이디 찾기</li>
        <li onClick={() => setActiveTab("pw")} className={activeTab === "pw" ? "active" : ""}>비밀번호 재설정</li>
      </ul>

      { activeTab === "id" && <FindId /> }
      { activeTab === "pw" && <FindPw setUserId={setUserId} /> }

    </div>
  );
};

export default FindInformation;
