import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { findInfoPw } from "../../utils/FestivalAPI";
import Popup from "../Popup";

const FindPw = ( {setUserId} ) => {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [failPopup, setFailPopup] = useState(false);
  const [emptyPopup, setEmptyPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    
  })

  const fetchPassword = async ()=>{
    const { data, error } = await findInfoPw(name, id, email);
    if( data ){
      navigate("pw/edit", { state: { userId: data.id } });
    }
    if( error ){
      setFailPopup(true);
    }
  }

  const handleFind = ()=>{
    if(name && id && email){
      fetchPassword();
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
          <span>이름, 아이디, 이메일</span>을 입력하신 후<br/>
          비밀번호 재설정을 진행해 주세요.
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
            placeholder="아이디를 입력해 주세요"
            value={id}
            onChange={(e)=>{
              e.preventDefault();
              setId(e.target.value)
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
      >비밀번호 재설정</button>
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

export default FindPw;