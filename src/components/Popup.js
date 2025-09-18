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

const Popup = ( {mainText, subText, btnText = "확인", onClose}) => {
  return (
    <div className="popup">
      <div className="popup-box">
        <div className="popup-text">
          <IoAlertCircle />
          <h4>{mainText}</h4>
        {/* 효진 추가 */}
          <div className="sub-wrap"> 
            <p>{subText}</p>
          </div>
        </div>
        <button onClick={onClose}>{btnText}</button>
      </div>
    </div>
  );
};

export default Popup;