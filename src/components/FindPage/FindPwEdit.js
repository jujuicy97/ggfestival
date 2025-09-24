import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Popup from "../Popup";
import { findPassword } from "../../utils/FestivalAPI";

const FindPwEdit = () => {
  const [newPw, setNewPw] = useState("");
  const [newPwCheck, setNewPwCheck] = useState("");
  const [failPopup, setFailPopup] = useState(false);
  const [checkPopup, setCheckPopup] = useState(false);
  const [emptyPopup, setEmptyPopup] = useState(false);
  const [langPopup, setLangPopup] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const userId = location.state?.userId || "";

  const fetchPassword = async () => {
    const { error } = await findPassword(userId, newPw);
    if( error ){
      setFailPopup(true);
    }
  };

  const handleEdit = () => {
    if (newPw && newPwCheck) {
      if (newPw === newPwCheck) {
        if (newPw.length >= 8) {
          fetchPassword();
          navigate("/find/pw/result");
        } else {
          setLangPopup(true); // 비밀번호가 8자 이상이 아닐 경우
        }
      } else {
        setCheckPopup(true); // 비밀번호가 서로 일치하지 않을 경우
      }
    } else {
      setEmptyPopup(true); // 입력창이 모두 입력되지 않았을 경우
    }
  };

  return (
    <>
      <div className="find-ment pw-edit">
        <div className="find-top-wrap">
          <h4>
            <span>비밀번호를 재설정</span>하기 위해
            <br />
            새로운 비밀번호를 입력해 주세요.
          </h4>
          <form>
            <input
              type="password"
              placeholder="새로운 비밀번호를 입력해 주세요 (8자 이상)"
              value={newPw}
              onChange={(e) => {
                e.preventDefault();
                setNewPw(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="새로운 비밀번호를 다시 입력해 주세요"
              value={newPwCheck}
              onChange={(e) => {
                e.preventDefault();
                setNewPwCheck(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleEdit();
                }
              }}
            />
            {newPw &&
              newPwCheck &&
              (newPw === newPwCheck ? (
                <p className="check-ment success">비밀번호가 일치합니다!</p>
              ) : (
                <p className="check-ment error">
                  비밀번호가 일치하지 않습니다!
                </p>
              ))}
          </form>
        </div>
        <button onClick={handleEdit}>비밀번호 재설정</button>
      </div>

      {failPopup && (
        <Popup
          mainText="등록된 회원 정보가 없습니다."
          subText="가입 시 입력했던 이름, 이메일을 다시 확인해 주세요."
          onClose={() => setFailPopup(false)}
        />
      )}
      {checkPopup && (
        <Popup
          mainText="비밀번호가 일치하지 않습니다."
          subText="입력하신 비밀번호를 다시 확인해 주세요."
          onClose={() => setCheckPopup(false)}
        />
      )}
      {emptyPopup && (
        <Popup
          mainText="정보를 모두 입력해 주세요."
          onClose={() => setEmptyPopup(false)}
        />
      )}
      {langPopup && (
        <Popup
          mainText="비밀번호를 8자 이상 입력해 주세요."
          onClose={() => setLangPopup(false)}
        />
      )}
    </>
  );
};

export default FindPwEdit;
