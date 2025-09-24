import { useState } from "react";
import { findUserId } from "../../utils/FestivalAPI";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup";

const FindId = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [failPopup, setFailPopup] = useState(false);
  const [emptyPopup, setEmptyPopup] = useState(false);
  const navigate = useNavigate();

  const fetchUserID = async ()=>{
    const { data, error } = await findUserId(name,email);
      if( error ) {
        setFailPopup(true);
        return;
      }

      if (data) {
        const maskedId = data.userid.slice(0, -1) + "*";
        navigate("/find/id/result", { state: { resultId: maskedId } });
      } else {
        setFailPopup(true);
      }
  }

  const handleFind = ()=>{
    if(name && email){
      fetchUserID();
    } 
    else{
      setEmptyPopup(true);
    }
  }

  
  return (
    <>
    <div className="find-ment">
      <div className="find-top-wrap">
        <h4>
          <span>이름, 이메일</span>를 입력하신 후<br/>
          아이디 찾기를 진행해 주세요.
        </h4>
        <form>
          <input
            type="text"
            placeholder="이름을 입력해 주세요"
            value={name}
            onChange={(e)=>{
              e.preventDefault();
              setName(e.target.value)
            }}
          />
          <input
            type="text"
            placeholder="이메일을 입력해 주세요"
            value={email}
            onChange={(e)=>{
              e.preventDefault();
              setEmail(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleFind();
              }
            }}
          />
        </form>
      </div>
      <button 
        onClick={handleFind}
      >아이디 찾기</button>
    </div>

    {failPopup && (
      <Popup
        mainText="등록된 회원 정보가 없습니다." 
        subText="가입 시 입력했던 이름, 이메일을 다시 확인해주세요." 
        onClose={() => setFailPopup(false)}
      />
    )}
    {emptyPopup && (
      <Popup 
        mainText="정보를 모두 입력해 주세요." 
        onClose={() => setEmptyPopup(false)}
      />
    )}

    </>
  );
};

export default FindId;