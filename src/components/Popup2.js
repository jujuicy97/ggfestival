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

const Popup = ({ onConfirm, onClose, mainText, subText, cancelText, confirmText, hideIcon }) => {
  return (
    <div className="popup">
      <div className="popup-box">
        <div className="popup-text">
          {!hideIcon && <IoAlertCircle />}
          <h4>{mainText}</h4>
          <p>{subText}</p>
        </div>
        <div className="btns">
          <button onClick={onClose}>{cancelText || "취소"}</button>
          <button onClick={onConfirm}>{confirmText || "확인"}</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;