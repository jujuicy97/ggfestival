// 아래처럼 사용해주시면 됩니다!!

// const [showPopup, setShowPopup] = useState(false);

//   {showPopup && (
//     <Popup 
//       popup
//       mainText="메인 텍스트" 
//       subText="서브 텍스트" 
//       btnText="버튼 텍스트" // 기본값: "확인" (btnText 자체를 안 적으면 확인으로 나옵니다! "확인"이 아닐 경우에만 적어주시면 돼요)
//       onClose={() => setShowPopup(false)}
//     />
//   )}

import { IoAlertCircle } from "react-icons/io5";

const Popup = ({ onConfirm, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-box">
        <div className="popup-text">
          <IoAlertCircle />
          <h4>로그아웃하시겠습니까?</h4>
        </div>
        <div className="btns">
          <button onClick={onClose}>취소</button>
          <button onClick={onConfirm}>로그아웃</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;